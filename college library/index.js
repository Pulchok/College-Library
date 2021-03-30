console.log("This is index.js");

// Add Scroll Bar into the table
let tableBody = document.getElementById('table');
tableBody.style.overflow = 'auto';
tableBody.style.height = '200px';



//Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;

}

//Display Constructor
function Display() {

}

//Add method to display prototype
Display.prototype.add = function (book,index) {
    console.log('Adding to UI');
    let i = 1;
    let tableBody = document.getElementById('tableBody');

   
        let uiString = `<tr>
        <td></td>
        <td>${book.name}</td>
        <td>${book.author}</td>
         <td>${book.type}</td>
         <td><button id="${index}" onclick="checkstatus(this.id)" class="btn btn-primary">Available</button></td>
      </tr>`
        tableBody.innerHTML += uiString;

}


//Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//Implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2 || book.type==undefined) {
        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (type,displayMessage) {
    let message = document.getElementById('message');
    let boldText;
    if(type==='success'){
        boldText='Success';
    }
    else{
        boldText='Error';
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                             <strong>${boldText}:</strong>${displayMessage}
                             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                         </div>`;

    setTimeout(function() {
        message.innerHTML ='' 
    },3000);
}


//Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {

    console.log('You have submitted library form');

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let et = document.getElementById('electronics');
    let programming = document.getElementById('programming');
    let dac = document.getElementById('civil');

    if (et.checked) {
        type = et.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (dac.checked) {
        type = dac.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success'," Your book has been added");
    }
    else {
        display.show('danger'," Sorry you can't add this book");
    }

    e.preventDefault();
}
