class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // create element
    const row = document.createElement("tr");
    // insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add textNode
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container"); // container
    const form = document.querySelector("#book-form"); //get form
    container.insertBefore(div, form); //insert alert

    // time out
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
      return true;
    } else {
      return false;
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Event Listener
document.getElementById("book-form").addEventListener("submit", function (e) {
  // get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiating book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();
  // Validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert("Book Added!", "success");
  }

  ui.clearFields();

  e.preventDefault();
});

// EventListener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  // Instantiate ui
  const ui = new UI();
  if (ui.deleteBook(e.target)) {
    ui.showAlert("Book Removed!", "success");
  }

  e.preventDefault();
});
