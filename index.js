class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadButtons() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pages, read) {
    this.books.push(new Book(title, author, pages, read));
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }

  toggleReadStatus(index) {
    this.books[index].toggleReadButtons();
  }

  updateReadTotal() {
    let read = 0;
    let unread = 0;

    for (let book of this.books) {
      if (book.read) {
        read++;
      } else {
        unread++;
      }
    }

    const readTotal = document.querySelector(".books-read-num");
    const unreadTotal = document.querySelector(".books-unread-num");

    readTotal.textContent = read;
    unreadTotal.textContent = unread;
  }

  updateBookTotal() {
    const bookTotal = document.querySelector(".book-total-num");
    bookTotal.textContent = this.books.length;
  }

  displayBooks() {
    const bookContainer = document.querySelector(".books-container ul");
    bookContainer.innerHTML = ""; //clear the container before iterating

    const emptyText = document.querySelector(".empty-lib");

    if (this.books.length) {
      emptyText.style.display = "none";

      for (let i = 0; i < this.books.length; i++) {
        let book = this.books[i];

        const readStatus = () => {
          return book.read ? "read" : "unread";
        };

        const bookEl = `<li>
      <div class="book" data-index="${i}">
        <div class="book-top">
          <i class="fa-solid fa-xmark book-remove" data-index="${i}"></i>
        </div>
        <div class="book-info-wrapper">
          <div>
            <span>Book Title:</span>
            <span id="book-title" class="book-title">${book.title}</span>
          </div>
          <div>
            <span>Author:</span>
            <span id="book-author" class="book-author">${book.author}</span>
          </div>
          <div>
            <span>Pages:</span>
            <span id="book-pages" class="book-pages">${book.pages} pages</span>
          </div>
          <div id="book-status" class="${readStatus()} book-status" data-index="${i}" >${readStatus()}</div>
        </div>
      </div>
    </li>`;

        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = bookEl;

        bookContainer.appendChild(tempContainer.firstChild);
      }
    } else {
      emptyText.style.display = "block";
    }

    this.setupRemoveButtons();
    this.setupToggleReadButtons();
    this.updateBookTotal();
    this.updateReadTotal();
  }

  setupRemoveButtons() {
    const removeButtons = document.querySelectorAll(".book-remove");

    for (let removeButton of removeButtons) {
      removeButton.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        this.removeBook(index);
        this.displayBooks();
      });
    }
  }

  setupToggleReadButtons() {
    const toggleReadButtons = document.querySelectorAll(".book-status");

    for (let toggleButton of toggleReadButtons) {
      toggleButton.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        this.toggleReadStatus(index);
        this.displayBooks();
      });
    }
  }
}

const library = new Library();

const addBookBtn = document.querySelector("#add-book-btn");
const addBookForm = document.querySelector(".add-book-form");
const closeFormBtn = document.querySelector("#close-form-btn");

closeFormBtn.addEventListener("click", () => {
  addBookForm.style.display = "none";
  addBookForm.reset();
});

addBookBtn.addEventListener("click", () => {
  let formDisplay = getComputedStyle(addBookForm);

  if (formDisplay.display === "none") {
    addBookForm.style.display = "block";
    const titleInputForm = document.querySelector("#title-input");
    titleInputForm.focus();
  } else {
    addBookForm.style.display = "none";
  }
});

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleInput = document.querySelector("#title-input").value;
  const authorInput = document.querySelector("#author-input").value;
  const pagesInput = document.querySelector("#pages-input").value;
  const readInput = document.querySelector("#read-input").checked;

  library.addBook(titleInput, authorInput, pagesInput, readInput);

  addBookForm.reset();

  addBookForm.style.display = "none";
  library.displayBooks();
});

library.displayBooks();
