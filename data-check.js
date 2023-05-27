let a_tickets_all = new Array()
let a_ticket_clean = new Array();
let referencia = document.getElementById('referencia')
let lista_tickets_all = document.getElementById("lista_tickets_all")
let rfc = document.getElementById('RFC')
let lista_rfc = document.getElementById('lista-rfc')
let val_rfc = document.getElementById('RFC')
let val_referencia = document.getElementById("referencia")


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
        for (let i = 0; i < a_ticket_clean.length; i++) {    
            const element = a_ticket_clean[i]
            // console.log('recorriendo el array '+ element)          
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
        } else {
            console.log("no son 7 caracteres :(")
        }
    }
    })

// delete element
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete_ticket')) {
        valor = event.target.getAttribute('data-id')
        delete_all(valor)
        delete_clean(valor)
    }
  });

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
        // console.log("ticket_ori  "+myjson.Ticket_ori);
        // console.log(myjson);
        let ret = myjson.ret;
        if (ret == 1) {
            data_id =  myjson.Ticket_ori
            // const btn = '<button type="button" class="btn btn-danger delete_ticket" id="elemento" data-id="'+data_id+'">X</button>'
            // <td>'+btn+'</td></tr>'
            a_tickets_all.push('<tr id="fila'+myjson.Ticket_ori+'"><td>'+myjson.Ticket_ori+'</td><td>'+myjson.Total+'</td>');    
            show_tickets();        
        } else {
            console.log("Ups algo salio mal")
        }
        
    });
}

function datarfc() {
    let  RFC = document.getElementById('RFC').value
    console.log(RFC)
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
    }).then(data => {
        console.log(data);
        console.log(data.CdCfdiRegimen);
        
        lista_rfc.innerHTML = '<li>'+data.NombreDisplay+'</li>'        
    });
}

function  show_tickets() {
    let datos_lista = ""; 
    for (let i = 0; i < a_tickets_all.length; i++) {
        const element = a_tickets_all[i]
        const btn = '<td><button type="button" class="btn btn-danger delete_ticket" id="elemento" data-id="'+i+'">X</button></td>'
        datos_lista += element+btn 
    }
    lista_tickets_all.innerHTML  = datos_lista
}

function delete_all(valor) {
    a_tickets_all.splice(valor,1)
    show_tickets()
  }

function delete_clean(valor) {
    re = /-/g;
    valor_clean = valor.replace(re,'')
    var index = a_ticket_clean.indexOf(valor);
    if (index == -1) {
        a_ticket_clean.splice(index);
    }
}

/* for (let i = 0; i < a_ticket_all.length; i++) {
        const element = a_ticket_all[i];
        console.log("datos  "+element);
        console.log("referencia del input "+referencia.value);
    } */
// JSON.stringify({'f_name':'ticketValidate','ticket':referencia,'tickets_all':'00052007700000E4', 'apc':'AUT'})