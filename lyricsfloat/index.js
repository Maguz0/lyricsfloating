(async function lyricsFloatApp() {
  // Espera a que Spicetify esté listo
  if (!Spicetify?.Player || !Spicetify?.Platform) {
    setTimeout(lyricsFloatApp, 300);
    return;
  }

  // Verifica que el contenedor esté en el DOM
  const lyricsContainer = document.getElementById("lyrics");

  if (!lyricsContainer) {
    console.warn("🚫 No se encontró el elemento con ID 'lyrics'.");
    return;
  }

  // Extrae metadata de la canción actual
  const track = Spicetify.Player.data.track;
  const metadata = {
    title: track.name,
    artist: track.artists.map(a => a.name).join(", "),
    duration: track.duration,
    album: track.album.name
  };

  console.log("🎵 Metadata:", metadata);

  // Letras de ejemplo (puedes reemplazar esto con letras reales desde una API)
  function getLyricsMock() {
    return [
      { time: 0, text: `${metadata.title} - ${metadata.artist}` },
      { time: 5, text: "Primera línea de ejemplo..." },
      { time: 10, text: "Segunda línea de ejemplo..." }
    ];
  }

  // Sincroniza la letra con el tiempo de la canción
  function syncLyrics() {
    const lyrics = getLyricsMock();
    let index = 0;

    const interval = setInterval(() => {
      const currentTime = Spicetify.Player.getProgress() / 1000;
      if (index < lyrics.length && currentTime >= lyrics[index].time) {
        lyricsContainer.innerText = lyrics[index].text;
        index++;
      }
    }, 500);
  }

  // Lanza el sincronizador
  syncLyrics();
})();
