const searchSong = async () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySong(data.data);
    }
    catch (error) {
        displayError('Something Went Wrong!! Please try again later!');

    }


    //  .catch(error => displayError('Something Went Wrong!! Please try again later!'));
}
const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
    <div class="col-md-9">
    <h3 class="lyrics-name">${song.title}</h3>
    <p class="author lead">Album by <span>${song.artist.name}</span></p>
</div>
<div class="col-md-3 text-md-right text-center">
    <button class="btn btn-success">Get Lyrics</button>
    <audio controls>
      <source src="${song.preview}" type="audio/mpeg">
  </audio>
</div>
   <div class="col-md-3 text-md-right text-center">
     <button onclick ="getLyric('${song.artist.name}', '${song.title}' )" class ="btn btn-success"> Get Lyrics</button>
   </div>
    `
        songContainer.appendChild(songDiv);
    });
}

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.layics);
    }
    catch (error) {
      displayError('sorry! I failed to load lyrics try again later')
    }

}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-messages')
    errorTag.innerText

}
