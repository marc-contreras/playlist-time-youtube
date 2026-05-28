function timeToSeconds(time) {
  const parts = time.split(":").map(Number);

  // Si tiene formato hh:mm:ss
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  // Si tiene formato mm:ss
  return parts[0] * 60 + parts[1];
}

setTimeout(() => {

  console.log("Playlist Time loaded");

  // Buscar todos los timestamps
  const times = [...document.querySelectorAll(
    "ytd-thumbnail-overlay-time-status-renderer span"
  )]
    .map(el => el.textContent.trim())
    .filter(text => text.includes(":"));

  console.log(times);

  // Sumar tiempos
  const totalSeconds = times.reduce((acc, time) => {
    return acc + timeToSeconds(time);
  }, 0);

  console.log(totalSeconds);

  // Convertir a horas/minutos
  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  // Crear banner
  const totalDiv = document.createElement("div");

  totalDiv.innerText = `⏱ Total: ${hours}h ${minutes}m`;

  // Estilos
  totalDiv.style.position = "fixed";
  totalDiv.style.top = "20px";
  totalDiv.style.right = "20px";
  totalDiv.style.zIndex = "999999";
  totalDiv.style.background = "red";
  totalDiv.style.color = "white";
  totalDiv.style.padding = "20px";
  totalDiv.style.fontSize = "20px";
  totalDiv.style.fontWeight = "bold";

  // Añadir al DOM
  document.body.appendChild(totalDiv);

}, 3000);