const searchInput = document.querySelector('#empleos-search-input')

searchInput.addEventListener('input', function () {
  const jobs = document.querySelectorAll('.job-listing-card')
  jobs.forEach((job) => {
    let title = job.childNodes[0].childNodes[1].textContent
    // console.log(title)

    let titleMatchSearch = title
      .toLocaleLowerCase('es')
      .includes(searchInput.value.toLocaleLowerCase('es'))

    job.classList.toggle('is-hidden', titleMatchSearch === false)
  })
})
