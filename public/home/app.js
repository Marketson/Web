document.addEventListener("DOMContentLoaded", event => {
    db = firebase.firestore();
    app = firebase.app();
})


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        guser = user
        console.log(user.displayName)
        if (user.displayName === null) {
            //get user to fill out form
            $('#staticBackdrop').modal()
        }
    } else {
        window.location.href = "/"
    };
});


function setName() {
    var user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: document.getElementById("suusername").value,
    });
    $('#staticBackdrop').modal('hide')
}


function signOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        console.error(error)
        alert(error)
    });

}