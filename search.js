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
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchBar.value}`,
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
    .querySelector("#searchAllButton")
    .addEventListener("click", function () {
      returnToAll();
      getSongs2;
    });
  document
    .querySelector("#searchAllButton")
    .addEventListener("click", getSongs2);
  document
    .querySelector("#searchbar")
    .addEventListener("click", function (event) {
      event.target.value = "";
    });
  document
    .querySelector("#searchSongsButton")
    .addEventListener("click", function () {
      fillSearchSongs();
    });
  document
    .querySelector("#searchArtistsButton")
    .addEventListener("click", function () {
      fillSearchArtists();
    });
  document
    .querySelector("#searchAlbumsButton")
    .addEventListener("click", function () {
      fillSearchAlbums();
    });
};

let leftSideSearch = document.querySelector("#leftSearch");
let rightSideSeacrh = document.querySelector("#rightSearch");
let albumsSearch = document.querySelector("#searchAlbums");
let artistsSearch = document.querySelector("#searchArtists");
let mainRow = document.querySelector("#mainrow");

let clearAll = function () {
  document.querySelector("#leftSearch").innerHTML = "";
  document.querySelector("#rightSearch").innerHTML = "";
  document.querySelector("#searchAlbums").innerHTML = "";
  document.querySelector("#searchArtists").innerHTML = "";
};

let returnToAll = function () {
  document.querySelector(".main-content").innerHTML = "";
  document.querySelector(
    ".main-content"
  ).innerHTML = `<div class="row" id="undersearch">
    <div class="col-3" id="h3BR"><h3>Best Result:</h3></div>
    <div class="col-9 pl-5" id="h3S"><h3>Songs:</h3></div>
   
</div>

<div class="row" id="mainrow"> 
    <div class="col-3" id="leftSearch">
    <img src="" alt="">
    <h3>Name of Album</h3>
    <p>Name of Artist</p>
</div>
<div class="col-9" >
    <ul id="rightSearch">
        <li><img src="" alt=""><span>Name of Artist</span><span>Name of track</span>
        <span>duration</span></li>
    </ul>
</div>
</div>
<h2 id="h2Albums">Albums</h2>
<div class="row" id="searchAlbums">
</div>
<h2 id="h2Artists">Artists</h2>
<div class="row" id="searchArtists">
</div>`;
};

let fillLeft = function (listOfSearch) {
  console.log("fillleft");
  clearAll();

  document.querySelector(
    "#leftSearch"
  ).innerHTML = `<a href="#" class="aleftInside"><div class=leftInside><img src=${listOfSearch.data[0].album.cover_medium} class="sideImg" alt="">
    <h3>${listOfSearch.data[0].album.title}</h3>
    <p>${listOfSearch.data[0].artist.name}</p></div></a>`;
  document.querySelector("#rightSearch").innerHTML = "";
  for (i = 0; i < 6; i++) {
    document.querySelector(
      "#rightSearch"
    ).innerHTML += `<li><a href="#" class="row col-12 songslist"><img src=${
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
    document.querySelector("#searchAlbums").innerHTML += `
    <a class="col-2" href="albums.html?q=${listOfSearch.data[i].album.id}"><div class="col-12"> <div class="searchCard"><img class="cardimg" src=${listOfSearch.data[i].album.cover_medium}>
<h5>${listOfSearch.data[i].album.title}</h5>
<p>${listOfSearch.data[i].artist.name}</p>

</div></div></a> `;
  }

  for (i = 0; i < 6; i++) {
    document.querySelector("#searchArtists").innerHTML += `
    <a class="col-2" href="artists.html?q=${listOfSearch.data[i].artist.id}"><div class="col-12"> <div class="searchCard"><img class="cardimg" src=${listOfSearch.data[i].artist.picture_medium}>
<h5>${listOfSearch.data[i].artist.name}</h5>
<p>Artist</p>
</div></div> </a>`;
  }

  document.querySelector("#searchSongsButton").className =
    "btn btn-dark searchbuttons";
  document.querySelector("#searchAllButton").className =
    "btn btn-dark searchbuttons active";
  document.querySelector("#searchArtistsButton").className =
    "btn btn-dark searchbuttons";
  document.querySelector("#searchAlbumsButton").className =
    "btn btn-dark searchbuttons";
};

const getSongs2 = async (event) => {
  if (event.keyCode === 13 || event.target.id === "searchAllButton") {
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
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchBar.value}`,
        options
      );
      if (response.ok) {
        const listOfSearch = await response.json();
        console.log("getSongs2");
        // CHANGE CLASSES OF BUTTONS TO IF STATEMENT
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
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchBar.value}`,
      options
    );
    if (response.ok) {
      const listOfSongsSearch = await response.json();
      console.log(listOfSongsSearch);
      fillSongs(listOfSongsSearch);
    } else {
      console.log("Error while fetching");
    }
  } catch (error) {
    console.error(error);
  }
};

let fillSongs2 = function () {
  console.log("fillsongs2");
  clearAll();
  document.querySelector("#h2Albums").innerHTML = "";
  document.querySelector("#h2Artists").innerHTML = "";
  document.querySelector(
    "#h3BR"
  ).innerHTML = `<h3 class="mb-3">Search Results:</h3>`;
  document.querySelector("#h3S").innerHTML = "";

  document.querySelector("#mainrow").innerHTML = `<table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Album</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
        
      <tbody id="tablebody"></tbody>
      `;
};

let fillSongs = function (listOfSearch) {
  console.log("fillsongs");
  fillSongs2();
  for (i = 0; i < 20; i++) {
    document.querySelector("#tablebody").innerHTML += `
        <tr>
        <th scope="row">${[i + 1]}</th>
        <td><div class="songtitle"><img src=${
          listOfSearch.data[i].album.cover_small
        } alt="">
        <div class="spanText col-10"><span>${
          listOfSearch.data[i].artist.name
        }</span>
        <span>${listOfSearch.data[i].title}</span></div></td>
        <td>${listOfSearch.data[i].album.title}</td>
        <td>${
          (listOfSearch.data[i].duration -
            (listOfSearch.data[i].duration %= 60)) /
            60 +
          (9 < listOfSearch.data[i].duration ? ":" : ":0") +
          listOfSearch.data[i].duration
        }</td>
      </tr>

  `;
  }
  mainRow.innerHTML += `
</table>`;
  document.querySelector("#searchSongsButton").className =
    "btn btn-dark searchbuttons active";
  document.querySelector("#searchAllButton").className =
    "btn btn-dark searchbuttons";
  document.querySelector("#searchArtistsButton").className =
    "btn btn-dark searchbuttons";
  document.querySelector("#searchAlbumsButton").className =
    "btn btn-dark searchbuttons";
};

const fillSearchArtists = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchBar.value}`,
      options
    );
    if (response.ok) {
      const listOfSongsSearch = await response.json();
      console.log(listOfSongsSearch);
      fillArtists(listOfSongsSearch);
    } else {
      console.log("Error while fetching");
    }
  } catch (error) {
    console.error(error);
  }
};

let fillArtists2 = function () {
  document.querySelector("#searchSongsButton").className =
    "btn btn-dark searchbuttons";
  document.querySelector("#searchAllButton").className =
    "btn btn-dark searchbuttons";
  document.querySelector("#searchArtistsButton").className =
    "btn btn-dark searchbuttons active";
  document.querySelector("#searchAlbumsButton").className =
    "btn btn-dark searchbuttons";

  console.log("fillArtists2");
  //   clearAll();
  document.querySelector("#searchAlbums").innerHTML = "";
  document.querySelector("#searchArtists").innerHTML = "";
  document.querySelector("#h2Albums").innerHTML = "";
  document.querySelector("#h2Artists").innerHTML = "";
  document.querySelector(
    "#h3BR"
  ).innerHTML = `<h3 class="mb-3">Search Results:</h3>`;
  document.querySelector("#h3S").innerHTML = "";

  document.querySelector(
    "#mainrow"
  ).innerHTML = `<div id="artistsbody" class="row col-12 ml-3"></div>`;
};

let fillArtists = function (listOfSearch) {
  console.log("fillArtists");
  fillArtists2();
  for (i = 0; i < 30; i++) {
    document.querySelector("#artistsbody").innerHTML += `
         <div class="searchArtistCard col-2 mb-3" >
         <img class="artistSearchImg" src=${listOfSearch.data[i].artist.picture_medium}>
         <h5>${listOfSearch.data[i].artist.name}</h5>
         <p>Artist</p>
         `;
  }
};

const fillSearchAlbums = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchBar.value}`,
      options
    );
    if (response.ok) {
      const listOfSongsSearch = await response.json();
      console.log(listOfSongsSearch);
      fillAlbums(listOfSongsSearch);
    } else {
      console.log("Error while fetching");
    }
  } catch (error) {
    console.error(error);
  }
};

let fillAlbums2 = function () {
  document.querySelector("#searchSongsButton").className =
    "btn btn-dark searchbuttons";
  document.querySelector("#searchAllButton").className =
    "btn btn-dark searchbuttons";
  document.querySelector("#searchArtistsButton").className =
    "btn btn-dark searchbuttons ";
  document.querySelector("#searchAlbumsButton").className =
    "btn btn-dark searchbuttons active";

  console.log("fillAlbums2");
  //   clearAll();
  document.querySelector("#searchAlbums").innerHTML = "";
  document.querySelector("#searchArtists").innerHTML = "";
  document.querySelector("#h2Albums").innerHTML = "";
  document.querySelector("#h2Artists").innerHTML = "";
  document.querySelector(
    "#h3BR"
  ).innerHTML = `<h3 class="mb-3">Search Results:</h3>`;
  document.querySelector("#h3S").innerHTML = "";

  document.querySelector(
    "#mainrow"
  ).innerHTML = `<div id="artistsbody" class="row col-12 ml-3"></div>`;
};

let fillAlbums = function (listOfSearch) {
  console.log("fillAlbums");
  fillAlbums2();
  for (i = 0; i < 30; i++) {
    document.querySelector("#artistsbody").innerHTML += `
           <div class="searchArtistCard col-2 mb-3" >
           <img class="albumsSearchImg" src=${listOfSearch.data[i].album.cover_medium}>
           <h5>${listOfSearch.data[i].album.title}</h5>
           <p>${listOfSearch.data[i].artist.name}</p>
           `;
  }
};
