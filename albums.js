const URLparams = new URLSearchParams(window.location.search);
const albumID = URLparams.get("albumID");
let albumInfoContainer = document.querySelector("#toppart");
let tracklistContainer = document.querySelector("#tracklist");
const baseUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/`;
// const albumId = 125973652;
async function getData() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  const response = await fetch(baseUrl + albumID, options);
  const album = await response.json();
  console.log(album);
  return album;
}
window.onload = async () => {
  const album = await getData();
  fillDataAlbum(album);
  fillDataSongs(album);
  let albumDate = new Date(album.release_date);
  console.log(albumDate.getFullYear());
};

let fillDataAlbum = function (album) {
  albumInfoContainer.innerHTML = "";
  albumInfoContainer.innerHTML = `
  <div class="row justify-content-sm-center">
    <div class="col-2 col-sm-6" id="albumLeft"><img id="album-cover-album" src=${
      album.cover_xl
    }></div>
    <div class="col-10 col-sm-12" id="albumRight">
      <div class="album-text">
        <p class="album-small-text d-sm-none">ALBUM</p>
        <h2 class="album-name">${album.title}</h2>
        <div>
          <img id="artist-small-pic" src=${album.artist.picture_small}>
          <span>${album.artist.name}</span>
          <div class="d-sm-flex d-sm-block d-none">
          <span class="album-small-text d-sm-block">ALBUM</span>
          <span class="pl-1">${album.release_date}</span>
          <span class="d-sm-none" >${album.nb_tracks} songs</span>
          <span class="d-sm-none">${
            (album.duration - (album.duration %= 60)) / 60 +
            (9 < album.duration ? ":" : ":0") +
            album.duration
          } 
          </div>
        </div>
       </div>`;
};

let fillDataSongs = function (listOfData) {
  tracklistContainer.innerHTML = `<li class="row border-bottom align-items-center">
  <span>#</span>
  <div class="song"><span class="my-auto">Title</span></div>
  <span><i class="bi bi-clock pr-2"></i></span>`;
  for (i = 0; i < listOfData.tracks.data.length; i++) {
    tracklistContainer.innerHTML += `
  <li class="row align-items-center">
    <span>${[i + 1]}</span>
    <div class="song" onclick="playSong('${
      listOfData.tracks.data[i].title
    }', '${listOfData.tracks.data[i].artist.name}', '${
      listOfData.tracks.data[i].album.cover_small
    }', event)"><span>${
      listOfData.tracks.data[i].title
    }</span></a><span class="fw-light">${
      listOfData.tracks.data[i].artist.name
    } </span></div>
    <span>${
      (listOfData.tracks.data[i].duration -
        (listOfData.tracks.data[i].duration %= 60)) /
        60 +
      (9 < listOfData.tracks.data[i].duration ? ":" : ":0") +
      listOfData.tracks.data[i].duration
    }</span>
`;
  }
};

const playSong = (footerSong, footerArtist, albumCover, event) => {
  //Gets the DOM elements of the footer
  const songTitleFooter = document.querySelector(".footer-song");
  const artist = document.querySelector(".footer-artist");
  const footerCover = document.querySelector(".album-cover-footer");

  const footer = document.querySelector(".footer");
  footer.classList.remove("d-none");

  //Search the DOM for all elements that are currently 'green' (the one being played), and turn them white again
  const currentlyPlayed = document.querySelectorAll(".playing");

  for (let i = 0; i < currentlyPlayed.length; i++) {
    currentlyPlayed[i].classList.remove("playing");
  }

  //Turns the clicked element green to show that it is currently playing
  //event.target.classList.add('playing')

  // Assigns the values passed in the function to the DOM elements in the footer
  songTitleFooter.innerHTML = footerSong;
  artist.innerHTML = footerArtist;
  footerCover.setAttribute("src", albumCover);
};

const playerControls = () => {
  const pause = document.querySelector(".pause-footer");
  const play = document.querySelector(".play-footer");

  pause.classList.toggle("d-none");
  play.classList.toggle("d-none");
};
