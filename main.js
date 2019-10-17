// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const storedBooks = Store.getBooks();
    storedBooks.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const bookList = document.getElementById('book-list');
    const listItem = document.createElement('tr');
    listItem.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>
        <a class="btn-floating btn-small waves-effect waves-light red btn-delete">
        <i class="material-icons">delete</i></a>
      </td>
    `;
    bookList.appendChild(listItem);
  }

  static removeBook(el) {
    el.parentElement.parentElement.parentElement.remove();
  }

  static clearInputFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Store Class: Handle Storage
class Store {
  static getBooks() {
    const storedBooks = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
    return storedBooks;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Storage
window.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#btn-add').addEventListener('click', () => {
  // Get value
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Validate
  if (title === '' || author === '' || isbn === '') {
    alert('Please fill in all fields');
  } else {
    // Create new book
    const newBook = new Book(title, author, isbn);

    // Add new book to UI
    UI.addBookToList(newBook);

    // Add book to storage
    Store.addBook(newBook);

    // Clear Input Fields
    UI.clearInputFields();
  }
})

// Event: Delete a Book
document.querySelector('#book-list').addEventListener('click', e => {
  if(e.target.textContent === 'delete') {
    UI.removeBook(e.target);
    const isbn = e.target.parentElement.parentElement.previousElementSibling.textContent;
    Store.removeBook(isbn);
  }
})