//JSON.stringify(data.title).replace(/"/g, "&quot;")
document.addEventListener("DOMContentLoaded", event => {
    db = firebase.firestore();
    app = firebase.app();
    const listeditems = db.collection("listing")//.where('creator', '==', curuser.uid)
    listeditems.onSnapshot(listing => {
        document.getElementById("card-container").innerHTML = ""
        listing.forEach(doc => {
            var data = doc.data()
            var col = $('<div class="col-12 col-sm-8 col-md-6 col-lg-2 col-xl-3"></div>');
            //create row of cards
            var panel = $(`<div class="card" style="width: 18rem;" Panel"><div class="card-body text-center"><div class="card-title"><h5>${data.title}</h5><p> ${data.description.slice(0, 100) + '...'}</p><button onclick="viewListingOwn(${JSON.stringify(data.title).replace(/"/g, "&quot;")},${JSON.stringify(data.description).replace(/"/g, "&quot;")})" class="btn btn-primary" role="button">View</button><br></div></div>`);
            panel.appendTo(col);
            col.appendTo('#card-container')
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
    bootbox.dialog({
        title: "Add a listing",
        message: $(`
        <form>
          <div class="form-group">
            <label class="col-form-label">Title</label>
            <input id="addlisting-title" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label class="col-form-label">Description</label>
            <textarea id="addlisting-des" class="form-control" ></textarea>
          </div>
        </form>
        `),
        size: 'large',
        buttons: {
            cancel: {
                label: "Close",
                className: 'btn-secondary',
            },
            ok: {
                label: "Post listing",
                className: 'btn-primary',
                callback: function () {
                    db.collection("listing").doc(document.getElementById("addlisting-title").value).set({
                        title: document.getElementById("addlisting-title").value,
                        owner: curuser.uid,
                        description: document.getElementById("addlisting-des").value,
                        createdAt: "sad",
                        createdLoc: "sad"
                    })
                }
            }
        }
    });

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