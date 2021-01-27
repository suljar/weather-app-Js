window.addEventListener('load', () => {
  let long
  let lat
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  )
  let temperatureDgree = document.querySelector('.temperature-dgree')
  let locationTimezone = document.querySelector('.location-timexone')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      long = pos.coords.longitude
      lat = pos.coords.latitude
      const proxy = 'https://cors-anywhere.herokuapp.com/'
      let api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`
      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          const { temperature, summary, icon } = data.currently
          temperatureDgree.textContent = temperature
          temperatureDescription.textContent = summary
          locationTimezone.textContent = data.timezone
          setIcon(icon, document.querySelector('icon'))
        })
    })

    function setIcon(icon, iconID) {
      const skycons = new Skycons({ color: 'white' })
      const currentIcon = icon.replace(/-/g, '_').toUpperCase()
      skycons.play()
      return skycons.set(iconID, Skycons[currentIcon])
    }
  }
})
