//Global variables.
const container = document.getElementById("container");
const form = document.querySelector("form");

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
        console.log("Read");
    }else if(!this.checked){
        isChecked = false;
        readStatus = "Not Read";
        console.log("Not Read");
    }
};

checkbox.addEventListener("click", getReadStatus);

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
    "Harry Potter and the Goblet of Fire",
    "J.K. Rowling", "636", "Read"
);
const defaultBook2 = new Book(
    "Of Mice and Men",
    "John Steinbeck", "107", "Not Read"
)
const defaultBook3 = new Book(
    "The Outsiders",
    "S.E. Hinton", "192", "Read"
)

//Add example books to library. 
function addDefaultBooksToLibrary(){
    myLibrary.push(defaultBook);
    myLibrary.push(defaultBook2);
    myLibrary.push(defaultBook3);
    console.log(myLibrary);
}

//Function to add new book from input. 
function addNewBookToLibrary(){
    const read = readStatus;
    newBook = new Book(title.value, author.value, pages.value, read);

    myLibrary.push(newBook);
    console.log(myLibrary);
    hideModal();
};

//Function to create book cards.
function createBooks(){
  
    container.textContent="";

    for(let i= 0; i < myLibrary.length; i++){

    let cardDiv = document.createElement("div");
    let headerDiv = document.createElement("div");
    let span = document.createElement("span");
    let statusDiv = document.createElement("div");
    let titleDiv = document.createElement("div");
    let authorDiv = document.createElement("div");
    let pagesDiv = document.createElement("div");
    let buttonDiv = document.createElement("div");
    let label = document.createElement("label");
    let p = document.createElement("p");
    let checkbox2 = document.createElement("input");
    let span2 = document.createElement("span");

    cardDiv.className = "card";
    cardDiv.id = `${myLibrary[i].title}`;
    headerDiv.className = "card-header";
    span.className = "remove";
    span.id = "remove-"+[i];
    titleDiv.className = "card-title";
    statusDiv.className = "card-status";
    authorDiv.className = "card-author";
    buttonDiv.className = "card-button";
    label.className = "switch"
    span2.className = "slider round";
   
    checkbox2.type = "checkbox";

    container.appendChild(cardDiv);
    cardDiv.appendChild(headerDiv);
    headerDiv.appendChild(span);
    cardDiv.appendChild(statusDiv);
    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(authorDiv);
    cardDiv.appendChild(pagesDiv);
    cardDiv.appendChild(buttonDiv);
    buttonDiv.appendChild(p);
    buttonDiv.appendChild(label);
    label.appendChild(checkbox2);
    label.appendChild(span2);

    span.textContent = "\u00D7"
    titleDiv.textContent = `${myLibrary[i].title}`;
    authorDiv.textContent = `Written by ${myLibrary[i].author}`;
    pagesDiv.textContent = `${myLibrary[i].pages} pages`;
    p.textContent = "Read:"

        if (myLibrary[i].read === "Read"){
            statusDiv.classList.add("complete")
            statusDiv.textContent = "Finished";
            checkbox2.checked = true;
        }else if (myLibrary[i].read === "Not Read"){
            statusDiv.textContent = "Not Finished";
            statusDiv.classList.add("not-complete")
            checkbox2.checked = false;
        }
    };

    deleteBookCard();
};

function deleteBookCard(){
    const remove = document.querySelectorAll(".remove");
    console.log(remove.length);

    for(i=0; i < remove.length; i++){
        remove[i].addEventListener("click", function(e){
            e.preventDefault();
            let bookToDelete = e.target.closest("div.card")
            bookToDelete.remove();
            console.log(bookToDelete);

            let bookId = bookToDelete.id;
            console.log(bookId);

            const bookItem = myLibrary.findIndex(item => item.title === bookId);
            myLibrary.splice(bookItem, 1);

            console.log(myLibrary.length);
            console.log(myLibrary);

            displayMessage();
        });
    }
    
};

function displayMessage(){
    if(myLibrary.length === 0){
        container.textContent="Your bookshelf is currently empty."
    }
};


//Form event listener. Adds information to array on form submit.
form.addEventListener("submit", function(e){
    addNewBookToLibrary();
    createBooks();
    form.reset();
    e.preventDefault();
});

//Add information to array and create example cards on load.
document.addEventListener("DOMContentLoaded", addDefaultBooksToLibrary);
document.addEventListener("DOMContentLoaded", createBooks);

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
