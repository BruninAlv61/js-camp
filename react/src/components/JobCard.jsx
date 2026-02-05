import { useState } from "react";

export function JobCard({ data, titulo, empresa, ubicacion, descripcion }) {
  const [isApplied, setIsApplied] = useState(false);

  const handleClick = () => {
    setIsApplied(!isApplied);
  };

  const buttonClasses = isApplied ? "button-apply-job is-applied" : "button-apply-job";
  const buttonText = isApplied ? "Aplicado" : "Aplicar";

  return (
    <article
      className="job-listing-card"
      data-modalidad={data?.modalidad}
      data-nivel={data?.nivel}
      data-technology={data?.technology}
    >
      <div>
        <h3>{titulo}</h3>
        <small>
          {empresa} - {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <button
        disabled={isApplied}
        className={`button-apply-job ${buttonClasses}`}
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </article>
  );
}
