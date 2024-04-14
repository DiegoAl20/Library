const myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 295,
    }
];

// Buttons
const btnAddBook = document.getElementById('add-book');
const btnCloseModal = document.getElementById('close-modal');
const bookDialog = document.getElementById('book-dialog');
const btnSubmitModal = document.getElementById('submit-modal');
let btnStatus = document.querySelectorAll(".status");
let btnRemove = document.querySelectorAll(".delete");

// Table elements
const table = document.getElementById('table');
const tableHeader = document.getElementById('table-header');

// Form values
const bookName = document.getElementById('name');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const bookStatus = document.getElementById('status');

// agregar los event listeners una vez cargada la página
window.onload = function() {
    // Agregar evento al botón para mostrar el modal
    btnAddBook.addEventListener('click', () => {
        bookDialog.showModal();
    });

    // Agregar evento al botón para cerrar el modal
    btnCloseModal.addEventListener('click', () => {
        bookDialog.close();
    });

    // Agregar evento al botón para agregar un libro
    btnSubmitModal.addEventListener('click', addBookToLibrary);

    // Agregar evento a la tabla para manejar el click en los botones status y delete
    table.addEventListener('click', (e) => {
        if (e.target.classList.contains('status')) {
            changeStatus(e.target);
        } else if (e.target.classList.contains('delete')) {
            removeBook(e.target);
        }
    });
};

function changeStatus(target) {
    if (target.textContent === 'Unread') {
        target.textContent = 'Read';
    } else if (target.textContent === 'Read') {
        target.textContent = 'Unread';
    }
}

// Función para eliminar un libro
function removeBook(target) {
    let trTarget = target.parentElement;
    table.removeChild(trTarget);
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status ? "Read" : "Unread";
}

function createTd(book, key) {
    let td = document.createElement('td');
    td.classList.add("book");
    td.textContent = book[key];

    if (key === "status") {
        td.classList.add("status");
    }

    return td
};


function printNewBook(book) {
    const newTr = document.createElement('tr');

    for (const key in book) {
        tdReturned = createTd(book, key)
        newTr.appendChild(tdReturned)
    }

    const tdRemove = document.createElement('td')
    tdRemove.setAttribute("id", "remove")
    tdRemove.classList.add("book")
    tdRemove.classList.add("delete")
    tdRemove.textContent = "Remove"
    newTr.appendChild(tdRemove)
    table.appendChild(newTr)
}

function clearvalues() {
    bookName.value = "";
    author.value = "";
    pages.value = "";
}

function addBookToLibrary() {
    const book = new Book(bookName.value, author.value, pages.value, bookStatus.checked)
    myLibrary.unshift(book)
    printNewBook(book)
    clearvalues()
}