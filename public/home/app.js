document.addEventListener("DOMContentLoaded", event => {
    db = firebase.firestore();
    app = firebase.app();
    const listeditems = db.collection("listing")//.where('creator', '==', curuser.uid)
    listeditems.get()
        .then(listing => {
            listing.forEach(doc => {
                var data = doc.data()
                $(`<a onclick="viewListingOwn(${JSON.stringify(data.title).replace(/"/g, "&quot;")}, ${JSON.stringify(data.description).replace(/"/g, "&quot;")})" class="list-group-item list-group-item-action" >${data.title}</a>`).appendTo('#my-listed-items')
            })
        })
})


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        curuser = user
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

function addListing() {

}

function deleteListing(listing) {

}

function viewListing() {

}

function viewListingOwn(title = "ERR", description = "ERROR") {
    bootbox.dialog({
        title: title,
        message: $(`<p>${description}</p>`),
        size: 'large',
        buttons: {
            cancel: {
                label: "Close",
                className: 'btn-secondary',
            },
            ok: {
                label: "Delete listing.",
                className: 'btn-danger',
                callback: deleteListing()
            }
        }
    });
}