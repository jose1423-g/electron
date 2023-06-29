const form_admin = document.getElementById('form_admin')
const btn_save = document.getElementById('btn_save');
const btn_login = document.getElementById('btn_login')
const btn_conect = document.getElementById('btn_conect')
// const input_path = document.getElementById('file');


const fileInput = document.getElementById('file_logo');
const img_file = document.getElementById('img_file');
const file_input = document.getElementById('file_input')

const video_file = document.getElementById('video_file');
const fileInputVideo = document.getElementById('file_video');
const video_path = document.getElementById('video_path')

const texto = document.getElementById('TextoBienvenida')
const usuario = document.getElementById('Usuario')
const pass = document.getElementById('pass')
const estacion = document.getElementById('Estacion')
const alert_warning = document.getElementById('alert_warning')
const alert_danger = document.getElementById('alert_danger')
const login_form = document.getElementById('login_form')
const id_estacion = document.getElementById('id_estacion')
const cerrar = document.getElementById('cerrar')



if (btn_login) {
    btn_login.addEventListener('click', login)
}

if (btn_save) {
    btn_save.addEventListener('click', registro)
}

if (login_form) {
    login_form.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
    })
}

if (btn_conect) {
    btn_conect.addEventListener('click', connect)   
}

if (cerrar) {
    cerrar.addEventListener('click', async () => {
        const salir = await window.closeapp.close()
        console.log('aqui', salir)
    })
}

function show_data() {
    fetch("../config.json", {
        method: 'POST',
    }).then(function(data) {
        return data.json()  
    }).then(json => {
        var texto_bienvenida = ""
        var logo = ""
        var user = ""
        var password = ""
        var station = ""
        var IdEstacion = ""
        var video = ""
        for (let index = 0; index < json.length; index++) {
            const element = json[index];
            texto_bienvenida = element.TextoBienvenida
            logo = element.file 
            video = element.file_video
            user = element.Usuario 
            password = element.pass
            station = element.Estacion 
            IdEstacion = element.id_estacion
        }
        if (texto) {
            texto.value = texto_bienvenida            
        }
        if (file_input) {
            file_input.value = logo    
        }
        if (img_file) {
            img_file.src = logo   
        }
        if (video_file) {
            video_file.src = video
        }
        if (video_path) {
            video_path.value = video
        }
        if (usuario) {
            usuario.value = user
        }
        if (pass) {
            pass.value = password
        }
        if (estacion) {
            estacion.value = station
        }
        if (id_estacion) {
            id_estacion.value = IdEstacion
        }
    })
    .catch(error => {
        console.error(error);
    });
}

onload = show_data

async function registro() {    
    //file_img
    const path = (fileInput.files.length != 0) ? fileInput.files[0].path : '';
    const path1  = file_input.value
    fileInput.disabled = true
    //file_video
    const path_video = (fileInputVideo.files.length != 0) ? fileInputVideo.files[0].path : '';
    const path_video1  = video_path.value
    fileInputVideo.disabled = true

    const dataform = new FormData(form_admin)

    if (path == '' && path_video == '') {
        dataform.append('file', path1)
        dataform.append('file_video', path_video1)
        const formDataObject = Object.fromEntries(dataform.entries());
        const login = await window.saveform.register(formDataObject)
        fileInput.disabled = false  
        img_file.src = path1;

        //VIDEO
        fileInputVideo.disabled = false
        video_file.src = path_video1
        
    } else {
        dataform.append('file', path)
        dataform.append('file_video', path_video)
        const formDataObject = Object.fromEntries(dataform.entries());
        const login = await window.saveform.register(formDataObject)
        fileInput.disabled = false   
        img_file.src = path;

        //VIDEO
        fileInputVideo.disabled = false
        video_file.src = path_video;
    }
}

function login() {
    let  password = document.getElementById('password').value
    var info = {
       f_name:'checkPassword',
       password: password
    }
    fetch("https://gasofac.mx/ria/data_kiosko_config.php", {
        method: 'POST',
        body: JSON.stringify(info),
    }).then(function(data) {
        return data.json()  
    }).then(json => {
        var result = json.result
        var msg = json.msg
        if (result == 1) {
            window.location.href = "admin.html"
        } else {
            alert_warning.innerHTML = msg
            alert_warning.classList.remove('none')
            setTimeout( function () {
                alert_warning.classList.add('none')                
            }, 3000)
        }
    });
}

function connect() {
    let  usuario   = document.getElementById('Usuario').value
    let  passwd = document.getElementById('pass').value

    let info = {
        UserName: usuario,
        Passwd: passwd, 
        f_name: 'checkConfig'   
    }
    fetch("https://gasofac.mx/ria/data_kiosko_config.php", {
        method: 'POST',
        body: JSON.stringify(info),
    }).then(function(data) {
        return data.json()  
    }).then(json => {
        let result = json.result;
        let msg = json.msg
        let nom_estacion = json.NombreCompletoEstacion
        let IdEstacion = json.IdEstacion
        if (result == 1) {
            id_estacion.value = IdEstacion
            estacion.value = nom_estacion
        } else {
            alert_danger.innerHTML = msg
            alert_danger.classList.remove('none')
            setTimeout( function () {
                alert_danger.classList.add('none')                
            }, 3000)
        }
    });
}
