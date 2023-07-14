const client = require('electron-virtual-keyboard/client.js');
var jQuery = $ = require('jquery');
require('electron-virtual-keyboard/client.js')(window, jQuery);

let RFC = document.getElementById('RFC');

const teclado = $('.keyboard').keyboard({
  theme: '',
  layout: 'us-en', 
  autoPosition: true,
  displayOnFocus: true,
})


let Observaciones = document.getElementById('Observaciones');
let Referencia_index = document.getElementById('referencia_index');
let email1 = document.getElementById('Email');
let Pass = document.getElementById('pass');
let Usuario = document.getElementById('Usuario');



if (Observaciones) {
  Observaciones.addEventListener('focus', () => {
    const inputRect = Observaciones.getBoundingClientRect();
    const desiredPosition = inputRect.top;
    const targetPosition = desiredPosition + window.pageYOffset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
}

if (Referencia_index) {
  Referencia_index.addEventListener('focus', () => {
    const inputRect = Referencia_index.getBoundingClientRect();
    const desiredPosition = inputRect.top;
    const targetPosition = desiredPosition + window.pageYOffset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
}

if (email1) {
  email1.addEventListener('focus', () => {
    const inputRect = email1.getBoundingClientRect();
    const desiredPosition = inputRect.top;
    const targetPosition = desiredPosition + window.pageYOffset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });  
}

if (Pass) {
  Pass.addEventListener('focus', () => {
    const inputRect = Pass.getBoundingClientRect();
    const desiredPosition = inputRect.top;
    const targetPosition = desiredPosition + window.pageYOffset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });  
}

if (Usuario) {
  Usuario.addEventListener('focus', () => {
    const inputRect = Usuario.getBoundingClientRect();
    const desiredPosition = inputRect.top;
    const targetPosition = desiredPosition + window.pageYOffset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });  
}




//quita el teclado al darle enter al rfc
if (RFC) {
  RFC.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        teclado.hide()
      }
    })
}