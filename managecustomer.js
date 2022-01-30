//© 2021 Sean Murdock

let customerName = "";
let phone = "";
let bday = "";
let form = "";
let elements = "";

function setcustomername(){
    customerName = $("#cn").val();
}

function setemail(){
    email = $("#email").val();
}

function setphone(){
    phone = $("#phone").val().replace(/\D+/g, "");
}

function setbday(){
    bday = $("#bday").val();
}


function readonlyforms(formid){
    form = document.getElementById(formid);
    elements = form.elements;
    for (i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
    }
    createbutton();
}
 function pwsDisableInput( element, condition ) {
        if ( condition == true ) {
            element.disabled = true;

        } else {
            element.removeAttribute("disabled");
        }

 }

function createbutton(){
    var button = document.createElement("input");
    button.type = "button";
    button.value = "OK";
    button.onclick = window.location.href = "/index.html";
    context.appendChild(button);
}

function findcustomer(email){
    var headers = { "suresteps.session.token": localStorage.getItem("token")};
    $.ajax({
        type: 'GET',
        url: `/customer/${email}`,
        contentType: 'application/text',
        dataType: 'text',
        headers: headers,
        success: function(data) {
            localStorage.setItem("customer",data);
            window.location.href="/timer.html";
        }
    });
}

function createcustomer(){
    //in case they hit the back/forward buttons and our in memory variables got reset
    setusername();
    setuserpassword();
    setverifypassword();
    setcustomername();
    setemail();
    setphone();
    setbday();

    var customer = {
        customerName : customerName,
        email : email,
        phone : phone,
        birthDay: bday
    }


    $.ajax({
        type: 'POST',
        url: '/customer',
        data: JSON.stringify(customer),
        contentType: 'application/text',
        dataType: 'text',
        success: function(data) {
            localStorage.setItem("customer",JSON.stringify(customer));
            window.location.href=data
        }
    });

    $.ajax({
        type: 'POST',
        url: '/user',
        data: JSON.stringify({'userName':email, email, password, phone, "birthDate":bday, 'verifyPassword':verifypassword}),//we are using the email as the user name
        success: function(data) { alert(data);
        window.location.href = "/index.html"},
        contentType: "application/text",
        dataType: 'text'
    });
}

