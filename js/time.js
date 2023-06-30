const timbrado = document.getElementById('timbrado')
const time  = document.getElementById('time');

function show_data() {
  fetch("../config.json", {
      method: 'POST',
  }).then(function(data) {
      return data.json()  
  }).then(json => {
      let json_minutos = json[0].v_sesion
      let minutos = 10;      
      if (json_minutos == '') {
      //muestra la variable minutos  
        if (time) {
          time.innerHTML = minutos            
        }  
      } else {
          minutos = json_minutos;
          if (time) {
            time.innerHTML = minutos            
          }  
      }

      //cada 60 segundos se llama a la funcion restarMinuto
      let tiempo = setInterval(restarMinuto, 60000);

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

      // si existe la id timbrado
      if (timbrado) {
        setTimeout(function () {
          redirectToIndex()
        }, 30000) //30 segundos
      }

      //redirecciona al index
      function redirectToIndex() {
        window.location.href = "index.html";
      }

  })
  .catch(error => {
      let minutos = 10;      
      //cada 60 segundos se llama a la funcion restarMinuto
      let tiempo = setInterval(restarMinuto, 60000);

      //muestra la variable minutos  
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

      // si existe la id timbrado
      if (timbrado) {
        setTimeout(function () {
          redirectToIndex()
        }, 30000) //30 segundos
      }

      //redirecciona al index
      function redirectToIndex() {
        window.location.href = "index.html";
      }
  });
}
show_data()