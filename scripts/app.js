//===============================================
// This files contains all the javascript functions
// used in the project
//
// @author Carly Orr
// @version 1.0
//=================================================

// ---------------------------------------------
// Display the current Caffeine Count (id="caffeinecount")
// ---------------------------------------------
//function showCaffeineCount(){
//  //var x=25;  // get this number from database eventually
//  // for now we assume this value is in localStorage
//  var x = window.localStorage.getItem('num_cups');
//  document.getElementById("caffeinecount").innerHTML = x;
//}

// ---------------------------------------------
// Display the current Date (id="today")
// ---------------------------------------------
//function showDate(){
//  var d = new Date();
//  var line = d.toDateString().slice(0,15);
//  document.getElementById("today").innerHTML = line;
//}

// ---------------------------------------------
// Setup a Listener for the Logout button called "btnLogout"
// When button is clicked, increment the "num_cups" variable.
// Eventually this is saved in the database.
// For now, we save it into LocalStorage.
// ---------------------------------------------
//function setAddListener(){
//  document.getElementById("addBtn").addEventListener("click", function(e) {
//    var x= parseInt(window.localStorage.getItem("num_cups"));
//    window.localStorage.setItem('num_cups', x+1);
//    showCaffeineCount();
//  })
//}   

// ---------------------------------------------
// If the currently logged in user is authenticated,
// then signout this person "user".
// ---------------------------------------------
function logoutUser() {
  firebase.auth().onAuthStateChanged(function(user){
      var promise = firebase.auth().signOut();
      promise.then(function(){
          //alert("logged out");
      });
  });
}

// ---------------------------------------------
// If the currently logged in user is authenticated,
// then show the person's name in the header (id="name")
// ---------------------------------------------

var book1 = db.collection("books").doc("book1");
var book2 = db.collection("books").doc("book2");

function showTitles(){
  firebase.auth().onAuthStateChanged(function(user){
      //first, it "gets" the book document from the database
      book1.get().then(function(doc){
          //then, it assigns the title to a variable
          var myObj = doc.data().title;
          //finally, it stores the title in an html tag
          document.getElementById("book1title").innerHTML = myObj;
      })
      book2.get().then(function(doc){
          var myObj = doc.data().title;
          document.getElementById("book2title").innerHTML = myObj;
      })
  });
}
function showYears(){
  firebase.auth().onAuthStateChanged(function(user){
      book1.get().then(function(doc){
          let myObj = doc.data().yearPublished;
          document.getElementById("book1year").innerHTML = myObj;
      })
      book2.get().then(function(doc){
          let myObj = doc.data().yearPublished;
          document.getElementById("book2year").innerHTML = myObj;
      })
  });
}
function showAuthors(){
  firebase.auth().onAuthStateChanged(function(user){
      book1.get().then(function(doc){
          let myObj = doc.data().author;
          document.getElementById("book1author").innerHTML = myObj;
      })
      book2.get().then(function(doc){
          let myObj = doc.data().author;
          document.getElementById("book2author").innerHTML = myObj;
      })
  });
}
function showGenres(){
  firebase.auth().onAuthStateChanged(function(user){
      book1.get().then(function(doc){
          let myObj = doc.data().genre;
          document.getElementById("book1genre").innerHTML = myObj;
      })
      
      book2.get().then(function(doc){
          let myObj = doc.data().genre;
          document.getElementById("book2genre").innerHTML = myObj;
      })
  });
}
function showSummaries(){
  firebase.auth().onAuthStateChanged(function(user){
      book1.get().then(function(doc){
          let myObj = doc.data().summary;
          document.getElementById("book1summary").innerHTML = myObj;
      })
      
      book2.get().then(function(doc){
          let myObj = doc.data().summary;
          document.getElementById("book2summary").innerHTML = myObj;
      })
  });
}

function clickButton1(){
    firebase.auth().onAuthStateChanged(function(user){
        //addFav1 - button
        document.getElementById('addFav1').addEventListener('click', function(){
            //first, it "gets" the book1 document
            db.collection("books").doc("book1").get()
            //then, it adds a document to the collection usersBooks in the user document. This is adding a book to the user's inventory, or "favorite books"
                .then(function(doc){ db.collection('users').doc(user.uid).collection('usersBooks').doc('book1').set({
                    author: doc.data().author,
                    genre: doc.data().genre,
                    summary: doc.data().summary,
                    title: doc.data().title,
                    yearPublished: doc.data().yearPublished
                })
            })
        })
    })
}

function clickButton2(){
    firebase.auth().onAuthStateChanged(function(user){
        document.getElementById('addFav2').addEventListener('click', function(){
            db.collection("books").doc("book2").get().then(function(doc){
                db.collection('users').doc(user.uid).collection('usersBooks').doc('book2').set({
                    author: doc.data().author,
                    genre: doc.data().genre,
                    summary: doc.data().summary,
                    title: doc.data().title,
                    yearPublished: doc.data().yearPublished
                    
                })
            })
        })
    })
}

function showBooks(){
  firebase.auth().onAuthStateChanged(function(user){
      var books = db.collection("books");
       books.get().then(snap => {
           size = snap.size; // will return the collection size
           for(var i = 0; i < 2; i++){
                books.doc(i.toString()).get().then(function(doc){
                    var book = doc.data();
                    console.log(book);
                    var bookdiv = document.createElement('div');
                    bookdiv.setAttribute('class', 'book');
                    document.body.appendChild(bookdiv);
                    
                    var bookcover = document.createElement('div');
                    bookcover.setAttribute('class', 'bookcover');
                    bookdiv.appendChild(bookcover);
                    var cover = document.createElement('img');
                    console.log(book.image)
                    cover.setAttribute('src', book.image);
                    bookcover.appendChild(cover);
                    
                    var bookdetails = document.createElement('div');
                    bookdetails.setAttribute('class', 'details');
                    bookdiv.appendChild(bookdetails);
                    
                })
           }
       })
  })
    
}

