const dbclick = document.getElementById('logo-kisko')
const logo  = document.getElementById('logo-gasofac')
const texto_bienvenida  = document.getElementById('texto-bienvenida')
const icon = document.getElementById('info')

dbclick.addEventListener('dblclick', function () {
    window.location.href = "login.html"  
})

icon.addEventListener('click', info)

function info() {
    // console.log("diste click al info")
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
            bienvenida = element.TextoBienvenida+''+element.Estacion
        }
        texto_bienvenida.innerHTML = bienvenida
        logo.src = file

    });
}
onload = datos