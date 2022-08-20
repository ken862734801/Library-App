//Global variables.
const container = document.getElementById("container");
const form = document.querySelector("form");

//Input variables.
const title = document.getElementById("bookTitle");
const author = document.getElementById("bookAuthor");
const pages = document.getElementById("bookPages");
const readStatus = document.getElementById("bookStatus");

//Library array.
myLibrary = [];

//Book constructor.
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, Read: ${read}.`;
    }
};

function addNewBookToLibrary(){
    let newBook = new Book(title.value, author.value, pages.value, readStatus.checked);
    myLibrary.push(newBook);
    console.log(myLibrary);
};

//Example book information. 
const defaultBook = new Book(
    "Harry Potter and the Goblet of Fire",
    "J.K. Rowling", "636", true
);
const defaultBook2 = new Book(
    "Of Mice and Men",
    "John Steinbeck", "107", false
)
const defaultBook3 = new Book(
    "The Outsiders",
    "S.E. Hinton", "192", true
)

function addDefaultBooksToLibrary(){
    myLibrary.push(defaultBook, defaultBook2, defaultBook3);
    console.log(myLibrary);
    createBook();
};

//Add information to array and create example cards on load.
document.addEventListener("DOMContentLoaded", addDefaultBooksToLibrary);

function createBook(){

    container.textContent="";

    for(i=0; i < myLibrary.length; i++){

        //Create DOM elements.
        let cardDiv = document.createElement("div");
        let headerDiv = document.createElement("div");
        let span = document.createElement("span");
        let statusDiv = document.createElement("div");
        let titleDiv = document.createElement("div");
        let authorDiv = document.createElement("div");
        let pagesDiv = document.createElement("div");
        let buttonDiv = document.createElement("div");
        let p = document.createElement("p");
        let label = document.createElement("label");
        let checkbox = document.createElement("input");
        let span2 = document.createElement("span");

        //DOM element details.
        cardDiv.className = "card";
        cardDiv.id = `${myLibrary[i].title}`
        cardDiv.setAttribute("data-index", `${i}`);
        headerDiv.className = "card-header";
        span.className = "remove";
        titleDiv.className = "card-title";
        statusDiv.className = "card-status";
        authorDiv.className = "card-author";
        pagesDiv.className = "card-pages";
        buttonDiv.className = "card-button";
        label.className = "switch";
        checkbox.type = "checkbox";
        checkbox.className = "toggleBtn";
        span2.className = "slider round";

        //Append DOM elements.
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
        label.appendChild(checkbox);
        label.appendChild(span2);

        //DOM text elements.
        span.textContent = "\u00D7";
        titleDiv.textContent = `${myLibrary[i].title}`;
        authorDiv.textContent = `Written by ${myLibrary[i].author}`;
        pagesDiv.textContent = `${myLibrary[i].pages} pages`;
        p.textContent = "Read:";

        //DOM Elements related to read status.
        if(myLibrary[i].read === true){
            statusDiv.classList.add("complete")
            statusDiv.textContent = "Finished";
            checkbox.checked = true;
        }else if(myLibrary[i].read === false){
            statusDiv.textContent = "Not Finished";
            statusDiv.classList.add("not-complete");
            checkbox.checked = false;
        };
    }
    updateBook();
    deleteBook();
};

//Function to update book card.
function updateBook(){
    const toggleBtn = document.querySelectorAll(".toggleBtn");

    for(i=0; i < toggleBtn.length; i++){
        toggleBtn[i].addEventListener("change", function(e){
            let bookToUpdate = e.target.closest("div.card");
            let bookId = bookToUpdate.id;
            const bookItem = myLibrary.findIndex(item => item.title === bookId);
            if(myLibrary[bookItem].read === true){
                myLibrary[bookItem].read = false;
                console.log(myLibrary);
                createBook();
            }else{
                myLibrary[bookItem].read = true;
                createBook();
                console.log(myLibrary);
            }
            
        });
    };
}

//Function to delete book card.
function deleteBook(){
    const remove = document.querySelectorAll(".remove");

    for(i=0; i < remove.length; i++){
        remove[i].addEventListener("click", function(e){
            e.preventDefault();
            let bookToDelete = e.target.closest("div.card");
            bookToDelete.remove();

            let bookId = bookToDelete.id;
            const bookItem = myLibrary.findIndex(item => item.title === bookId);
            myLibrary.splice(bookItem, 1);

            displayMessage();
        });
    };
};

//Function to display message when library is empty.
function displayMessage(){
    if(myLibrary.length === 0){
        container.textContent = "Your bookshelf is currently empty."
    }
};

//Form event listener. Adds information to array on form submit.
form.addEventListener("submit", function(e){
    e.preventDefault();
    addNewBookToLibrary();
    createBook();
    hideModal();
    form.reset();
});

//Modal variables.
let modal = document.getElementById("modal");
let addBtn = document.getElementById("addBtn");
let closeBtn = document.getElementsByClassName("close")[0];

//Function to show modal.
function displayModal(){
    modal.style.display = "block";
};

//Function to hide modal.
function hideModal(){
    modal.style.display = "none";
};

//Buttons for modal function.
addBtn.addEventListener("click",displayModal);
closeBtn.addEventListener("click",hideModal);
