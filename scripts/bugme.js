$(document).ready(function() {
    getIssues();
    $('#all').click(function() {
        getIssues();

    });
    $('#open').click(function() {
        getIssues(null, "Open");

    });
    $('#mytickets').click(function() {
        getIssues(null, 'all', "true");

    });


    $('#newissue').click(function() {
        $('.panel').hide();
        $('#createIssue').show();
    });

    $('#adduser').click(function() {
        $('.panel').hide();
        $('#createUser').show();
    });

    $('#home').click(function() {
        getIssues();
    });

    $('#logout').click(function() {
        window.location.href = "./scripts/logout.php";
        $('.panel').hide();

    });

    $('#adduserbtn').click(function() {
        $.ajax({
            type: "POST",
            url: "scripts/adduser.php",
            data: {
                firstname: $('#fname').val(),
                lastname: $('#lname').val(),
                password: $('#pwd').val(),
                email: $('#email').val(),
            },
            success: (data) => {
                if (data == 'Success') {
                    alert('New User added');
                    document.getElementById("addUserForm").reset();
                    getIssues();
                } else {
                    alert('New User failed');
                }

            },
            dataType: "html"
        });
    });

    $('#newissuebtn').click(function() {

        $.ajax({
            type: "POST",
            url: "scripts/newissue.php",
            data: {
                title: $('#title').val(),
                desc: $('#description').val(),
                type: $('#issuetype').val(),
                priority: $('#priority').val(),
                assignedto: $('#assigned').val(),
            },
            success: (data) => {
                if (data == 'Success') {
                    alert('New Issues added');
                    document.getElementById("createIssueForm").reset();
                    getIssues();
                } else {
                    console.log(data)
                    alert('New User failed');
                }

            },
            dataType: "html"
        });

    });




});

function getIssues(id = null, fil = 'all', mine = 'false') {
    let all = 'true';

    if (id) {
        all = 'false';
    }

    $.ajax({
        type: "GET",
        url: "scripts/getIssues.php",
        data: {
            all,
            id,
            fil,
            mine
        },
        success: (data) => {
            if (id) {
                $('#issuepage').html(data);
                $('.panel').hide();
                $('#issuepage').show();


            } else {

                $('#allissues').html(data);
                $('.panel').hide();
                $('#issuses').show();
            }
        },
        dataType: "html"

    })
}

function changeStatus(id, status) {

    $.ajax({
        type: "POST",
        url: "scripts/alterIssues.php",
        data: {
            status,
            id
        },
        success: (data) => {
            if (data == 'Success') {
                alert('Updated successfully');
                getIssues();
            } else {
                console.log(data)
                alert('Update failed');
            }
        },
        dataType: "html"

    })
}