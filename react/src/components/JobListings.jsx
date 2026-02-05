import { useJobs } from "../hooks/useJobs.js";
import { JobCard } from "./JobCard.jsx";

export function JobListings() {
  const { jobs, loading, error } = useJobs();
  return (
    <>
      <h2>Resultados de búsqueda</h2>
      <div className="jobs-listings">
        {loading && <p>Cargando...</p>}
        {error && <p>Error al cargar las ofertas</p>}
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            titulo={job.titulo}
            empresa={job.empresa}
            ubicacion={job.ubicacion}
            descripcion={job.descripcion}
            data={job.data}
          />
        ))}
      </div>
    </>
  );
}
