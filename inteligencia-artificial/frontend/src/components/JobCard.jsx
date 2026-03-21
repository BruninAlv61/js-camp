import { useState } from "react";
import { Link } from "./Link.jsx";
import styles from "./JobCard.module.css";
import { useFavoritesStore } from "../store/favoritesStore.js";
import { Heart } from "lucide-react";
import { useAuthStore } from "../store/authStore.js";

function JobCardFavoriteButton({ jobId }) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { isLoggedIn } = useAuthStore();

  return (
    <button
      disabled={!isLoggedIn}
      className={styles.favoriteButton}
      onClick={() => toggleFavorite(jobId)}
    >
      {isFavorite(jobId) ? (
        <Heart
          className={styles.heartIcon}
          style={{
            color: "red",
            backgroundColor: "#e48282ff",
          }}
        />
      ) : (
        <Heart
          className={styles.heartIcon}
          style={{
            color: "#b5c2caff",
            backgroundColor: "#71a8ccff",
          }}
        />
      )}
    </button>
  );
}

function JobCardApplyButton({ jobId }) {
  const [isApplied, setIsApplied] = useState(false);
  const { isLoggedIn } = useAuthStore();

  const handleClick = () => {
    setIsApplied(!isApplied);
  };

  const buttonClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";
  const buttonText = isApplied ? "Aplicado" : "Aplicar";

  return (
    <button
      disabled={!isLoggedIn || isApplied}
      className={`button-apply-job ${buttonClasses}`}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
}

export function JobCard({
  data,
  jobId,
  titulo,
  empresa,
  ubicacion,
  descripcion,
}) {
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
        <JobCardApplyButton jobId={jobId} />
        <JobCardFavoriteButton jobId={jobId} />
      </div>
    </article>
  );
}
