//Global variables.
const container = document.getElementById("container");
const form = document.querySelector("form");

//Library array.
myLibrary = [];

//Book constructor.
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

//Example book information. 
const defaultBook = new Book(
    "Harry Potter and the Philosopher's Stone",
    "J.K. Rowling", "223", "Read"
);
const defaultBook2 = new Book(
    "Of Mice and Men",
    "John Steinbeck", "107", "Not Read"
)
const defaultBook3 = new Book(
    "The Outsiders",
    "S.E. Hinton", "192", "Read"
)

function addDefaultBooksToLibrary(){
    myLibrary.push(defaultBook);
    myLibrary.push(defaultBook2);
    myLibrary.push(defaultBook3);
    console.log(myLibrary);
}
document.addEventListener("DOMContentLoaded", addDefaultBooksToLibrary);

//Input variables.
const title = document.getElementById("bookTitle");
const author = document.getElementById("bookAuthor");
const pages = document.getElementById("bookPages");
const checkbox = document.getElementById("bookStatus");


//Check the read status.
let isChecked;
let readStatus;

function getReadStatus(){
    if(this.checked){
        isChecked = true;
        readStatus = "Read";
    }else if(!this.checked){
        isChecked = false;
        readStatus = "Not Read"
    }
};
checkbox.addEventListener("click", getReadStatus);

//Function to add new book from input. 
function addNewBookToLibrary(){
    const read = readStatus;
    newBook = new Book(title.value, author.value, pages.value, read);

    myLibrary.push(newBook);
    console.log(myLibrary);
    hideModal();
}

form.addEventListener("submit", function(e){
    addNewBookToLibrary();
    e.preventDefault();
    form.reset();
});

function createBookCard(){
    cardDiv = document.createElement("div");
    headerDiv = document.createElement("div");
    statusDiv = document.createElement("div");
    titleDiv = document.createElement("div");
}


//Modal variables.
let modal = document.getElementById("modal");
let addBtn = document.getElementById("addBtn");
let closeBtn = document.getElementsByClassName("close")[0];

//Function to show modal.
function displayModal(){
    modal.style.display = "block";
    getReadStatus();
};

//Function to hide modal.
function hideModal(){
    modal.style.display = "none";
};

//Buttons for modal function.
addBtn.addEventListener("click",displayModal);
closeBtn.addEventListener("click",hideModal);

