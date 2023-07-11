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

const teclado2 = $('.keyboard2').keyboard({
  theme: '',
  layout: 'us-en', 
  autoPosition: true,
  displayOnFocus: true
})

//quita el teclado al darle enter al rfc
if (RFC) {
  RFC.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        teclado.hide()
      }
    })
}