import React from 'react'
var loginButton = document.getElementById("btn_login")


loginButton.onclick = function() {
    var username = document.getElementById("username_field").value;
    var password = document.getElementById("password_field").value;
    var isTeacher = document.getElementById("checkboxTeacher").value;
    let user = {
        userName: username,
        password: password,
        isTeacher: isTeacher
    }

    server.post    
}