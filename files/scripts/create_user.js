function createUser(){
    firebase.auth().onAuthStateChanged(function(user){
        db.collection("users").doc(user.uid).set(
		{
        "displayName":user.displayName, 
         "email":user.email,
        });
    });
}



