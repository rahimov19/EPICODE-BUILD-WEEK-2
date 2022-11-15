window.onload = () => {
  getArtist(getID())
}

const getID = () => {
  const getID = new URLSearchParams(window.location.search).get('artistID')
  return getID
}

const getArtist = async (artistID) => {
  const response = await fetch(
    'https://striveschool-api.herokuapp.com/api/deezer/artist/' + artistID,
  )

  const artist = await response.json()

  console.log(artist.picture)
  console.log(artist.picture_xl)

  const artistName = document.querySelector('.artist')
  artistName.innerHTML = artist.name

  const bannerImage = document.querySelector('.banner')
  bannerImage.setAttribute('src', artist.picture_xl)

  const listeners = document.querySelector('.listeners')
  listeners.innerHTML =
    artist.nb_fan.toLocaleString('en-US') + ' monthly listeners'

  const artistPicture = document.querySelector('.artist-pick-album-cover')
  artistPicture.setAttribute('src', artist.picture_xl)
}
