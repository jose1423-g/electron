const form = document.getElementById('btn-enviar')
const imprimir = document.getElementById('imprimir')



form.addEventListener('click', password)
imprimir.addEventListener('click', printer)

async function printer(){
    const url = "https://gasofac.mx/reportes/factura_electronica_t.php?IdFactura=2772915&is_show=1";
    const print = await window.files.print(url)
    console.log("hey :)"+print)
}



/* function  print() {
    console.log("holis si jalo");
    fetch("https://gasofac.mx/reportes/factura_electronica_t.php?IdFactura=2772915&is_show=1&base64=1")
    .then(response => response.json())
    .then(data => {
        const json = JSON.parse(data);
        console.log(json);
    });
    
} */

function password() {
    let pass = document.getElementById('pass').value;
    console.log("La contraseña es "+pass);
    //peticion via ajax
}

/* 
    Example:
    document.getElementById('darkmode').addEventListener('click', async () => {
    const isDark = await window.darkMode.toggle()
    document.getElementById('source').innerHTML = isDark ? 'dark' : 'light'
}) */