async function getAlbums() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=hello`,
    options
  );

  const listOfSearch = await response.json();
  return listOfSearch;
}

async function getSongs() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=skillet`,
    options
  );

  const listOfSongs = await response.json();
  return listOfSongs;
}

async function getArtist() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=song`,
    options
  );

  const listOfArtists = await response.json();
  return listOfArtists;
}

window.onload = async () => {
  const listOfSearch = await getAlbums();
  const listOfSongs = await getSongs();
  const listOfArtists = await getArtist();
  console.log(listOfArtists);
  console.log(listOfSearch);
  console.log(listOfSongs);
  fillPageAlbums(listOfSearch);
  fillPageSongs(listOfSongs);
  fillPageArtists(listOfArtists);
};

let topsidecards = document.querySelector("#topsidecards");
let firstRow = document.querySelector("#firstAlbumRow");
let secondRow = document.querySelector("#secondAlbumRow");

const fillPageAlbums = function (listOfSearch) {
  topsidecards.innerHTML = "";
  for (i = 0; i < 10; i++) {
    topsidecards.innerHTML += `<div class="sidecards col-2">
<img
  class="col-4"
  src="${listOfSearch.data[i].album.cover_medium}"
  alt=""
/>
<p class="col-8 sidetext">${listOfSearch.data[i].album.title}</p>
</div>`;
  }
};

const fillPageSongs = function (listOfSongs) {
  firstRow.innerHTML = "";
  for (i = 0; i < 8; i++) {
    firstRow.innerHTML += `<div class="albumCard">
        <img
          class="col-11"
          src="${listOfSongs.data[i].album.cover_medium}"
          alt=""
        />
        <div class="albumText">
          <p>${listOfSongs.data[i].artist.name}</p>
          <p>${listOfSongs.data[i].title}</p>
        </div>
      </div>`;
  }
};

const fillPageArtists = function (listOfArtists) {
  secondRow.innerHTML = "";
  for (i = 0; i < 8; i++) {
    secondRow.innerHTML += `<div class="albumCard">
          <img
            class="col-11"
            src="${listOfArtists.data[i].artist.picture}"
            alt=""
          />
          <div class="albumText">
            <p>${listOfArtists.data[i].artist.name}</p>
            </div>
        </div>`;
  }
};
