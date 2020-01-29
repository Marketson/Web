const suusername = document.getElementById("suusername")
const suemail = document.getElementById("suemail")
const supassword = document.getElementById("supassword")
const siemail = document.getElementById("siemail")
const sipassword = document.getElementById("sipassword")

document.addEventListener("DOMContentLoaded", event => {
    app = firebase.app();
})


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "/home"
    } else {
        // No user is signed in.
    };
});


function signIn() {
    //Sign in with google.
    console.log(document.getElementById("supassword"))
    console.log(suemail, supassword)
    firebase.auth().signInWithEmailAndPassword(siemail.value, sipassword.value)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}

function signUp() {
    console.log(document.getElementById("supassword"))
    console.log(suemail, supassword)
    firebase.auth().createUserWithEmailAndPassword(suemail.value, supassword.value)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
};