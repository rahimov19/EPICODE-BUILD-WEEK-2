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

  allTracks.data.forEach((element, index) => {
    songContainer.innerHTML += `<div class="song d-flex align-items-center mb-3" onclick="playSong('${
      element.title
    }', '${artist.name}', '${element.album.cover_small}', event)">
    <div class="track-number">
      ${index + 1}
    </div>
    <div class="album-thumbnail-container">
      <a href="albums.html?albumID=${element.album.id}"><img
        class="album-thumbnail mr-3" 
        src="${element.album.cover_small}"
      /></a>
    </div>
    <div class="song-title">
      <span class="" ">
        ${element.title}
      </span></a>
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

const playSong = (footerSong, footerArtist, albumCover, event) => {
  //Gets the DOM elements of the footer
  const songTitleFooter = document.querySelector('.footer-song')
  const artist = document.querySelector('.footer-artist')
  const footerCover = document.querySelector('.album-cover-footer')

  //Search the DOM for all elements that are currently 'green' (the one being played), and turn them white again
  const currentlyPlayed = document.querySelectorAll('.playing')

  for (let i = 0; i < currentlyPlayed.length; i++) {
    currentlyPlayed[i].classList.remove('playing')
  }

  //Turns the clicked element green to show that it is currently playing
  event.target.classList.add('playing')

  // Assigns the values passed in the function to the DOM elements in the footer
  songTitleFooter.innerHTML = footerSong
  artist.innerHTML = footerArtist
  footerCover.setAttribute('src', albumCover)
}
