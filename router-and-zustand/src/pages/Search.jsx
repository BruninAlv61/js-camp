import { useState } from "react";
import { useSearchParams } from "react-router";

import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { JobListings } from "../components/JobListings.jsx";

import { useJobs } from "../hooks/useJobs.js";
import { useEffect } from "react";
import { useRouter } from "../hooks/useRouter.js";

const RESULTS_PER_PAGE = 5;

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get("technology") || "",
      location: searchParams.get("location") || "",
      experienceLevel: searchParams.get("experienceLevel") || "",
    };
  });

  const [hasActiveFilters, setHasActiveFilters] = useState(() => {
    if (
      searchParams.get("technology") ||
      searchParams.get("type") ||
      searchParams.get("level") ||
      searchParams.get("text")
    ) {
      return true;
    }
    return false;
  });

  const [textToFilter, setTextToFilter] = useState(
    () => searchParams.get("text") || "",
  );

  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get("page"));
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
    setSearchParams((params) => {
      if (textToFilter) params.set("text", textToFilter);
      if (filters.technology) params.set("technology", filters.technology);
      if (filters.location) params.set("type", filters.location);
      if (filters.experienceLevel) params.set("level", filters.experienceLevel);
      if (currentPage > 1) params.set("page", currentPage);

      return params;
    });
  }, [filters, currentPage, textToFilter, setSearchParams, navigateTo]);

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

export default function SearchPage() {
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
