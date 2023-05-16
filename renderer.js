const btn = document.getElementById('btn')
const content = document.getElementById('content')
btn.addEventListener('click', function () {
    if (content.className == 'd-none') {
        content.classList.remove('d-none')          
    } else {
        content.classList.add('d-none')          
    }
})

document.getElementById('darkmode').addEventListener('click', async () => {
    const isDark = await window.darkMode.toggle()
    document.getElementById('source').innerHTML = isDark ? 'dark' : 'light'
})

/* document.getElementById('boton').addEventListener('click', async () => {
    const datos = await window.data.respuesta()
    console.log(datos);
}) */

document.getElementById('boton').addEventListener('click', function () {    
    datos_json();
    console.log("click basico");

})

const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const func = async () => {
    const response = await window.versions.ping()
    console.log(response); // prints out 'pong'
}
func()

const holis = async () => {
    const response = await window.data.hello()
    console.log(response); // prints out 'pong'
}
holis()

function datos_json (){
const data = {
    method: 'GET'
};
fetch('https://gasofac.mx/ria/cte.php?query=XAXX010101000&f_name=rcpClienteExacto&app=autofactura_web', data)
    .then(response => response.json())
    .then(datos => {
        console.log("fetch");
        console.log(datos);
    })
}





