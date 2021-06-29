//Sign up

function signup() {
    var u = JSON.parse(localStorage.getItem("userData"))
    if (u == null) {
        u = [];
    }
    var todo = [];

    let fname = document.getElementById("fname").value;
    // console.log(fname);
    let lname = document.getElementById("lname").value;
    // console.log(lname);
    let email = document.getElementById("email").value;
    // console.log(email);
    let password = document.getElementById("password").value;
    // console.log(password);
    u.push({
        "fname": fname,
        "lname": lname,
        "email": email,
        "password": password,
        "todo": todo,
    });

    localStorage.setItem("userData", JSON.stringify(u));
    localStorage.setItem("active", email);
    window.location.href = "TODO.html"
    getNotes();
}

// Sign in

function signin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // console.log(password);
    var getData = JSON.parse(localStorage.getItem("userData"));

    for (let i = 0; i <= getData.length; i++) {
        var flag = 0;
        if (getData[i].email == email && getData[i].password == password) {
            window.location.href = "TODO.html";
            // console.log("ok");
            flag++;
            localStorage.setItem("active", getData[i].email);
            break;
        }
    }
    if (flag == 0) {
        alert("Incorrect Details !");
    }
    getNotes();
}

// Logout

let logout = document.getElementById("logout");
logout.addEventListener('click', function (e) {
    localStorage.removeItem("active");
    window.location.href = "signin.html";
});

// Notes

console.log("Welcome");
getNotes()

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById("addTxt");
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");
    for (let i = 0; i < uData.length; i++) {
        if (uData[i].email == activeUser) {
            uData[i].todo.push(addTxt.value);
            break;
        }
    }
    addTxt.value = "";
    localStorage.setItem("userData", JSON.stringify(uData));
    getNotes()
});

function getNotes() {
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");
    for (let i = 0; i < uData.length; i++) {
        if (uData[i].email == activeUser) {
            var notesData = uData[i].todo;
            break;
        }
    }

    let htmlCode = "";
    notesData.forEach((element, index) => {
        htmlCode +=
            `<div class="card mx-2 my-2" style="width: 15rem;">
                <div class="card-body">
                <h5 class="card-title">${index + 1}</h5>
                <textarea class="card-text" id="note${index}">${element}</textarea>
                <button id="${index}" onclick="editNote(this.id)" class="btn btn-warning">Edit</button>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete</button>
                </div>
            </div>`
    });
    let notesElement = document.getElementById("notes");
    if (notesData.length != 0) {
        notesElement.innerHTML = htmlCode;
    }
    else {
        notesElement.innerHTML = "";
    }
}

function deleteNote(index) {
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");
    for (let i = 0; i < uData.length; i++) {
        if (uData[i].email == activeUser) {
            var notesData = uData[i].todo;
            break;
        }
    }

    notesData.splice(index, 1);
    localStorage.setItem("userData", JSON.stringify(uData));
    getNotes();
}

function editNote(index) {
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");
    for (let i = 0; i < uData.length; i++) {
        if (uData[i].email == activeUser) {
            var notesData = uData[i].todo;
            break;
        }
    }

    let newData = document.getElementById(`note${index}`).value;
    notesData.splice(index, 1, newData);
    localStorage.setItem("userData", JSON.stringify(uData));
    getNotes();
}

// User Details

function fillDetails() {
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");

    for (let i = 0; i < uData.length; i++) {
        if (uData[i].email == activeUser) {
            document.getElementById("fname").value = uData[i].fname;
            document.getElementById("lname").value = uData[i].lname;
            document.getElementById("password").value = uData[i].password;
        }
    }
}

function updateDetails() {
    let uData = JSON.parse(localStorage.getItem("userData"));
    let activeUser = localStorage.getItem("active");

    let fname1 = document.getElementById("fname").value;
    let lname1 = document.getElementById("lname").value;
    let password1 = document.getElementById("password").value;
    console.log(uData);

    for (let i = 0; i < uData.length; i++) {
        if (uData[i].email == activeUser) {
            uData[i].fname = fname1;
            uData[i].lname = lname1;
            uData[i].password = password1;
        }
    }
    localStorage.setItem("userData", JSON.stringify(uData));
}