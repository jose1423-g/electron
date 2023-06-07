let timbrado = document.getElementById('timbrado')
// Función para redireccionar a la página "index.html"
let tiempo = setInterval(restarMinuto, 60000);
let minutos = 10;

const time  = document.getElementById('time');
if (time) {
  time.innerHTML = minutos
}

//esta funcion se llama cada 60 segundos
function restarMinuto() {
  minutos--;
  if (minutos == 0) {
    minutos = 0;
    clearInterval(tiempo)
    redirectToIndex()
  } 
  if (time) {
    time.innerHTML = minutos;    
  }
}

if (timbrado) {
  setTimeout(function () {
    redirectToIndex()
  }, 30000)
}

function redirectToIndex() {
  window.location.href = "index.html";
}