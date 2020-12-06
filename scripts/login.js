"use strict";

window.onload = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("pwd");
    let submit = document.getElementById('submit');


    let forms = document.querySelectorAll('form');
    for (let i = 0; i < forms.length; i++) {
        forms[i].setAttribute('novalidate', true);
    }


    this.$("#form").submit((e) => {
        e.preventDefault();
    });


    submit.addEventListener('click', (e) => {
        e.preventDefault();

        this.$.ajax({
            type: "POST",
            url: "scripts/bugMe.php",
            data: {
                'email': email.value,
                'password': password.value,
                "submit": submit.value
            },
            success: () => {
                
                    window.location.href = "dashboard.html";
            },
            dataType: "html"

        });


    });

};