import { useState, useEffect } from "react";

import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { JobListings } from "../components/JobListings.jsx";

import { useJobs } from "../hooks/useJobs.js";

const RESULTS_PER_PAGE = 5;

const useFilters = () => {
  const [filters, setFilters] = useState(
    JSON.parse(localStorage.getItem("filters")) || {
      technology: "",
      location: "",
      experienceLevel: "",
    },
  );

  const [hasActiveFilters, setHasActiveFilters] = useState(
    localStorage.getItem("hasActiveFilters") === "true",
  );

  const [textToFilter, setTextToFilter] = useState(
    localStorage.getItem("textToFilter") || "",
  );

  const [currentPage, setCurrentPage] = useState(1);

  const { jobs, total, loading, error } = useJobs({
    textToFilter,
    filters,
    currentPage,
    RESULTS_PER_PAGE,
  });

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
    localStorage.setItem("textToFilter", newTextToFilter);
    setCurrentPage(1);
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
      localStorage.removeItem("filters");
      localStorage.removeItem("textToFilter");
      setCurrentPage(1);
      setHasActiveFilters(false);
      localStorage.removeItem("hasActiveFilters");
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

  useEffect(() => {
    document.title = `Resultados: ${total}, Página ${currentPage} - DevJobs`;
  }, [total, currentPage]);

  return (
    <main>
      <SearchFormSection
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
        filters={filters}
        textToFilter={textToFilter}
      />

      <section>
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
