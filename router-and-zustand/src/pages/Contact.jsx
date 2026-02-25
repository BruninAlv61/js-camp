import style from "./Contact.module.css";
import { useId, useState } from "react";

function Header() {
  return (
    <header className={style.contactHeader}>
      <h1 className={style.contactTitle}>
        Conecta con <span className={style.contactSpan}>DevJobs</span>
      </h1>
      <p className={style.contactParagraph}>
        Estamos aquí para ayudarte a impulsar tu carrera profesional o encontrar
        el talento técnico que tu empresa necesita
      </p>
    </header>
  );
}

export function ContactPage() {
  const [isMessageSubmited, setIsMessageSubmited] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const idName = useId();
  const idEmail = useId();
  const idSubject = useId();
  const idMessage = useId();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get(idName);
    const email = formData.get(idEmail);
    const subject = formData.get(idSubject);
    const message = formData.get(idMessage);

    if (
      name.length < 3 ||
      email.length < 3 ||
      subject.length < 3 ||
      message.length < 3
    ) {
      setMessageError(true);
      return;
    }

    setIsMessageSubmited(true);
    setMessageError(false);
  };

  return (
    <main>
      <Header />
      <form className={style.contactForm} onSubmit={handleSubmit}>
        <label htmlFor={idName} className={style.contactLabel}>
          Nombre completo
        </label>
        <input
          type="text"
          name={idName}
          className={style.contactInput}
          placeholder="Ej: Axel Smith"
        />

        <label htmlFor={idEmail} className={style.contactLabel}>
          Email
        </label>
        <input
          type="email"
          name={idEmail}
          className={style.contactInput}
          placeholder="Ej: axel.smith@gmail.com"
        />

        <label htmlFor={idSubject} className={style.contactLabel}>
          Asunto
        </label>
        <input
          type="text"
          name={idSubject}
          className={style.contactInput}
          placeholder="Ej: Soporte técnico"
        />

        <label htmlFor={idMessage} className={style.contactLabel}>
          Mensaje
        </label>
        <textarea
          name={idMessage}
          className={`${style.contactInput} ${style.contactTextarea}`}
          placeholder="Ej: Hola, me gustaría comunicarme con ustedes por el motivo de..."
        />

        <button
          type="submit"
          className={style.contactButton}
          disabled={isMessageSubmited}
        >
          {isMessageSubmited ? "Mensaje enviado" : "Enviar"}
        </button>
      </form>

      {isMessageSubmited && (
        <p className={style.contactParagraph}>
          Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.
        </p>
      )}

      {messageError && (
        <p className={style.contactParagraph}>
          Por favor, completa todos los campos con un minimo de 3 caracteres por
          campo.
        </p>
      )}
    </main>
  );
}
