import { useState } from "react";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { JobsSearch } from "./components/JobsSearch.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { JobListings } from "./components/JobListings.jsx";

import { useJobs } from "./hooks/useJobs.js";

const RESULTS_PER_PAGE = 5

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  
  const { jobs, loading, error } = useJobs();
  const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE)

  const pagedResults = jobs.slice(
    (currentPage - 1) * RESULTS_PER_PAGE, //Página 1 -> 0, Página 2 -> 5, Página 3 -> 10
    currentPage * RESULTS_PER_PAGE        // Página 1 -> 5, Página 2 -> 10, Página 3 -> 15
  )

  console.log(pagedResults)
  
  const handlePageChange = (page) => {
    console.log('Cambiando la página: ', page)
    setCurrentPage(page)
  }

  return (
    <>
      <Header />

      <main>
        <JobsSearch />

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
