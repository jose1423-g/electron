let audio;
let reproduciendo = false;
let duracionFormateada;
let interval = setInterval(StartAudioIndex, 20000) //10 segundos

function StartAudioIndex() {
    audio = new Audio("https://manzdev.github.io/codevember2017/assets/eye-tiger.mp3");
    audio.play()
    reproduciendo = true;

    audio.addEventListener('play', function () {
        console.log('reproduciendo')
    })
    audio.addEventListener('pause', function () {
        console.log('Audio en pausa');
    })
    //cuando termina de reproducirse el video cambia la variable a false
    audio.onended = function() {
        reproduciendo = false;
    };
}

function  RestarAudio() {
    if (audio !== null) {
        audio.pause();
        audio.currentTime = 0;
        audio.play()
        audio.addEventListener('ended', function () {
            console.log('termino de reproducirse');
            clearInterval(interval);
        })
      }
} 

//detiene el audio
function StopAudio() {
    if (audio !== null) {
        audio.pause();
        audio.currentTime = 0;
      }
}

//cuando le den click manda a llamar la funcion StartAudioIndex() si la funcion ya habia sido llamada, se llamara a la funcion RestarAudio
function Start() {
    if (reproduciendo) {
        console.log("true")
        RestarAudio()
    } else {
        StartAudioIndex()
        console.log("false")
    }
}

document.addEventListener('click', Start)



// audio.addEventListener('loadedmetadata', function() {
// Obtiene la duración del audio en segundos
//     const duracion = audio.duration;
// Convierte la duración a un formato legible para humanos (por ejemplo, minutos y segundos)
//     duracionFormateada = formatearDuracion(duracion);

// Imprime la duración del audio
//     console.log(`Duración del audio: ${duracionFormateada}`);

// });

// function formatearDuracion(duracion) {
//     const minutos = Math.floor(duracion / 60);
//     const segundos = Math.floor(duracion % 60);
//     return `${minutos}:${segundos}`;
//   }