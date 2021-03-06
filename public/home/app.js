//JSON.stringify(data.title).replace(/"/g, "&quot;")
document.addEventListener("DOMContentLoaded", event => {
    db = firebase.firestore();
    app = firebase.app();
    getLocation();
})


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.curuser = user
        if (user.displayName === null) {
            //get user to fill out form
            $('#staticBackdrop').modal()
        } else {
            //wishlist categories load
            db.collection("wish-items")
                .get()
                .then(function (querySnapshot) {
                    window.wishPresets = querySnapshot
                })

            //listeditems load
            const listeditems = db.collection("listing").where("owner", "==", curuser.uid)
            listeditems.onSnapshot(listing => {
                document.getElementById("card-container").innerHTML = "";
                listing.forEach(doc => {
                    var data = doc.data();
                    var col = $('<div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"></div>');
                    //create row of cards
                    var panel = $(`<div class="card" style="width: 18rem;" Panel"><div class="card-body text-center"><div class="card-title"><h5>${data.title}</h5><p> ${data.description.slice(0, 100) + '...'}</p><button onclick="viewListingOwn(${JSON.stringify(data.title).replace(/"/g, "&quot;")},${JSON.stringify(data.description).replace(/"/g, "&quot;")})" class="btn btn-primary" role="button">View</button><br></div></div>`);
                    panel.appendTo(col);
                    col.appendTo('#card-container')
                })
            })
        }
    } else {
        window.location.href = "/"
    };
});


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(setLocation);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function setLocation(position) {
    lat = position.coords.latitude
    lon = position.coords.latitude
}

function setName() {
    var user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: "@" + document.getElementById("suusername").value,
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
                    db.collection("listing").doc(curuser.uid + "_" + document.getElementById("addlisting-title").value).set({
                        title: document.getElementById("addlisting-title").value,
                        owner: curuser.uid,
                        description: document.getElementById("addlisting-des").value,
                        createdAt: "sad", //Set date here
                        createdLoc: new firebase.firestore.GeoPoint(lat, lon)
                    })
                }
            }
        }
    });

}

function deleteListing(listing) {
    db.collection("listing").doc(listing).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

function sendOffer() {
    console.log("Offer Sent")
}

function viewListing(title, description) {
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
                label: "Send Offer",
                className: 'btn-success',
                callback: function (result) {
                    if (result === null) {
                        // Prompt dismissed
                    } else {
                        // result has a value
                        sendOffer(title)
                    }
                }
            }
        }
    });
}

function viewListingOwn(title, description) {
    bootbox.dialog({
        title: title,
        message: $(`<p>${description}</p>`),
        size: 'large',
        buttons: {
            cancel: {
                label: "Close",
                className: 'btn-secondary',
                callback: function () {

                }
            },
            ok: {
                label: "Delete listing.",
                className: 'btn-danger',
                callback: function (result) {
                    if (result === null) {
                        // Prompt dismissed
                    } else {
                        // result has a value
                        deleteListing(title)
                    }
                }
            }
        }
    });
}

function addWish() {
    bootbox.dialog({
        title: "Add a wishlist item.",
        message: $(`
        <form>
          <div class="form-group">
            <select id="add-wishlist-item-preset" class="custom-select">
            </select>
          </div>
        </form>
        `),
        onShow: function () {
            wishPresets.forEach(doc => {
                const data = doc.data();
                var option = $('<option value=' + data.title + '>' + data.title + '</option>')
                option.appendTo('#add-wishlist-item-preset')
            })
        },
        size: 'large',
        buttons: {
            cancel: {
                label: "Close",
                className: 'btn-secondary',
            },
            ok: {
                label: "Add wishlist item.",
                className: 'btn-primary',
                callback: function () {
                    db.collection("wish").doc(curuser.uid + "_" + document.getElementById("addwish-title").value).set({
                        item: document.getElementById("addlisting-title").value,
                        owner: curuser.uid,
                    })
                }
            },
        }
    });

}