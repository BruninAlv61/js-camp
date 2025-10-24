const filterLocation = document.querySelector('#filter-location')
const mensaje = document.querySelector('#filter-selected-value')

filterLocation.addEventListener('change', function () {
  const jobs = document.querySelectorAll('.job-listing-card')

  const selectedValue = filterLocation.value

  if (selectedValue) {
    mensaje.textContent = `Has seleccionado: ${selectedValue}`
  } else {
    mensaje.textContent = ''
  }

  jobs.forEach((job) => {
    // const modalidad = job.dataset.modalidad
    const modalidad = job.getAttribute('data-modalidad')
    const isShown = selectedValue === '' || selectedValue === modalidad
    job.classList.toggle('is-hidden', isShown === false)
  })
})

const filterExperience = document.querySelector('#filter-experience-level')

filterExperience.addEventListener('change', function () {
  const jobs = document.querySelectorAll('.job-listing-card')

  const selectedValue = filterExperience.value

  if (selectedValue) {
    mensaje.textContent = `Has seleccionado: ${selectedValue}`
  } else {
    mensaje.textContent = ''
  }

  jobs.forEach((job) => {
    // const modalidad = job.dataset.modalidad
    const nivel = job.getAttribute('data-nivel')
    const isShown = selectedValue === '' || selectedValue === nivel
    job.classList.toggle('is-hidden', isShown === false)
  })
})

const filterTechnology = document.querySelector('#filter-technology')

filterTechnology.addEventListener('change', function () {
  const jobs = document.querySelectorAll('.job-listing-card')

  const selectedValue = filterTechnology.value

  if (selectedValue) {
    mensaje.textContent = `Has seleccionado: ${selectedValue}`
  } else {
    mensaje.textContent = ''
  }

  jobs.forEach((job) => {
    const technology = job.getAttribute('data-technology')
    const splitedTechnology = technology.split(',')
    const isShown =
      selectedValue === '' || splitedTechnology.includes(selectedValue)
    job.classList.toggle('is-hidden', isShown === false)
  })
})
