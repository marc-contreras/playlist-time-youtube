function timeToSeconds(time) {
  const parts = time.split(":").map(Number);

  return parts.length === 3
    ? parts[0] * 3600 + parts[1] * 60 + parts[2]  // Si tiene formato hh:mm:ss
    : parts[0] * 60 + parts[1]; // Si tiene formato mm:ss
}

//setTimeout(() => { // only acts when the page is refreshed

  console.log("Playlist Time loaded");

  function calculatePlayListTime() {
    //console.log('Entra en la función calculatePlayListTime');
    // Buscar en panel de playlist
    const playlistPanel = document.querySelector(".ytd-playlist-panel-renderer");

  // Buscar todos los timestamps
    const times = [...playlistPanel.querySelectorAll(
      ".ytd-thumbnail-overlay-time-status-renderer span"
    )]
      .map(el => el.textContent.trim())
      .filter(text => /^\d+:\d{2}(:\d{2})?$/.test(text));
    
    //console.log(times, 'lista de todos los tiempos de la lista');

    // Sumar tiempos
    const totalSeconds = times.reduce((acc, time) => {
      return acc + timeToSeconds(time);
    }, 0);

    //console.log(totalSeconds, 'suma de todos los tiempos');

    // Convertir a horas/minutos
    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    // Crear banner
    const totalDiv = document.createElement("div");

    totalDiv.innerText = `⏱ Total: ${hours}h ${minutes}m`;

    // Estilos
    totalDiv.style.position = "fixed";
    totalDiv.style.bottom = "20px";
    totalDiv.style.right = "20px";
    totalDiv.style.zIndex = "999999";
    totalDiv.style.background = "red";
    totalDiv.style.color = "white";
    totalDiv.style.padding = "20px";
    totalDiv.style.fontSize = "20px";
    totalDiv.style.fontWeight = "bold";

    // Añadir al DOM
    document.body.appendChild(totalDiv);
    //console.log(totalDiv, 'contenido del div');
  }


//}, 3000);

// each 2 seconds apply the function as a parameter

//setInterval(calculatePlayListTime, 2000);

// When DOM is edited the function will be applied

// crear observador

const observer = new MutationObserver(() => {
  calculatePlayListTime()
  //console.log('DOM has been edited');
});


setTimeout(() => {
  //console.log(document.querySelector(".ytd-playlist-panel-renderer"));

  if(document.querySelector(".ytd-playlist-panel-renderer") != null){
    //console.log('Lista no es null');
    observer.observe(document.querySelector(".ytd-playlist-panel-renderer"), {
      subtree: true,
      childList: true,
    });
}
}, 5000);



