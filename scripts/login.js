"use strict";

window.onload = () => {


    submit.addEventListener('click', (e) => {
        e.preventDefault();


        let forms = document.querySelectorAll('form');
        for (let i = 0; i < forms.length; i++) {
            forms[i].setAttribute('novalidate', true);
        }


        this.$("#form").submit((e) => {
            e.preventDefault();
        });


        this.$.ajax({
            type: "POST",
            url: "scripts/login.php",
            data: {
                'email': $('#email').val(),
                'password': $('#pwd').val(),
            },
            success: (data) => {
                console.log(data);
                if (data == 'Success') {
                    window.location.href = "index.php";
                } else {
                    alert('Login Failed');
                }
            },
            dataType: "html"

        });


    });

};