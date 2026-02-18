import { useState, useEffect } from "react"

import { SearchFormSection } from "../components/SearchFormSection.jsx"
import { Pagination } from "../components/Pagination.jsx"
import { JobListings } from "../components/JobListings.jsx"

import { useJobs } from "../hooks/useJobs.js"

const RESULTS_PER_PAGE = 5

export function SearchPage() {
  const { jobs, loading, error } = useJobs();
  
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: ''
  })
  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  const jobsFilteredByFilters = jobs.filter(job => {
    return (
      (filters.search === '' || job.titulo.toLowerCase().trim().includes(textToFilter.toLowerCase().trim())) &&
      (filters.technology === '' || job.data.technology.includes(filters.technology.toLowerCase())) &&
      (filters.location === '' || job.data.modalidad === filters.location) &&
      (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel)
      
    )
  })

  const jobsWithTextToFilter = textToFilter === ''
    ? jobsFilteredByFilters
    : jobsFilteredByFilters.filter(job => {
      return job.titulo.toLowerCase().trim().includes(textToFilter.toLowerCase().trim())
    })

  const totalPages = Math.ceil(jobsWithTextToFilter.length / RESULTS_PER_PAGE)
  
  const pagedResults = jobsWithTextToFilter.slice(
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

  const handleTextFilter = (newText) => {
    setTextToFilter(newText)
    setCurrentPage(1)
  }

  useEffect(() => {
    document.title = `Resultados: ${jobsFilteredByFilters.length}, Página ${currentPage} - DevJobs`
  }, [jobsFilteredByFilters, currentPage])


  return (
      <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter}/>

        <section>
          <JobListings jobs={pagedResults} loading={loading} error={error}/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </section>
      </main>
  );
}