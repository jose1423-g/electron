const form = document.getElementById('btn-enviar')
// const imprimir = document.getElementById('imprimir')

if (form) {
    form.addEventListener('click', password)    
}
// imprimir.addEventListener('click', printer)

async function printer(){
    const url = "https://gasofac.mx/reportes/factura_electronica_t.php?IdFactura=2772915&is_show=1";
    const print = await window.files.print(url)
    console.log("hey :)"+print)
}

function password() {
    window.location.href = "admin.html"
    // let pass = document.getElementById('password').value;
    // console.log("La contraseña es "+pass);
}





/* 
    Example:
    document.getElementById('darkmode').addEventListener('click', async () => {
    const isDark = await window.darkMode.toggle()
    document.getElementById('source').innerHTML = isDark ? 'dark' : 'light'
}) */