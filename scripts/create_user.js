function createUser() {

    // If the user is authenticated, get this "user" object
    // Create this user node(doc) in the datebase users collection

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).set({
            "name": user.userName,
            "email": user.email,
            "total": 0,
        });
    });
}