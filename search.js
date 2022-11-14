let searchBar = document.querySelector("#searchbar");
async function getSongs() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchBar.value}`,
    options
  );

  const listOfSearch = await response.json();
  return listOfSearch;
}
window.onload = async () => {
  const listOfSearch = await getSongs();
  console.log(listOfSearch);
  fillLeft(listOfSearch);
};

let leftSideSearch = document.querySelector("#leftSearch");
let rightSideSeacrh = document.querySelector("#rightSearch");
let albumsSearch = document.querySelector("#searchAlbums");
let artistsSearch = document.querySelector("#searchArtists");

let fillLeft = function (listOfSearch) {
  leftSideSearch.innerHTML = `<img src=${listOfSearch.data[0].album.cover_medium} class="sideImg" alt="">
    <h3>${listOfSearch.data[0].album.title}</h3>
    <p>${listOfSearch.data[0].artist.name}</p>`;
  rightSideSeacrh.innerHTML = "";
  for (i = 0; i < 6; i++) {
    rightSideSeacrh.innerHTML += `<li><img src=${listOfSearch.data[i].album.cover_small} alt=""> 
    <span>${listOfSearch.data[i].artist.name}</span>
    <span>${listOfSearch.data[i].title}</span>
    <span>${listOfSearch.data[i].duration}</span></li>`;
  }
  for (i = 0; i < 6; i++) {
    albumsSearch.innerHTML += `
<div class="col-2"> <div><img class="cardimg" src=${listOfSearch.data[i].album.cover_medium}>
<h5>${listOfSearch.data[i].album.title}</h5>
<p>${listOfSearch.data[i].artist.name}</p>
</div></div> `;
  }

  for (i = 0; i < 6; i++) {
    artistsSearch.innerHTML += `
<div class="col-2"> <div><img class="cardimg" src=${listOfSearch.data[i].artist.picture_medium}>
<h5>${listOfSearch.data[i].artist.name}</h5>
<p>Artist</p></div></div> `;
  }
};
