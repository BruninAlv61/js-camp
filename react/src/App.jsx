import { useState } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { JobListings } from "./components/JobListings.jsx";

import { useJobs } from "./hooks/useJobs.js";

const RESULTS_PER_PAGE = 5

function App() {
  const { jobs, loading, error } = useJobs();

  const [filters, setFilters] = useState({
    search: '',
    technology: '',
    location: '',
    experienceLevel: ''
  })
  const [currentPage, setCurrentPage] = useState(1)

  const jobsFilteredByFilters = jobs.filter(job => {
    return (
      (filters.search === '' || job.titulo.toLowerCase().trim().includes(filters.search.toLowerCase().trim())) &&
      (filters.technology === '' || job.data.technology.includes(filters.technology.toLowerCase())) &&
      (filters.location === '' || job.data.modalidad === filters.location) &&
      (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel)
      
    )
  })

  const totalPages = Math.ceil(jobsFilteredByFilters.length / RESULTS_PER_PAGE)
  
  const pagedResults = jobsFilteredByFilters.slice(
    (currentPage - 1) * RESULTS_PER_PAGE, //Página 1 -> 0, Página 2 -> 5, Página 3 -> 10
    currentPage * RESULTS_PER_PAGE        // Página 1 -> 5, Página 2 -> 10, Página 3 -> 15
  )

  console.log(pagedResults)
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }


  return (
    <>
      <Header />

      <main>
        <SearchFormSection onSearch={handleSearch}/>

        <section>
          <JobListings jobs={pagedResults} loading={loading} error={error}/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
