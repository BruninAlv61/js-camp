import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { JobsSearch } from "./components/JobsSearch.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { JobListings } from "./components/JobListings.jsx";

function App() {
  return (
    <>
      <Header />

      <main>
        <JobsSearch />

        <section>
          <JobListings />
          <Pagination />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
