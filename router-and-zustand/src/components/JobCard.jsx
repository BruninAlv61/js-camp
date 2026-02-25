import { useState } from "react";
import { Link } from "./Link.jsx";
import styles from "./JobCard.module.css";

export function JobCard({
  data,
  jobId,
  titulo,
  empresa,
  ubicacion,
  descripcion,
}) {
  const [isApplied, setIsApplied] = useState(false);

  const handleClick = () => {
    setIsApplied(!isApplied);
  };

  const buttonClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";
  const buttonText = isApplied ? "Aplicado" : "Aplicar";

  return (
    <article
      className="job-listing-card"
      data-modalidad={data?.modalidad}
      data-nivel={data?.nivel}
      data-technology={data?.technology}
    >
      <div>
        <h3>
          <Link href={`/jobs/${jobId}`} className={styles.title}>
            {titulo}
          </Link>
        </h3>
        <small>
          {empresa} - {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <div className={styles.actions}>
        <Link href={`/jobs/${jobId}`} className={styles.details}>
          Ver detalles
        </Link>
        <button
          disabled={isApplied}
          className={`button-apply-job ${buttonClasses}`}
          onClick={handleClick}
        >
          {buttonText}
        </button>
      </div>
    </article>
  );
}
