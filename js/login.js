const form_admin = document.getElementById('form_admin')
const registerForm = document.getElementById('btn_save');
const btn_enviar = document.getElementById('btn-enviar')
const fileInput = document.getElementById('file_logo');
const input_path = document.getElementById('file');
const img = document.getElementById('img');


if (btn_enviar) {
    btn_enviar.addEventListener('click', admin)
}

if (registerForm) {
    registerForm.addEventListener('click', registro)
}

async function registro() {    
    const path = (fileInput.files.length != 0) ? fileInput.files[0].path : '';
    fileInput.disabled = true
    const dataform = new FormData(form_admin)
    dataform.append('file', path)
    const formDataObject = Object.fromEntries(dataform.entries());
    const login = await window.saveform.register(formDataObject)
    fileInput.disabled = false   
    img.src = path;
}



function admin() {
    window.location.href = "admin.html"
}

// async function printer(){
//     const url = "https://gasofac.mx/reportes/factura_electronica_t.php?IdFactura=2772915&is_show=1";
//     const print = await window.files.print(url)
//     console.log("hey :)"+print)
// }

/* 
    Example:
    document.getElementById('darkmode').addEventListener('click', async () => {
    const isDark = await window.darkMode.toggle()
    document.getElementById('source').innerHTML = isDark ? 'dark' : 'light'
}) */