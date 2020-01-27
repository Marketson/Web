document.addEventListener("DOMContentLoaded", event => {
    const db = firebase.firestore();
    const app = firebase.app();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "/home"
        } else {
            // No user is signed in.
        };
    });
});


function signIn() {
    const provider = new.signInWithEmailAndPassword(email, password);
    //Sign in with google.
    firebase.auth().signInWithRedirect(provider)
        .then(result => {
            window.location.reload();
        })
}

function signUp() {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    window.location.href = "/home"
}