import { useState, useEffect } from "react";

import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { JobListings } from "../components/JobListings.jsx";

import { useJobs } from "../hooks/useJobs.js";

const RESULTS_PER_PAGE = 5;

const useFilters = () => {
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    experienceLevel: "",
  });

  const [textToFilter, setTextToFilter] = useState("");

  const { jobs, total, loading, error } = useJobs({ textToFilter, filters });

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setCurrentPage(1);
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
  } = useFilters();

  useEffect(() => {
    document.title = `Resultados: ${total}, Página ${currentPage} - DevJobs`;
  }, [total, currentPage]);

  return (
    <main>
      <SearchFormSection
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
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
