const dbclick = document.getElementById('logo-kisko')
const logo  = document.getElementById('logo-gasofac')
const texto_bienvenida  = document.getElementById('texto-bienvenida')
const icon = document.getElementById('info')
const btn_close = document.getElementById('btn_close')
const modal = document.getElementById('modal_local')

const carouselContainer = document.querySelector('.carousel-container');
const carouselItems = document.querySelectorAll('.carousel-item1');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

dbclick.addEventListener('dblclick', function () {
    window.location.href = "login.html"  
})

icon.addEventListener('click', Removeclass)
btn_close.addEventListener('click', Addclass)


function Removeclass() {
    modal.classList.remove('none')
}

function Addclass() {
    modal.classList.add('none')
}

function datos() {
    fetch("../config.json", {
        method: 'POST',
    }).then(function(data) {
        return data.json()  
    }).then(json => {
        var file = ""
        var bienvenida = ""
        for (let index = 0; index < json.length; index++) {
            const element = json[index];
            file  = element.file
            bienvenida = element.TextoBienvenida
        }
        logo.src = file            
        if (bienvenida == '') {
            texto_bienvenida.innerHTML = 'Por favor configure su mensaje de bienvenida'
        } else {
            texto_bienvenida.innerHTML = bienvenida    
        }
    })
    .catch(error => {
        console.error(error);
    });
}
onload = datos

let currentIndex = 0;

prevButton.addEventListener('click', showPreviousItem);
nextButton.addEventListener('click', showNextItem);

//muestra el anterior elemento
function showPreviousItem() {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel()
}

//muestra el siguiente elemento 
function showNextItem() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel()
}

// offsetWidth = propiedad de solo lectura en JavaScript que devuelve el ancho total de un elemento HTML
//reinicia el carrusel
function updateCarousel() {
  const itemWidth = carouselItems[0].offsetWidth;
  carouselContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Actualizar el carrusel inicialmente
updateCarousel()

