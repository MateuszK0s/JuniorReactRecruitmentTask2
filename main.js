//Get needed DOM elements
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookPriority = document.getElementById("bookPriority");
const categorySelect = document.getElementById("categorySelect");
const addBookButton = document.getElementById("addBookButton");
const booksTable = document.getElementById("booksTable");

//Books array initialization
let books = [];

//Clear table before displaying books
const clearTableRows = () => {
  while (booksTable.rows.length > 1) {
    booksTable.deleteRow(1);
  }
};

//Get books from local storage
const getBooks = () => {
  const tempBooks = localStorage.getItem("localBooks");
  if (tempBooks == null) {
    return [];
  }
  try {
    return JSON.parse(tempBooks);
  } catch (error) {
    return [];
  }
};

//Render table elements
const renderBooks = () => {
  clearTableRows();

  getBooks().map((book) => {
    const newBookRow = document.createElement("tr");
    const newBookTitle = document.createElement("td");
    const newBookAuthor = document.createElement("td");
    const newBookPriority = document.createElement("td");
    const newBookCategory = document.createElement("td");

    newBookTitle.innerHTML = book.title;
    newBookAuthor.innerHTML = book.author;
    newBookPriority.innerHTML = book.priority;
    newBookCategory.innerHTML = book.category;

    let documentFragment = document.createDocumentFragment();
    documentFragment.appendChild(newBookRow);
    newBookRow.appendChild(newBookTitle);
    newBookRow.appendChild(newBookAuthor);
    newBookRow.appendChild(newBookPriority);
    newBookRow.appendChild(newBookCategory);
    booksTable.appendChild(documentFragment);
  });
};

//Render books table at start
renderBooks();

//Handle adding a new book
addBookButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (!isValidForm()) {
    alert("Incorrect values");
    return;
  }
  updateBooks();
  clearForm();
});

//Check if all form inputs are valid
const isValidForm = () => {
  return (
    isValidLength(bookTitle.value, 1) == true &&
    isValidLength(bookAuthor.value, 3) == true &&
    isValidRange(bookPriority.value, 1, 5) == true
  );
};

//Check if form input have a proper length
const isValidLength = (stringChain, expectedLength) => {
  return stringChain.length >= expectedLength;
};

//Check if form input is beetwen given range
const isValidRange = (number, beetwen1, beetwen2) => {
  return (
    (number >= beetwen1 && number <= beetwen2) ||
    (number <= beetwen1 && number >= beetwen2)
  );
};

//Clear form after adding book to table
const clearForm = () => {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPriority.value = "";
};

//Update books on local storage
const saveBooks = (books) => {
  let savedBooks = getBooks();
  savedBooks.push(...books);
  localStorage.setItem("localBooks", JSON.stringify(savedBooks));
};

//Update and render new books table
const updateBooks = () => {
  books.length = 0;
  books.push({
    title: bookTitle.value,
    author: bookAuthor.value,
    priority: bookPriority.value,
    category: categorySelect.value,
  });

  saveBooks(books);
  renderBooks();
};
