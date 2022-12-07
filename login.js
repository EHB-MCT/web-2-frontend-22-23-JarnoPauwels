import { getData } from './fetch.js';

// Switch to Register Form
document.getElementById('registerBtn').addEventListener('click', event =>{
    event.preventDefault();
    document.getElementById("loginContainer").style.display ="none";
    document.getElementById("registerContainer").style.display ="block";
})

// Switch to Login Form
document.getElementById('loginBtn').addEventListener('click', event =>{
    event.preventDefault();
    document.getElementById("loginContainer").style.display ="block";
    document.getElementById("registerContainer").style.display ="none";
})

document.getElementById('logoutBtn').addEventListener('click', event =>{
    event.preventDefault();
    console.log("clicked")
    sessionStorage.removeItem('user');
})

// Login
document.getElementById('lForm').addEventListener("submit", event =>{
    event.preventDefault()

    let user = {}
    user.email = document.getElementById("inputEmail").value;
    user.password = document.getElementById("inputPassword").value;

    // Check for login
    getData("http://localhost:1337/login", "POST", user).then(result => {
        console.log(result);
        sessionStorage.setItem('user', JSON.stringify(result.data));
        clearInput()
        loginMessage()
    })
})

// Register
document.getElementById('rForm').addEventListener("submit", event =>{
    event.preventDefault()

    let user = {}
    user.username = document.getElementById("inputUsername").value;
    user.email = document.getElementById("inputRegEmail").value;
    user.password = document.getElementById("inputRegPassword").value;
    user.password2 = document.getElementById("inputRegPassword2").value;

    console.log(user.username, user.email, user.password, user.password2)
    console.log(user)
    // Check the passwords
    if(user.password == user.password2){
        // Register the user
        getData("http://localhost:1337/register", "POST", user).then(data => {
            alert(data.message);
            switchLogin()
            registerMessage()
        })
    }else{
        alert("Passwords do not match")
    }
})

// Switch to Login Form Function
function switchLogin(){
    document.getElementById("registerContainer").style.display ="none";
    document.getElementById("loginContainer").style.display ="block";
}

function loginTooltip(){
    let loggedUser = JSON.parse(sessionStorage.getItem('user'))

    if(loggedUser){
        document.getElementById('loginTooltip').innerText = `Logged in as: ${loggedUser.username}`;
    };
}

loginTooltip();

function loginMessage(){
    let loggedUser = JSON.parse(sessionStorage.getItem('user'))

    if(loggedUser){
        document.getElementById('welcomeMessage').innerText = `Welcome ${loggedUser.username}!`;
    };
}

function registerMessage(){
    let loggedUser = JSON.parse(sessionStorage.getItem('user'))

    if(loggedUser){
        document.getElementById('welcomeMessage').innerText = `Your account has been registered, ${loggedUser.username}! Login to start saving songs!`;
    };
}

function clearInput(){
    var getEmailValue= document.getElementById("inputEmail");
      if (getEmailValue.value !="") {
          getEmailValue.value = "";
      }
    var getPassValue= document.getElementById("inputPassword");
      if (getPassValue.value !="") {
          getPassValue.value = "";
      }
}