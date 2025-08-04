(async function lyricsFloatApp() {
  const track = Spicetify.Player.data.track;
  const metadata = {
    title: track.name,
    artist: track.artists.map(a => a.name).join(", "),
    duration: track.duration,
    album: track.album.name
  };

  console.log("🎵 Metadata:", metadata); // Útil para verificar en la consola

  // Aquí podrías usar metadata para buscar letras
  const lyricsContainer = document.getElementById("lyrics");

  function getLyricsMock() {
    return [
      { time: 0, text: `${metadata.title} - ${metadata.artist}` },
      { time: 5, text: "Primera línea de ejemplo..." },
      { time: 10, text: "Segunda línea de ejemplo..." }
    ];
  }

  function syncLyrics() {
    const lyrics = getLyricsMock();
    let index = 0;
    const audio = Spicetify.Player;

    const interval = setInterval(() => {
      const currentTime = audio.getProgress() / 1000;
      if (index < lyrics.length && currentTime >= lyrics[index].time) {
        lyricsContainer.innerText = lyrics[index].text;
        index++;
      }
    }, 500);
  }

  document.addEventListener("DOMContentLoaded", syncLyrics);
})();
