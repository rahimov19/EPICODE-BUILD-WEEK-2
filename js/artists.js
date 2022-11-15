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

  const getTracks = await fetch(artist.tracklist)
  const allTracks = await getTracks.json()

  const artistName = document.querySelector('.artist')
  artistName.innerHTML = artist.name

  const bannerImage = document.querySelector('.banner')
  bannerImage.setAttribute('src', artist.picture_xl)

  const listeners = document.querySelector('.listeners')
  listeners.innerHTML =
    artist.nb_fan.toLocaleString('en-US') + ' monthly listeners'

  const artistPicture = document.querySelector('.artist-pick-album-cover')
  artistPicture.setAttribute('src', artist.picture_xl)

  const songContainer = document.querySelector('.songs-container')

  allTracks.data.forEach((element) => {
    songContainer.innerHTML += `<div class="song d-flex align-items-center mb-3">
    <div class="track-number">
      <i class="fa-solid fa-chart-simple mr-3"></i>
    </div>
    <div class="album-thumbnail-container">
      <img
        class="album-thumbnail mr-3"
        src="${element.album.cover_small}"
      />
    </div>
    <div class="song-title">
      <span>
        ${element.title}
      </span>
    </div>
    <div class="play-counter">
      <span>${element.rank.toLocaleString('en-US')}</span>
    </div>
    <span class="song-length mr-3">${element.duration}</span>
  </div>`
  })

  const artistPickArtist = document.querySelector('.artist-pick-artist')
  artistPickArtist.innerHTML = artist.name
}
