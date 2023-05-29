let a_tickets_all = new Array()
let a_ticket_clean = new Array();
let a_total = new Array();
//data input
let rfc = document.getElementById('RFC')
let razon_social = document.getElementById('RazonSocial')
let codigo_postal = document.getElementById('CodigoPostal')
let regimen_fiscal = document.getElementById('CdCfdiRegimen')
let uso_cfdi = document.getElementById('CdUsoCfdiFijo')
let email = document.getElementById('Email')
let forma_pago_fija = document.getElementById('FormaPagoFija')
let observaciones = document.getElementById('Observaciones')
//otros
let referencia = document.getElementById('referencia')
let lista_tickets_all = document.getElementById("lista_tickets_all")
let lista_rfc = document.getElementById('lista-rfc')
let container_rfc = document.getElementById('container-rfc')
let val_rfc = document.getElementById('RFC')
let val_referencia = document.getElementById("referencia")
let body = document.getElementById('body')
let comprobantes = document.getElementById("comprobantes")
let total = document.getElementById('total')

//get referencia
referencia.addEventListener('keypress', function (event) {
    if(event.key === "Enter"){
        re = /-/g;
        referencia_clean = val_referencia.value.replace(re,'')

        if (a_ticket_clean.includes(referencia_clean)) {
            alert("La referencia "+referencia_clean+" ya esta ingresada")
            referencia.value = "";
        } else {
            a_ticket_clean.push(referencia_clean)
        }  
        datacheck()     
        referencia.value = "";      
    }
})

rfc.addEventListener('keypress', function (event) {
    if(event.key === "Enter"){
        rfc = val_rfc.value
        if (rfc.length >= 7) {
            datarfc()
            container_rfc.classList.remove("none");
            body.classList.add("body-content")
        } else {
            // oculatar la lista ?
            console.log("no son 7 caracteres :(")
        }
    }
})

// crear un evento que al darle click oculte la lista-rfc al darle click al body
body.addEventListener('click', remove_class)

// delete referencia
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete_ticket')) {
        valor = event.target.getAttribute('data-id')
        delete_all(valor)
        delete_clean(valor)
        delete_total(valor)
    }
});

//get data-id del rfc
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('click-rfc')) {
        valor = event.target.getAttribute('data-id')
        getdataidrfc(valor) 
    }
});

//FUNCIONES

//get datos de la referencia
function datacheck() {
    let referencia = document.getElementById('referencia').value

    var ticket = {
        f_name: 'ticketValidate',
        ticket: referencia,
        tickets_all: a_ticket_clean.join(','),
        apc: 'AUT'
    }

    fetch("https://gasofac.mx/ria/data_check_debug.php", {
        method: 'POST',
        body: JSON.stringify(ticket),
    }).then(function(data) {
        return data.json()  
    }).then(myjson => {
        let ret = myjson.ret;
        if (ret == 1) {
            data_id =  myjson.Ticket_ori
            a_tickets_all.push('<div class="col-7 mt-2">'+myjson.Ticket_ori+'</div><div class="col-3 mt-2">'+myjson.Total+'</div>')
            a_total.push(myjson.Total)
            show_tickets()  
            show_total()      
        } else {
            console.log("Ups algo salio mal")
        }
        
    });
}

//get datos del rfc
function datarfc() {
    let  RFC = document.getElementById('RFC').value
    var ticket = {
        f_name: 'rcpClienteExacto',
        query: RFC,
        app: 'autofac',
        query_type: 'select2'
    }

    fetch("https://gasofac.mx/ria/cte_debug.php", {
        method: 'POST',
        body: JSON.stringify(ticket),
    }).then(function(data) {
        return data.json()  
    }).then(json => {
        console.log(json);  
        // console.log("valor nombre "+json[0].Nombre)
        lista = "";
        for (let index = 0; index < json.length; index++) {
            const element = '<li class="list-group-item"><a href="#" class="click-rfc" data-id="'+json[index].Nombre+','+json[index].Email+','+json[index].FormaPagoFija+','+json[index].CdUsoCfdiFijo+','+json[index].CodigoPostal+','+json[index].CdCfdiRegimen+'">'+json[index].NombreDisplay+'</a></li>'
            lista += element 
        }
        lista_rfc.innerHTML = lista        
    });
}

//muestra los tikects
function show_tickets() {
    let datos_lista = ""; 
    for (let i = 0; i < a_tickets_all.length; i++) {
        const element = a_tickets_all[i]
        const btn = '<div class="col-2 mt-2"><button type="button" class="btn btn-danger delete_ticket" id="elemento" data-id="'+i+'">X</button></div>'
        datos_lista += element+btn 
    }
    lista_tickets_all.innerHTML  = datos_lista
    var num_comprobantes = a_tickets_all.length
    comprobantes.innerHTML = num_comprobantes;
}
//muestra el total  de los tickets
function show_total() {
    let suma = 0
    for (let i = 0; i < a_total.length; i++) {
        const element = a_total[i]
        suma += parseFloat(element)
    }
    total.innerHTML =  suma.toFixed(2)
}

//elimina los datos del array a_tickets_all
function delete_all(valor) {
    a_tickets_all.splice(valor,1)
    show_tickets()
}

//elimina los datos del array a_ticket_clean
function delete_clean(valor) {
    a_ticket_clean.splice(valor, 1)
}

function delete_total(valor) {
    a_total.splice(valor, 1)
    show_total()
}

//oculta la lista del rfc al darle click al body
function remove_class() {
    let body_click = document.getElementsByTagName('body')[0]
    body_click.classList.toggle("body-content")
    container_rfc.classList.add("none")
}

function  getdataidrfc(valor) {
    datos = valor.split(',')
    const RazonSocial = datos[0].trim(); //Nombre
    const Email = datos[1].trim(); //email
    const FormaPagoFija = datos[2].trim(); //FormaPagoFija
    const CdUsoCfdiFijo = datos[3].trim(); // CdUsoCfdiFijo
    const CodigoPostal = datos[4].trim(); // CodigoPostal
    const CdCfdiRegimen = datos[5].trim(); //CdCfdiRegimen

    razon_social.value = RazonSocial
    codigo_postal.value = CodigoPostal
    regimen_fiscal.value = CdCfdiRegimen
    uso_cfdi.value = CdUsoCfdiFijo
    email.value = Email
    forma_pago_fija.value = FormaPagoFija
}

/* for (let i = 0; i < a_ticket_all.length; i++) {
        const element = a_ticket_all[i];
        console.log("datos  "+element);
        console.log("referencia del input "+referencia.value);
    } */
// JSON.stringify({'f_name':'ticketValidate','ticket':referencia,'tickets_all':'00052007700000E4', 'apc':'AUT'})