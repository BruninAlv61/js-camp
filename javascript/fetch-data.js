const container = document.querySelector('.jobs-listings')
const paginationLinks = document.querySelector('.pagination-container')

const RESULTS_PER_PAGE = 5
let allJobs = []
let currentPage = 1

// Función pura para crear el HTML de un job
function createJobCard(job) {
  const article = document.createElement('article')
  article.className = 'job-listing-card'

  article.dataset.modalidad = job.data.modalidad
  article.dataset.nivel = job.data.nivel
  article.dataset.technology = job.data.technology

  article.innerHTML = `
    <div>
      <h3>${job.titulo}</h3>
      <small>${job.empresa} | ${job.ubicacion}</small>
      <p>${job.descripcion}</p>
    </div>
    <button class="button-apply-job">Aplicar</button>
  `

  return article
}

// Renderizar jobs de una página específica
function renderJobs(jobs, page = 1) {
  container.innerHTML = '' // Limpiar contenedor

  const startIndex = (page - 1) * RESULTS_PER_PAGE
  const endIndex = startIndex + RESULTS_PER_PAGE
  const jobsToShow = jobs.slice(startIndex, endIndex)

  jobsToShow.forEach((job) => {
    container.appendChild(createJobCard(job))
  })
}

// Crear paginación
function renderPagination(totalJobs) {
  paginationLinks.innerHTML = ''

  const totalPages = Math.ceil(totalJobs / RESULTS_PER_PAGE)

  for (let i = 1; i <= totalPages; i++) {
    const anchor = document.createElement('a')
    anchor.href = '#'
    anchor.textContent = i
    anchor.dataset.page = i

    if (i === currentPage) {
      anchor.classList.add('is-active')
    }

    // Event listener para cambiar de página
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      currentPage = i
      renderJobs(allJobs, currentPage)
      renderPagination(allJobs.length) // Re-renderizar para actualizar el active
    })

    paginationLinks.appendChild(anchor)
  }
}

// Inicializar
fetch('./data.json')
  .then((response) => response.json())
  .then((jobs) => {
    allJobs = jobs
    renderJobs(allJobs, currentPage)
    renderPagination(allJobs.length)
  })
  .catch((error) => console.error('Error:', error))
