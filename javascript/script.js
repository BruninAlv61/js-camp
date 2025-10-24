// recupera solo el primer boton que encuentre
// const boton = document.querySelector('.button-apply-job')
// console.log(boton) // null si no lo encuentra

// if (boton !== null) {
//   boton.addEventListener('click', function() {
//     boton.textContent = '¡Aplicado!'
//     boton.classList.add('is-applied')
//     boton.disabled = true
//   })
// }

// const botones = document.querySelectorAll('.button-apply-job')
// // devuelve un NodeList (array-like) con todos los botones que encuentre
// // o una lista vacia [] si no encuentra ninguno

// botones.forEach(boton => {
//   boton.addEventListener('click', function() {
//     boton.textContent = '¡Aplicado!'
//     boton.classList.add('is-applied')
//     boton.disabled = true
//   })
// })

const jobsListingSection = document.querySelector('.jobs-listings')

jobsListingSection?.addEventListener('click', function (event) {
  const element = event.target

  if (element.classList.contains('button-apply-job')) {
    element.textContent = '¡Aplicado!'
    element.classList.add('is-applied')
    element.disabled = true
  }
})

const filterTechnology = document.querySelector('#filter-technology')
const filterLocation = document.querySelector('#filter-location')
const filterExperiencia = document.querySelector('#filter-experience-level')

filterTechnology?.addEventListener('change', function () {
  const cards = document.querySelectorAll('.job-listing-card')

  cards.forEach((offer) => {
    if (!filterTechnology.value) return offer.classList.remove('hidden-tech')
    if (offer.classList.contains(filterTechnology.value)) return
    else return offer.classList.add('hidden-tech')
  })

  console.log(filterTechnology.value)
})
filterLocation?.addEventListener('change', function () {
  const cards = document.querySelectorAll('.job-listing-card')

  cards.forEach((offer) => {
    if (!filterLocation.value) return offer.classList.remove('hidden-location')
    if (offer.classList.contains(filterLocation.value)) return
    else return offer.classList.add('hidden-location')
  })
})

filterExperiencia?.addEventListener('change', function () {
  const cards = document.querySelectorAll('.job-listing-card')

  cards.forEach((offer) => {
    if (!filterExperiencia.value)
      return offer.classList.remove('hidden-seniority')
    if (offer.classList.contains(filterExperiencia.value)) return
    else return offer.classList.add('hidden-seniority')
  })

  console.log(filterExperiencia.value)
})
