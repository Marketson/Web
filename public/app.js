const suemail = document.getElementById("suemail")
const supassword = document.getElementById("supassword")

document.addEventListener("DOMContentLoaded", event => {
    db = firebase.firestore();
    app = firebase.app();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "/home"
        } else {
            // No user is signed in.
        };
    });
});


function signIn() {
    //Sign in with google.
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode, errorMessage)
        // ...
    })
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
}