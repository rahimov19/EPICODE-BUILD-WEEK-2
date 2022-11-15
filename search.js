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
  searchBar.value = "hello";
  const listOfSearch = await getSongs();
  console.log(listOfSearch);
  fillLeft(listOfSearch);
  document.querySelector("#searchbar").addEventListener("keyup", getSongs2);
  document
    .querySelector("#searchbar")
    .addEventListener("click", function (event) {
      event.target.value = "";
    });
};

let leftSideSearch = document.querySelector("#leftSearch");
let rightSideSeacrh = document.querySelector("#rightSearch");
let albumsSearch = document.querySelector("#searchAlbums");
let artistsSearch = document.querySelector("#searchArtists");

let clearAll = function () {
  leftSideSearch.innerHTML = "";
  rightSideSeacrh.innerHTML = "";
  albumsSearch.innerHTML = "";
  artistsSearch.innerHTML = "";
};

let fillLeft = function (listOfSearch) {
  clearAll();

  leftSideSearch.innerHTML = `<a href="#" class="aleftInside"><div class=leftInside><img src=${listOfSearch.data[0].album.cover_medium} class="sideImg" alt="">
    <h3>${listOfSearch.data[0].album.title}</h3>
    <p>${listOfSearch.data[0].artist.name}</p></div></a>`;
  rightSideSeacrh.innerHTML = "";
  for (i = 0; i < 6; i++) {
    rightSideSeacrh.innerHTML += `<li><a href="#" class="row col-12 songslist"><img src=${
      listOfSearch.data[i].album.cover_small
    } alt=""> 
    <div class="spanText col-10"><span>${
      listOfSearch.data[i].artist.name
    }</span>
    <span>${listOfSearch.data[i].title}</span></div>
    <span class="duration">${
      (listOfSearch.data[i].duration - (listOfSearch.data[i].duration %= 60)) /
        60 +
      (9 < listOfSearch.data[i].duration ? ":" : ":0") +
      listOfSearch.data[i].duration
    }</span></a></li>`;
  }
  for (i = 0; i < 6; i++) {
    albumsSearch.innerHTML += `
    <a class="col-2" href="albums.html?q=${listOfSearch.data[i].album.id}"><div class="col-12"> <div class="searchCard"><img class="cardimg" src=${listOfSearch.data[i].album.cover_medium}>
<h5>${listOfSearch.data[i].album.title}</h5>
<p>${listOfSearch.data[i].artist.name}</p>

</div></div></a> `;
  }

  for (i = 0; i < 6; i++) {
    artistsSearch.innerHTML += `
    <a class="col-2" href="artists.html?q=${listOfSearch.data[i].artist.id}"><div class="col-12"> <div class="searchCard"><img class="cardimg" src=${listOfSearch.data[i].artist.picture_medium}>
<h5>${listOfSearch.data[i].artist.name}</h5>
<p>Artist</p>
</div></div> </a>`;
  }
};

const getSongs2 = async (event) => {
  if (event.keyCode === 13) {
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${event.target.value}`,
        options
      );
      if (response.ok) {
        const listOfSearch = await response.json();
        fillLeft(listOfSearch);
      } else {
        console.log("Error while fetching");
      }
    } catch (error) {
      console.error(error);
    }
  }
};

let allButton = document.querySelector("#searchAllButton");
let songsButton = document.querySelector("#searchSongsButton");
let albumsButton = document.querySelector("#searchAlbumsButton");
let artistsButton = document.querySelector("#searchArtistsButton");
let mainRow = document.querySelector("#mainRow");

const fillSearchSongs = async () => {
  try {
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
    if (response.ok) {
      const listOfSearch = await response.json();
      clearAll();
      mainRow.innerHTML = "";
      mainRow.innerHTML = `
<div class="col-12"> 
<ul class="songsUl">
<li>
</ul>
</div>
`;
    } else {
      console.log("Error while fetching");
    }
  } catch (error) {
    console.error(error);
  }
};
