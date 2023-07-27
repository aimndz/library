let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  displayBooks();
}

function displayBooks() {
  const bookContainer = document.querySelector(".books-container ul");
  bookContainer.innerHTML = ""; //clear the container before iterating

  const emptyText = document.querySelector(".empty-lib");

  if (myLibrary.length) {
    emptyText.style.display = "none";

    for (let i = 0; i < myLibrary.length; i++) {
      let book = myLibrary[i];

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

  setupRemoveButtons();
  setupToggleReadButtons();
  updateBookTotal();
  updateReadTotal();
}

const addBookBtn = document.querySelector("#add-book-btn");
const addBookForm = document.querySelector(".add-book-form");
const closeFormBtn = document.querySelector("#close-form-btn");

closeFormBtn.addEventListener("click", () => {
  addBookForm.style.display = "none";
  addBookForm.reset();
});

addBookBtn.addEventListener("click", () => {
  let formDisplay = addBookForm.style.display;

  if (formDisplay === "none") {
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

  addBookToLibrary(titleInput, authorInput, pagesInput, readInput);

  addBookForm.reset();
});

function setupRemoveButtons() {
  const removeButtons = document.querySelectorAll(".book-remove");

  for (let removeButton of removeButtons) {
    removeButton.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      removeBook(index);
      displayBooks();
    });
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1);
}

function toggleReadStatus(index) {
  myLibrary[index].toggleReadStatus();
}

function setupToggleReadButtons() {
  const toggleReadButtons = document.querySelectorAll(".book-status");

  for (let toggleButton of toggleReadButtons) {
    toggleButton.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      toggleReadStatus(index);
      displayBooks();
    });
  }
}

function updateReadTotal() {
  let read = 0;
  let unread = 0;

  for (let book of myLibrary) {
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

function updateBookTotal() {
  const bookTotal = document.querySelector(".book-total-num");
  bookTotal.textContent = myLibrary.length;
}
