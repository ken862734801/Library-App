let myLibrary = [];

function addBookToLibrary(){
    let arrayLength = myLibrary.length;
    for(let i = 0; i < arrayLength; i++){
        
    }
};

let bookTitle = document.getElementById("bookTitle");
let bookAuthor = document.getElementById("bookAuthor");
let bookPages = document.getElementById("bookPages");
let bookStatus = document.getElementById("bookStatus");

let modal = document.getElementById("modal");
let addBtn = document.getElementById("addBtn");
let closeBtn = document.getElementsByClassName("close")[0];


function displayModal(){
    modal.style.display = "block";
};

function hideModal(){
    modal.style.display = "none";
};

addBtn.addEventListener("click",displayModal);
closeBtn.addEventListener("click",hideModal);

window.onclick = function(e){
    if(e.target == modal){
        modal.style.display = "none";
    }
};
