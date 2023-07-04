let a_tickets_all = new Array()
let a_ticket_clean = new Array();
let a_total = new Array();
//data input
let rfc = document.getElementById('RFC')
let razon_social = document.getElementById('RazonSocial')
let codigo_postal = document.getElementById('CodigoPostal')
let regimen_fiscal = document.getElementById('CdCfdiRegimen')
let uso_cfdi = document.getElementById('CdUsoCfdi')
let email = document.getElementById('Email')
let forma_pago_fija = document.getElementById('CfdiFormaPago')
let observaciones = document.getElementById('Observaciones')
//otros
let referencia = document.getElementById('referencia')
let lista_tickets_all = document.getElementById("lista_tickets_all")
let lista_rfc = document.getElementById('lista-rfc')
let container_rfc = document.getElementById('container-rfc')
let val_rfc = document.getElementById('RFC')
let cif_val = document.getElementById('cif_val')
let val_referencia = document.getElementById("referencia")
let body = document.getElementById('body')
let comprobantes = document.getElementById("comprobantes")
let total = document.getElementById('total')
let referencia_index = document.getElementById('referencia_index')
let val_referencia_index = document.getElementById('referencia_index')
let btn  = document.getElementById('btn')
let a_referencia = document.getElementById('a_referencia_clean')
let billing_form = document.getElementById('billing_form')
let generar_factura = document.getElementById('generar_factura')
const imprimir = document.getElementById('imprimir')
const alert_index = document.getElementById('alert_index')
const alert_info = document.getElementById('alert_info')
const alert_warning = document.getElementById('alert_warning')
const user = document.getElementById('User')
const IdEstacion = document.getElementById('IdEstacion')
const pass = document.getElementById('pass')
const loading_modal = document.getElementById('loading_modal')


//get data from file config.json
function datos() {
    fetch("../config.json", {
        method: 'POST',
    }).then(function(data) {
        return data.json()  
    }).then(json => {
        var usuario = ""
        var sucursal = ""
        var password = ""
        for (let index = 0; index < json.length; index++) {
            const element = json[index];
            usuario = element.Usuario
            sucursal  = element.id_estacion
            password = element.pass
        }
        user.value = usuario
        IdEstacion.value = sucursal
        pass.value = password
    })
    .catch(error => {
        // console.error(error);
    });
}

if (user) {
    datos();
}

//get referencia of index.html
document.addEventListener('DOMContentLoaded', function() {
    
    var queryParameters = new URLSearchParams(window.location.search);
    var array_all = queryParameters.get('a_tickets_all');
    var array_total = queryParameters.get('a_total');
    var array_clean = queryParameters.get('a_ticket_clean')

    var array1 = JSON.parse(array_all);
    var array2 = JSON.parse(array_total);
    var array3 = JSON.parse(array_clean)
    
    if (array1 && array2 && array3) {
        var valor_ticket_all = array1[0].toString()          
        var valor_total = array2[0].toString()
        var valor_clean = array3[0].toString()   

        a_tickets_all.push(valor_ticket_all)
        a_total.push(valor_total)
        a_ticket_clean.push(valor_clean) 

        show_tickets()
        show_total()
        show_tickets_clean()
    }
});
//get referencia of timbrado.html
let print_url;
document.addEventListener('DOMContentLoaded', function () {
    var queryParameters = new URLSearchParams(window.location.search);
    var printurl = queryParameters.get('PrintUrl')
    print_url = JSON.parse(printurl)
})
//get referencia del INDEX
if (referencia_index) {
    referencia_index.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            re = /-/g;
        referencia_clean = val_referencia_index.value.replace(re,'')

        if (a_ticket_clean.includes(referencia_clean)) {
            referencia_index.value = "";
        } else {
            a_ticket_clean.push(referencia_clean)
        }  
            val_datacheck()    
           referencia_index.value = "";  
        }        
    })    
}
//get referencia MAIN
if (referencia) {
    referencia.addEventListener('keypress', function (event) {
        if(event.key === "Enter"){
            re = /-/g;
            referencia_clean = val_referencia.value.replace(re,'')
            if (a_ticket_clean.includes(referencia_clean)) {
                referencia.value = "";
            } else {
                a_ticket_clean.push(referencia_clean)
                show_tickets_clean()
            }  
            datacheck()    
            referencia.value = "";      
        }
    })
}
//get RFC
if (rfc) {    
    rfc.addEventListener('keypress', function (event) {
        if(event.key === "Enter"){
            rfc = val_rfc.value.substring(0, 23)
            if (window.btoa(val_rfc.value.substring(0, 23).toUpperCase()) == 'SFRUUFM6Ly9TSUFULlNBVC5HT0IuTVg=') {
                datarfcCIF()
                get_regimen_fiscal()
                get_uso_cfdi()
                loading_modal.classList.add('d-flex')
            } else {
                if (rfc.length >= 7) {
                    datarfc()
                    get_uso_cfdi()
                    get_regimen_fiscal()
                    container_rfc.classList.remove("none");
                    cif_val.value = ''
                    //agrega la clase al body para cuando le des clik se oculte los resultados del rfc 
                    body.classList.add("body-content")
                } else {
                    container_rfc.classList.add("none")
                    alert_info.innerHTML = 'Debe ingresar al menos 7 caracteres'
                    alert_info.classList.remove('none')
                    setTimeout( function () {
                        alert_info.classList.add('none')                
                    }, 3000)
                }
            }
        }
    })
}

// crear un evento que al darle click oculte la lista-rfc al darle click al body
if (body) {
    body.addEventListener('click', remove_class)
}
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
//GENERAR FACTURA
if (generar_factura) {
    generar_factura.addEventListener('click', function () {
        /* mostrar modal */
        loading_modal.classList.add('d-flex')
        const formdata = new FormData(billing_form);
        fetch('https://gasofac.mx/ria/solicitar-factura.php', {
            method: 'POST',
            body: formdata
        })
        .then(response => response.json())
        .then(data => {
            respuesta = data.result;
            msg = data.msg;
            loading_modal.classList.remove('d-flex')
            if (respuesta == 1) {
                window.location.href = "timbrado.html"
                var printurl = JSON.stringify(data.PrintUrl);
                var arrayQueryString = '?PrintUrl=' + encodeURIComponent(printurl);
                window.location.href = 'timbrado.html' + arrayQueryString;  
            } else {
                alert_warning.innerHTML = msg
                alert_warning.classList.remove('none')
                setTimeout( function () {
                    alert_warning.classList.add('none')                
                }, 5000)
            }
        })
        .catch(error => {
            console.error(error);
        });
    })
}
if (imprimir) {
    imprimir.addEventListener('click', printer)
}
//FUNCIONES
//muestra en el input de tipo hidden las referencias
function  show_tickets_clean() {
    let a_data_clean = a_ticket_clean.join(',')
    a_referencia.value = a_data_clean
}
//valida la referencia ingresada en el INDEX
function val_datacheck() {
    let referencia = document.getElementById('referencia_index').value

    var ticket = {
        f_name: 'ticketValidate',
        ticket: referencia,
        tickets_all: a_ticket_clean.join(','),
        apc: 'AUT'
    }

    fetch("https://gasofac.mx/ria/data_check.php", {
        method: 'POST',
        body: JSON.stringify(ticket),
    }).then(function(data) {
        return data.json()  
    }).then(myjson => {
        let ret = myjson.ret;
        if (ret == 1) {
            let total = myjson.Total
            let dato = '<div class="col-7 mt-2">'+myjson.Ticket_ori+'</div><div class="col-3 mt-2">'+myjson.Total+'</div>'
            a_tickets_all.push(dato)
            a_total.push(total)
            //convierte el array en string
            var array_all = JSON.stringify(a_tickets_all);
            var array_total = JSON.stringify(a_total);
            var array_clean = JSON.stringify(a_ticket_clean)
            // Concatenar las cadenas en una única cadena de consulta
            var arrayQueryString = '?a_tickets_all=' + encodeURIComponent(array_all) + '&a_total=' + encodeURIComponent(array_total) + '&a_ticket_clean=' + encodeURIComponent(array_clean);
            window.location.href = 'main.html' + arrayQueryString;            
        } else {
            alert_index.innerHTML = 'La referencia no es valida'
            alert_index.classList.remove('none')
            setTimeout( function () {
                alert_index.classList.add('none')
            }, 3000) 
        }
    })
    .catch(error => {
        console.error(error);
    });
}
//get datos de la referencia
function datacheck() {
    let referencia = document.getElementById('referencia').value

    var ticket = {
        f_name: 'ticketValidate',
        ticket: referencia,
        tickets_all: a_ticket_clean.join(','),
        apc: 'AUT'
    }

    fetch("https://gasofac.mx/ria/data_check.php", {
        method: 'POST',
        body: JSON.stringify(ticket),
    }).then(function(data) {
        return data.json()  
    }).then(myjson => {
        let ret = myjson.ret;
        if (ret == 1) {
            a_tickets_all.push('<div class="col-7 mt-2">'+myjson.Ticket_ori+'</div><div class="col-3 mt-2">'+myjson.Total+'</div>')
            a_total.push(myjson.Total)
            show_tickets()  
            show_total()      
        } else {
            alert_info.innerHTML = 'La referencia no es valida'
            alert_info.classList.remove('none')
            setTimeout( function () {
                alert_info.classList.add('none')                
            }, 3000)
        }
    })
    .catch(error => {
        console.error(error);
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

    fetch("https://gasofac.mx/ria/cte.php", {
        method: 'POST',
        body: JSON.stringify(ticket),
    }).then(function(data) {
        return data.json()  
    }).then(json => {
        lista = "";
        for (let index = 0; index < json.length; index++) {
            const element = '<li class="list-group-item"><a href="#" class="click-rfc nav-link" data-id="'+json[index].Nombre+','+json[index].Email+','+json[index].FormaPagoFija+','+json[index].CdUsoCfdiFijo+','+json[index].CodigoPostal+','+json[index].CdCfdiRegimen+','+json[index].CodFiscal+'">'+json[index].NombreDisplay+'</a></li>'
            lista += element 
        }
        lista_rfc.innerHTML = lista        
    })
    .catch(error => {
        console.error(error);
    });
}
//get data RFC wiht a url
function datarfcCIF() {
    let  RFC = document.getElementById('RFC').value
    var ticket = {
        f_name: 'getDataFromCif',
        string: RFC,
        D2: '1',
        D3: '21080252780_RBL210812JM6',
        app: 'autofactura_web'
    }
    fetch("https://gasofac.mx/ria/get_data_from_cif.php", {
        method: 'POST',
        body: JSON.stringify(ticket),
    }).then(function(data) {
        return data.json()  
    }).then(json => {
        loading_modal.classList.remove('d-flex')
        val_rfc.value = json.rfc
        razon_social.value = json.nombre
        regimen_fiscal.value = json.cd_regimen
        email.value = json.email
        codigo_postal.value = json.codigo_postal
        cif_val.value = json.cif
        uso_cfdi.value = ''
        forma_pago_fija.value = ''
    })
    .catch(error => {
        console.error(error);
    });
}
//get uso de cfdi
function get_uso_cfdi() {
    let  RFC = document.getElementById('RFC').value
    var ticket = {
        f_name: 'getUsosCfdi',
        rfc: RFC,
        version_cfdi: '4.0'
    }

    fetch("https://gasofac.mx/ria/get_usos_cfdi.php", {
        method: 'POST',
        body: JSON.stringify(ticket),
    }).then(function(data) {
        return data.json()  
    }).then(json => {
        cfdi = "";
        for (let index = 0; index < json.length; index++) {
            const element = '<option value="'+json[index].CdUsoCfdi+'">'+json[index].Descripcion+'</option>'
            cfdi += element 
        }
        uso_cfdi.innerHTML = cfdi       
    })
    .catch(error => {
        console.error(error);
    });
}
//get regimen fiscal
function  get_regimen_fiscal() {
    let  RFC = document.getElementById('RFC').value
    var ticket = {
        f_name: 'getRegimenFiscal',
        rfc: RFC,
        version_cfdi: '4.0'
    }

    fetch("https://gasofac.mx/ria/get_regimen_fiscal.php", {
        method: 'POST',
        body: JSON.stringify(ticket),
    }).then(function(data) {
        return data.json()  
    }).then(json => {
        lista = "";
        for (let index = 0; index < json.length; index++) {
            const element = '<option value="'+json[index].CdRegimenFiscal+'">'+json[index].Descripcion+'</option>'
            lista += element 
        }
        regimen_fiscal.innerHTML = lista        
    })
    .catch(error => {
        console.error(error);
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
    let num_comprobantes = a_tickets_all.length
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
// elimina los datos del array a_tickets_all
function delete_all(valor) {
    a_tickets_all.splice(valor,1)
    show_tickets()
}
//elimina los datos del array a_ticket_clean
function delete_clean(valor) {
    a_ticket_clean.splice(valor, 1)
    show_tickets_clean()
}
//delete valor
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
//obtiene los valores correpondientes al rfc y los muestra en los inputs
function  getdataidrfc(valor) {
    datos = valor.split(',')

    const RazonSocial = datos[0].trim(); //Nombre
    const Email = datos[1].trim(); //email
    const FormaPagoFija = datos[2].trim(); //FormaPagoFija
    const CdUsoCfdiFijo = datos[3].trim(); // CdUsoCfdiFijo
    const CodigoPostal = datos[4].trim(); // CodigoPostal
    const CdCfdiRegimen = datos[5].trim(); //CdCfdiRegimen
    const rfc_val = datos[6].trim(); //RFC

    val_rfc.value = rfc_val
    razon_social.value = RazonSocial
    codigo_postal.value = CodigoPostal
    regimen_fiscal.value = CdCfdiRegimen
    uso_cfdi.value = CdUsoCfdiFijo
    email.value = Email
    forma_pago_fija.value = FormaPagoFija
}
//funcion para imprimir  asyncrona
async function printer(){
    const print = await window.dataprint.print(print_url)
}