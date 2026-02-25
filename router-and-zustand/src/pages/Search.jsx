import { useState } from "react";

import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { JobListings } from "../components/JobListings.jsx";

import { useJobs } from "../hooks/useJobs.js";
import { useEffect } from "react";
import { useRouter } from "../hooks/useRouter.js";

const RESULTS_PER_PAGE = 5;

const useFilters = () => {
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      technology: params.get("technology") || "",
      location: params.get("location") || "",
      experienceLevel: params.get("experienceLevel") || "",
    };
  });

  const [hasActiveFilters, setHasActiveFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (
      params.get("technology") ||
      params.get("type") ||
      params.get("level") ||
      params.get("text")
    ) {
      return true;
    }
    return false;
  });

  const [textToFilter, setTextToFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("text") || "";
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get("page"));
    return Number.isNaN(page) ? page : 1;
  });

  const { jobs, total, loading, error } = useJobs({
    textToFilter,
    filters,
    currentPage,
    RESULTS_PER_PAGE,
  });

  const { navigateTo } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();

    if (textToFilter) params.append("text", textToFilter);
    if (filters.technology) params.append("technology", filters.technology);
    if (filters.location) params.append("type", filters.location);
    if (filters.experienceLevel)
      params.append("level", filters.experienceLevel);
    if (currentPage > 1) params.append("page", currentPage);

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    navigateTo(newUrl);
  }, [filters, currentPage, textToFilter, navigateTo]);

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    localStorage.setItem("filters", JSON.stringify(newFilters));
    setCurrentPage(1);
    if (
      textToFilter == "" &&
      newFilters.technology == "" &&
      newFilters.location == "" &&
      newFilters.experienceLevel == ""
    ) {
      setHasActiveFilters(false);
      localStorage.removeItem("hasActiveFilters");
      return;
    }
    setHasActiveFilters(true);
    localStorage.setItem("hasActiveFilters", true);
  };

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setCurrentPage(1);
    if (
      newTextToFilter === "" &&
      filters.technology === "" &&
      filters.location === "" &&
      filters.experienceLevel === ""
    ) {
      setHasActiveFilters(false);
      localStorage.removeItem("hasActiveFilters");
      return;
    }
    setHasActiveFilters(true);
    localStorage.setItem("hasActiveFilters", true);
  };

  const handleClearFilters = () => {
    if (hasActiveFilters) {
      setFilters({
        technology: "",
        location: "",
        experienceLevel: "",
      });
      setTextToFilter("");
      setCurrentPage(1);
      setHasActiveFilters(false);
    }
  };

  return {
    jobs,
    total,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    handleClearFilters,
    hasActiveFilters,
    filters,
    textToFilter,
  };
};

export function SearchPage() {
  const {
    jobs,
    total,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    handleClearFilters,
    hasActiveFilters,
    filters,
    textToFilter,
  } = useFilters();

  const title = loading
    ? "Cargando..."
    : `Resultados: ${total}, Página ${currentPage} - DevJobs`;

  return (
    <main>
      <title>{title}</title>
      <meta name="description" content={title} />
      <SearchFormSection
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
        filters={filters}
        textToFilter={textToFilter}
      />

      <section>
        <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>
        <JobListings jobs={jobs} loading={loading} error={error} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
