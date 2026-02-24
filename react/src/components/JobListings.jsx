import { JobCard } from "./JobCard.jsx";

export function JobListings({ jobs, loading, error }) {
  return (
    <>
      <div className="jobs-listings">
        {loading && <p>Cargando...</p>}
        {error && <p>Error al cargar las ofertas</p>}
        {jobs.length === 0 && (
          <p
            style={{
              textAlign: "center",
              padding: "1rem",
              textWrap: "balance",
            }}
          >
            No se encontraron empleos que coincidan con los criterios de
            búsqueda.
          </p>
        )}

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
