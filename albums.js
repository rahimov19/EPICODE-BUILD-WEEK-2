let albumInfoContainer = document.querySelector("#toppart");
let tracklistContainer = document.querySelector("#tracklist");

async function getData() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/album/125973652",
    options
  );

  const listOfData = await response.json();
  console.log(listOfData);
  return listOfData;
}
window.onload = async () => {
  const listOfData = await getData();
  fillDataAlbum(listOfData);
  fillDataSongs(listOfData);
};

let fillDataAlbum = function (listOfData) {
  albumInfoContainer.innerHTML = "";
  albumInfoContainer.innerHTML = `
  <div class="row">
    <div class="col-2" id="albumLeft"><img src=${listOfData.cover_xl}></div>
    <div class="col-10" id="albumRight">
      <div class="albumtext">
        <p class="albumsmalltext">Album</p>
        <h2 class="albumname">${listOfData.title}</h2>
        <div>
          <img src=${listOfData.artist.picture_small}>
          <span>${listOfData.tracks.data.length} Songs</span>
          <span>${
            (listOfData.duration - (listOfData.duration %= 60)) / 60 +
            (9 < listOfData.duration ? ":" : ":0") +
            listOfData.duration
          } 
        </div>
       
    </div>
  `;
};

let fillDataSongs = function (listOfData) {
  tracklistContainer.innerHTML = `<li class="row">
  <span>#</span>
  <div class="song"><span class="my-auto">Title</span></div>
  <span>Duration</span>`;
  for (i = 0; i < listOfData.tracks.data.length; i++) {
    tracklistContainer.innerHTML += `
  <li class="row">
    <span>${[i + 1]}</span>
    <div class="song"><span>${listOfData.tracks.data[i].title}</span><span>${
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
