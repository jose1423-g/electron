let index = document.getElementById('index');
let main = document.getElementById('main');
let audio;
let reproduciendo = false;
let audio_main;
let reproduciendo_main = false;

function StartAudioIndex() {
    audio = new Audio("../audio/Paso1.aac");
    audio.currentTime = 0;
    audio.play()
    reproduciendo = true;
    clearTimeout(timeout)
    //cuando termina de reproducirse el audio cambia la variable a false y reinicia la funcion 
    audio.onended = function() {
        reproduciendo = false;
        TimeAudio();
    };
}

function RestarAudio() {
    if (audio !== null) {
        audio.pause();
        audio.currentTime = 0;
        audio.play()
        //cuando se termine de reproducir el audio pone pausa y ejecuta la funcion TimeAudio
        audio.addEventListener('ended', function () {
            audio.pause();
            TimeAudio();
        })
      }
} 

let timeout;
function TimeAudio() {
    if (!reproduciendo) {
        timeout =  setTimeout(function  () {
            StartAudioIndex()       
        }, 60000)
    }
}

if (index) {
    TimeAudio();    
}

function Start() {
    if (reproduciendo) {
        RestarAudio()
        document.removeEventListener('click', Start)
        audio.addEventListener('ended', function () {
            document.addEventListener('click', Start)
        })
    } else {
        StartAudioIndex()
        document.removeEventListener('click', Start)
        audio.addEventListener('ended', function () {
            document.addEventListener('click', Start)
        })
    }
}

//MAIN
function StartAudioMain() {
    audio_main = new Audio("../audio/Paso2.aac");
    audio_main.currentTime = 0;
    audio_main.play()
    reproduciendo_main = true;
    clearTimeout(timeoutMain)
    //cuando termina de reproducirse el audio cambia la variable a false y reinicia la funcion 
    audio_main.onended = function() {
        reproduciendo_main = false;
        TimeAudioMain();
    };
}

function RestarAudioMain() {
    if (audio_main !== null) {
        audio_main.pause();
        audio_main.currentTime = 0;
        audio_main.play()
        //cuando se termine de reproducir el audio pone pausa y ejecuta la funcion TimeAudio
        audio_main.addEventListener('ended', function () {
            audio_main.pause();
            TimeAudioMain();
        })
      }
}

let timeoutMain;
function TimeAudioMain() {
    if (!reproduciendo) {
        timeoutMain =  setTimeout(function  () {
            StartAudioMain()       
        }, 60000) 
    }
}
if (main) {
    TimeAudioMain();    
}

function StartMain() {
    if (reproduciendo_main) {
        RestarAudioMain()
        document.removeEventListener('click', StartMain)
        audio_main.addEventListener('ended', function () {
            document.addEventListener('click', StartMain)
        })
    } else {
        StartAudioMain()
        document.removeEventListener('click', StartMain)
        audio_main.addEventListener('ended', function () {
            document.addEventListener('click', StartMain)
        })
    }
}

if (index) {
    document.addEventListener('click', Start)    
}
if (main) {
    document.addEventListener('click', StartMain)
}