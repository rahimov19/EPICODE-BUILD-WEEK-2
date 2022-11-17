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
  <div class="row">
    <div class="col-2" id="albumLeft"><img id="album-cover-album" src=${
      album.cover_xl
    }></div>
    <div class="col-10" id="albumRight">
      <div class="album-text">
        <p class="album-small-text">ALBUM</p>
        <h2 class="album-name">${album.title}</h2>
        <div>
          <img id="artist-small-pic" src=${album.artist.picture_small}>
          <span>${album.artist.name}</span>
          <span class="pl-1">${album.release_date}</span>
          <span>${album.nb_tracks} songs</span>
          <span>${
            (album.duration - (album.duration %= 60)) / 60 +
            (9 < album.duration ? ":" : ":0") +
            album.duration
          } 
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
    <div class="song"><span>${
      listOfData.tracks.data[i].title
    }</span><span class="fw-light">${
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
