const client = require('electron-virtual-keyboard/client.js');

var jQuery = $ = require('jquery');
require('electron-virtual-keyboard/client.js')(window, jQuery);


const teclado = $('.keyboard').keyboard({
  theme: '',
  layout: 'us-en', 
  autoPosition: true,
  displayOnFocus: true
})

//quita el teclado al darle enter al rfc
const key_rfc = document.getElementById('RFC')
if (key_rfc) {
  key_rfc.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        teclado.hide()
      }
  })
}
