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

function showName() {
    firebase.auth().onAuthStateChanged(function (user) {
        console.log(user);
        document.getElementById("headerTitle").innerHTML = user.displayName;
    });
}



function showBooks(){
  firebase.auth().onAuthStateChanged(function(user){
      var books = db.collection("books");
       books.get().then(snap => {
           size = snap.size; // will return the collection size
           var bookspage = document.createElement('table');
           bookspage.setAttribute('id', 'books-page');
           document.body.appendChild(bookspage);
           for(var i = 0; i < size; i++){
                books.doc(i.toString()).get().then(function(doc){
                    //creates content 
                    
                    //gets book data
                    var book = doc.data();
                    console.log (doc.id); // 
                    var bookid = doc.id;
                    console.log(book);
                    //creates book div
                    var bookdiv = document.createElement('tr');
                    bookdiv.setAttribute('class', 'book');
                    bookspage.appendChild(bookdiv);
                    
                    //creates cover div
                    var bookcover = document.createElement('td');
                    bookcover.setAttribute('class', 'bookcover');
                    //puts it in the book div
                    bookdiv.appendChild(bookcover);
                    
                    //creates image
                    var cover = document.createElement('img');
                    console.log(book.image)
                    //adds book cover to image
                    cover.setAttribute('src', book.image);
                    cover.setAttribute('class', "coverimg");
                    bookcover.appendChild(cover);
                    
                    //creates title
                    var title = document.createElement('p');
                    title.innerHTML = book.title;
                    title.setAttribute('class', 'bookTitle');
                    //adds title to book cover
                    bookcover.appendChild(title);
                    var favs = document.createElement('button');
//                    favs.setAttribute('id', 'button' + i);
                    favs.setAttribute('class', 'favs');
                    favs.setAttribute('id', 'button' + doc.id.toString());
                    favs.innerHTML = 'Add to Favorites';
                    //favs.setAttribute('onclick', "this.addEventListener('click', '');");
//                    favs.addEventListener('click', "console.log('hi', this);");
                    bookcover.appendChild(favs);
                    
                    //creates book details div
                    var bookdetails = document.createElement('td');
                    bookdetails.setAttribute('class', 'details');
                    //adds book details to book div
                    bookdiv.appendChild(bookdetails);
                    
                    //create author
                    var author = document.createElement('p');
                    author.setAttribute('class', 'author');
                    author.innerHTML = book.author;
                    bookdetails.appendChild(author);
                    
                    //create year
                    var year = document.createElement('p');
                    year.setAttribute('class', 'year');
                    year.innerHTML = " (" + book.yearPublished + ")";
                    bookdetails.appendChild(year);
                    
                    //creates summary
                    var summary = document.createElement('p');
                    summary.innerHTML = book.summary;
                    summary.setAttribute('class', 'summary');
                    bookdetails.appendChild(summary);
                    

                    $( ".favs" ).each(function( j ) {
                        this.addEventListener('click', function(){ 
                           console.log(j);
                            
                           var jj = j.toString();
                           console.log(jj);
                        
                           db.collection("books").doc(jj).get().then(function(snap){
                               console.log(snap.data());
                               db.collection('users').doc(user.uid).collection('usersBooks').doc(j.toString()).set({
                            
                                author: snap.data().author,
                                genre: snap.data().genre,
                                image: snap.data().image, 
                                summary: snap.data().summary,
                                title: snap.data().title,
                                yearPublished: snap.data().yearPublished 
                            })
                           })
                                         
                        })
                        
                    });
                })
           }
       })
  })
}   



function showFavs(){ 
    firebase.auth().onAuthStateChanged(function(user){
        db.collection('users').doc(user.uid).collection('usersBooks').get().
        then(function(bookssnap){
            var bookspage = document.createElement('table');
           bookspage.setAttribute('id', 'books-page');
           document.body.appendChild(bookspage);
            console.log(bookssnap.empty);
            bookssnap.forEach(function(b){
                    console.log(b.data());
                    var book = b.data();
                    //creates book div
                    var bookdiv = document.createElement('tr');
                    bookdiv.setAttribute('class', 'book');
                    bookspage.appendChild(bookdiv);
                    
                    //creates cover div
                    var bookcover = document.createElement('td');
                    bookcover.setAttribute('class', 'bookcover');
                    //puts it in the book div
                    bookdiv.appendChild(bookcover);
                    
                    //creates image
                    var cover = document.createElement('img');
                    console.log(book.image)
                    //adds book cover to image
                    cover.setAttribute('src', book.image);
                    cover.setAttribute('class', "coverimg");
                    bookcover.appendChild(cover);
                    
                    //creates title
                    var title = document.createElement('p');
                    title.innerHTML = book.title;
                    title.setAttribute('class', 'bookTitle');
                    //adds title to book cover
                    bookcover.appendChild(title);
                    //favs.setAttribute('onclick', "this.addEventListener('click', '');");
//                  //favs.addEventListener('click', "console.log('hi', this);");
                    
                    
                    //creates book details div
                    var bookdetails = document.createElement('td');
                    bookdetails.setAttribute('class', 'details');
                    //adds book details to book div
                    bookdiv.appendChild(bookdetails);
                    
                    //create author
                    var author = document.createElement('p');
                    author.setAttribute('class', 'author');
                    author.innerHTML = book.author;
                    bookdetails.appendChild(author);
                    
                    //create year
                    var year = document.createElement('p');
                    year.setAttribute('class', 'year');
                    year.innerHTML = " (" + book.yearPublished + ")";
                    bookdetails.appendChild(year);
                    
                    //creates summary
                    var summary = document.createElement('p');
                    summary.innerHTML = book.summary;
                    summary.setAttribute('class', 'summary');
                    bookdetails.appendChild(summary);
            })
        })
    })
}
