"use strict";

window.onload = () => {
    let home = document.getElementById("home");
    let issue = document.getElementById("newissue");
    let adduser = document.getElementById("adduser");
    let logout = document.getElementById("logout");
    let cookieName = document.cookie.split("=")[1];

    this.$("#center").load("issues.html", () => {
        let resultstable = document.getElementById("results");
        let allbtn = document.getElementById("all");
        let openbtn = document.getElementById("open");
        let myTicketsbtn = document.getElementById("mytickets");

        $.ajax({
            type: "POST",
            url: "/scripts/bugMe.php",
            data: {
                loadTable: "issueTable"
            },
            success: data => {
                resultstable.innerHTML = data;
                let table = document.getElementById("issueTable");
                let tr = table.getElementsByTagName("tr");
                let td = "";
                let assignedto = "";
                let id = "";
                this.$("#issueTable tbody tr #issue").on("click", function() {
                    id = $(this)
                        .text()
                        .substring(1, 3);

                    $.ajax({
                        type: "POST",
                        url: "/scripts/bugMe.php",
                        data: {
                            "id": id
                        },
                        success: data => {
                            let center = document.getElementById("center");
                            center.innerHTML = data;
                            let markAsClosed = document.getElementById("closedbtn");
                            let markInProgress = document.getElementById("inprogressbtn");

                            markAsClosed.addEventListener("click", () => {
                                let id = $(this)
                                    .text()
                                    .substring(1, 3);

                                $.ajax({
                                    type: "POST",
                                    url: "/scripts/bugMe.php",
                                    data: {
                                        markclosed: "Closed",
                                        "id": id
                                    },
                                    success: data => {
                                        console.log(data);
                                    }
                                });
                            });

                            markInProgress.addEventListener("click", () => {
                                let id = $(this)
                                    .text()
                                    .substring(1, 3);
                                $.ajax({
                                    type: "POST",
                                    url: "/scripts/bugMe.php",
                                    data: {
                                        markinprogress: "In progress",
                                        "id": id
                                    },
                                    success: () => {}
                                });
                            });
                        },
                        dataType: "html"
                    });
                });

                allbtn.addEventListener("click", () => {
                    for (let i = 1; i < tr.length; i++) {
                        td = tr[i].getElementsByTagName("td")[2];
                        if (td) {
                            tr[i].style.removeProperty("display");
                        }
                    }
                });

                openbtn.addEventListener("click", () => {
                    for (let i = 1; i < tr.length; i++) {
                        td = tr[i].getElementsByTagName("td")[2];
                        if (td) {
                            let txtValue = td.innerText;
                            if (txtValue === openbtn.innerText) {
                                tr[i].style.removeProperty("display");
                            } else {
                                tr[i].style.setProperty("display", "none");
                            }
                        }
                    }
                });

                myTicketsbtn.addEventListener("click", () => {
                    for (let i = 1; i < tr.length; i++) {
                        assignedto = tr[i].getElementsByTagName("td")[3];
                        if (assignedto) {
                            let txtValue = assignedto.innerText.split(" ")[0];
                            if (txtValue === cookieName) {
                                tr[i].style.removeProperty("display");
                            } else {
                                tr[i].style.setProperty("display", "none");
                            }
                        }
                    }
                });

                let statusType = document.getElementsByClassName("statusType");
                for (let i = 0; i < statusType.length; i++) {
                    if (statusType[i].innerText === "OPEN") {
                        statusType[i].classList.add("open");
                        statusType[i].classList.remove("inprogress", "closed");
                    } else if (statusType[i].innerText === "IN PROGRESS") {
                        statusType[i].classList.add("inprogress");
                        statusType[i].classList.remove("open", "closed");
                    } else if (statusType[i].innerText === "CLOSED") {
                        statusType[i].classList.add("closed");
                        statusType[i].classList.remove("inprogress", "open");
                    }
                }
            }
        });

        let createNewIssueBtn = document.getElementById("create_new_issue");

        createNewIssueBtn.addEventListener("click", () => {
            this.$("#center").load("new_issue.html ", function() {
                var errorcolor = "#E45449";
                var newissue = document.getElementById("new_issuebtn");
                var title = document.getElementById("title");
                var des = document.getElementById("description");
                var user = document.getElementById("user");
                var errortype = document.getElementById("error_type");
                var priority = document.getElementById("priority");
                var titleexp = /[a-zA-z]+/;
                var desexp = /[a-zA-z0-9]/;
                var userexp = /[a-zA-z]+/;
                var priorityexp = /(Minor|Major|Critical)/;
                var errortypeexp = /(Bug|Proposal|Task)/;
                let userlst = document.getElementById("userlist");

                //ajax request to get assigned users and populate it into the assigned to field
                $.ajax({
                    type: "POST",
                    url: "/scripts/bugMe.php",
                    data: {
                        data: "data"
                    },
                    success: data => {
                        // alert(data);
                        userlst.innerHTML = data;
                    }
                });

                newissue.addEventListener("click", function() {
                    if (
                        titleexp.test(title.value) &&
                        desexp.test(des.value) &&
                        userexp.test(user.value) &&
                        priorityexp.test(priority.value) &&
                        errortypeexp.test(errortype.value)
                    ) {
                        alert("yes");

                        $.ajax({
                            type: "POST",
                            url: "/scripts/bugMe.php",
                            data: {
                                title: title.value,
                                description: des.value,
                                user: user.value,
                                error_type: errortype.value,
                                priority: priority.value,
                                Submitbtn: newissue.value
                            },
                            success: function(data) {
                                alert(data);
                            }
                        });
                    } else {
                        if (titleexp.test(title.value) == false) {
                            title.style.backgroundColor = errorcolor;
                        }
                        if (desexp.test(des.value) == false) {
                            des.style.backgroundColor = errorcolor;
                        }
                        if (userexp.test(user.value) == false) {
                            user.style.backgroundColor = errorcolor;
                        }
                        if (priorityexp.test(priority.value) == false) {
                            priority.style.backgroundColor = errorcolor;
                        }

                        if (errortypeexp.test(errortype.value) == false) {
                            errortype.style.backgroundColor = errorcolor;
                        }


                    } // end of else statement
                }); // end of submit issue function
            }); // end of  add issue event listener
        });
    });

    home.addEventListener("click", () => {
        this.$("#center").load("issues.html", () => {
            let allbtn = document.getElementById("all");
            let openbtn = document.getElementById("open");
            let myTicketsbtn = document.getElementById("mytickets");
            let resultstable = document.getElementById("resultstable");

            $.ajax({
                type: "POST",
                url: "/scripts/bugMe.php",
                data: {
                    loadTable: "issueTable"
                },
                success: data => {
                    resultstable.innerHTML = data;
                    let table = document.getElementById("issueTable");
                    let tr = table.getElementsByTagName("tr");
                    let td = "";
                    let assignedto = "";
                    let id = "";

                    this.$("#issueTable tbody tr #issue").on("click", function() {
                        id = $(this)
                            .text()
                            .substring(1, 3);

                        $.ajax({
                            type: "POST",
                            url: "/scripts/bugMe.php",
                            data: {
                                "id": id
                            },
                            success: data => {
                                let center = document.getElementById("center");
                                center.innerHTML = data;
                                let markAsClosed = document.getElementById("closedbtn");
                                let markInProgress = document.getElementById("inprogressbtn");

                                markAsClosed.addEventListener("click", () => {
                                    let id = $(this)
                                        .text()
                                        .substring(1, 3);

                                    $.ajax({
                                        type: "POST",
                                        url: "/scripts/bugMe.php",
                                        data: {
                                            markclosed: "Closed",
                                            "id": id
                                        },
                                        success: data => {
                                            console.log(data);
                                        }
                                    });
                                });

                                markInProgress.addEventListener("click", () => {
                                    let id = $(this)
                                        .text()
                                        .substring(1, 3);
                                    $.ajax({
                                        type: "POST",
                                        url: "/scripts/bugMe.php",
                                        data: {
                                            markinprogress: "In progress",
                                            "id": id
                                        },
                                        success: () => {}
                                    });
                                });
                            },
                            dataType: "html"
                        });
                    });

                    allbtn.addEventListener("click", () => {
                        for (let i = 1; i < tr.length; i++) {
                            td = tr[i].getElementsByTagName("td")[2];
                            if (td) {
                                tr[i].style.removeProperty("display");
                            }
                        }
                    });

                    openbtn.addEventListener("click", () => {
                        for (let i = 1; i < tr.length; i++) {
                            td = tr[i].getElementsByTagName("td")[2];
                            if (td) {
                                let txtValue = td.innerText;
                                if (txtValue === openbtn.innerText) {
                                    tr[i].style.display = "";
                                } else {
                                    tr[i].style.display = "none";
                                }
                            }
                        }
                    });

                    myTicketsbtn.addEventListener("click", () => {
                        for (let i = 1; i < tr.length; i++) {
                            assignedto = tr[i].getElementsByTagName("td")[3];
                            if (assignedto) {
                                let txtValue = assignedto.innerText.split(" ")[0];
                                if (txtValue === cookieName) {
                                    tr[i].style.display = "";
                                } else {
                                    tr[i].style.display = "none";
                                }
                            }
                        }
                    });

                    let statusType = document.getElementsByClassName("statusType");
                    for (let i = 0; i < statusType.length; i++) {
                        if (statusType[i].innerText === "OPEN") {
                            statusType[i].classList.add("open");
                            statusType[i].classList.remove("inprogress", "closed");
                        } else if (statusType[i].innerText === "IN PROGRESS") {
                            statusType[i].classList.add("inprogress");
                            statusType[i].classList.remove("open", "closed");
                        } else if (statusType[i].innerText === "CLOSED") {
                            statusType[i].classList.add("closed");
                            statusType[i].classList.remove("inprogress", "open");
                        }
                    }
                }
            });

            let createNewIssueBtn = document.getElementById("createIssue");
            createNewIssueBtn.addEventListener("click", () => {
                this.$("#center").load("newissue.html ", function() {
                    var errorcolor = "#E45449";
                    var newissue = document.getElementById("new_issuebtn");
                    var title = document.getElementById("title");
                    var des = document.getElementById("description");
                    var user = document.getElementById("user");
                    var errortype = document.getElementById("error_type");
                    var priority = document.getElementById("priority");
                    var titleexp = /[a-zA-z]+/;
                    var desexp = /[a-zA-z0-9]/;
                    var userexp = /[a-zA-z]+/;
                    var priorityexp = /(Minor|Major|Critical)/;
                    var errortypeexp = /(Bug|Proposal|Task)/;
                    let userlst = document.getElementById("userlist");

                    //ajax request to get assigned users and populate it into the assigned to field
                    $.ajax({
                        type: "POST",
                        url: "/scripts/bugMe.php",
                        data: {
                            data: "data"
                        },
                        success: data => {
                            // alert(data);
                            userlst.innerHTML = data;
                        }
                    });

                    newissue.addEventListener("click", function() {
                        if (
                            titleexp.test(title.value) &&
                            desexp.test(des.value) &&
                            userexp.test(user.value) &&
                            priorityexp.test(priority.value) &&
                            errortypeexp.test(errortype.value)
                        ) {
                            alert("yes");

                            $.ajax({
                                type: "POST",
                                url: "/scripts/bugMe.php",
                                data: {
                                    title: title.value,
                                    description: des.value,
                                    user: user.value,
                                    error_type: errortype.value,
                                    priority: priority.value,
                                    Submitbtn: newissue.value
                                },
                                success: function(data) {
                                    alert(data);
                                }
                            });
                        } else {
                            if (titleexp.test(title.value) == false) {
                                title.style.backgroundColor = errorcolor;
                            }
                            if (desexp.test(des.value) == false) {
                                des.style.backgroundColor = errorcolor;
                            }
                            if (userexp.test(user.value) == false) {
                                user.style.backgroundColor = errorcolor;
                            }
                            if (priorityexp.test(priority.value) == false) {
                                priority.style.backgroundColor = errorcolor;
                            }

                            if (errortypeexp.test(errortype.value) == false) {
                                errortype.style.backgroundColor = errorcolor;
                            }


                        } // end of else statement
                    }); // end of submit issue function
                });
            });
        });
    });
    //------------------------------------------------------------------------------------------------

    issue.addEventListener("click", () => {
        let data = "data";

        this.$("#center").load("newissue.html ", function() {
            var errorcolor = "#E45449";
            var newissue = document.getElementById("new_issuebtn");
            var title = document.getElementById("title");
            var des = document.getElementById("description");
            var user = document.getElementById("user");
            var errortype = document.getElementById("error_type");
            var priority = document.getElementById("priority");
            var titleexp = /[a-zA-z]+/;
            var desexp = /[a-zA-z0-9]/;
            var userexp = /[a-zA-z]+/;
            var priorityexp = /(Minor|Major|Critical)/;
            var errortypeexp = /(Bug|Proposal|Task)/;
            let userlst = document.getElementById("userlist");

            //ajax request to get assigned users and populate it into the assigned to field
            $.ajax({
                type: "POST",
                url: "/scripts/bugMe.php",
                data: {
                    data: data
                },
                success: data => {

                    userlst.innerHTML = data;
                }
            });

            newissue.addEventListener("click", function() {
                if (
                    titleexp.test(title.value) &&
                    desexp.test(des.value) &&
                    userexp.test(user.value) &&
                    priorityexp.test(priority.value) &&
                    errortypeexp.test(errortype.value)
                ) {
                    alert("yes");

                    $.ajax({
                        type: "POST",
                        url: "/scripts/bugMe.php",
                        data: {
                            title: title.value,
                            description: des.value,
                            user: user.value,
                            error_type: errortype.value,
                            priority: priority.value,
                            Submitbtn: newissue.value
                        },
                        success: function(data) {
                            alert(data);
                        }
                    });
                } else {
                    if (titleexp.test(title.value) == false) {
                        title.style.backgroundColor = errorcolor;
                    }
                    if (desexp.test(des.value) == false) {
                        des.style.backgroundColor = errorcolor;
                    }
                    if (userexp.test(user.value) == false) {
                        user.style.backgroundColor = errorcolor;
                    }
                    if (priorityexp.test(priority.value) == false) {
                        priority.style.backgroundColor = errorcolor;
                    }

                    if (errortypeexp.test(errortype.value) == false) {
                        errortype.style.backgroundColor = errorcolor;
                    }


                } // end of else statement
            }); // end of submit issue function
        }); // end of  add issue event listener
    });

    //---------------------------------------------------------------------------
    adduser.addEventListener("click", () => {
        this.$("#center").load("newuser.html", () => {
            var newuser = document.querySelector("#newuserbtn");
            var errorcolor = "#E45449";
            var first = document.getElementById("firstname");
            var last = document.getElementById("lastname");
            var pw = document.getElementById("pwd");
            var email = document.getElementById("email");
            var nameexp = /[a-z]+/;
            var pwexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            var emailexp = /[a-zA-z0-9]+\@[a-z]+\.[a-z]{3}/;

            newuser.addEventListener("click", function() {
                var nt = document.getElementById("firstname");

                if (
                    nameexp.test(first.value) &&
                    nameexp.test(last.value) &&
                    emailexp.test(email.value) &&
                    pwexp.test(pw.value) &&
                    pw.value.length >= 8
                ) {
                    $.ajax({
                        type: "POST",
                        url: "scripts/bugMe.php",
                        data: {
                            firstname: first.value,
                            lastname: last.value,
                            password: pw.value,
                            email: email.value,
                            new_userbtn: newuser.value
                        },
                        success: function(data) {
                            alert(data);
                        }
                    });

                    alert("validated");
                } else {
                    if (nameexp.test(first.value) == false) {
                        nt.style.backgroundColor = errorcolor;
                    }
                    if (nameexp.test(last.value) == false) {
                        nt = document.getElementById("lastname");

                        nt.style.backgroundColor = errorcolor;
                    } else {
                        if (emailexp.test(email.value) == false) {
                            nt = document.getElementById("email");

                            nt.style.backgroundColor = errorcolor;
                        }
                        if (pwexp.test(pw.value) == false || pw.value.length < 8) {
                            nt = document.getElementById("pwd");

                            nt.style.backgroundColor = errorcolor;
                        }

                        alert("not validated");
                    } // closeing else
                }

                //alert("not validated");
            }); // closeing else
        }); // close load newuser even listener
    }); //close adduser event listener

    logout.addEventListener("click", () => {
        this.$.ajax({
            type: "POST",
            url: "/scripts/bugMe.php",
            data: {
                logout: "logout"
            },
            success: () => {
                window.location.href = "/";
            },
            error: () => {
                this.alert("ERROR");
            }
        });
    });
};