//adding of elements using form

const form = document.querySelector('#item-form');
const list = document.querySelector('#item-list');
const itemInput = document.querySelector('#item-input');
const clearButton = document.querySelector('#clear');
const filter = document.querySelector('#filter');
const container = document.querySelector('.container');
let isEditMode = false;
const formBtn = form.querySelector('button');

function displayItemsFromLocalStorage() {
  const storageArray = getStorageArray();
  storageArray.forEach((item) => addtoDOM(item));
  checkUI();
}

function onSubmit(e) {
  //preventing the submission of a form
  e.preventDefault();

  //alerting for empty value
  if (itemInput.value.trim() === '') {
    alert('Please enter a Value');
    return;
  }
  if (isEditMode) {
    const itemToEdit = list.querySelector('.edit-mode');
    removeFromLocalStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    removeFromDOM(itemToEdit);
    isEditMode = false;
  } else {
    if (itemExists(itemInput.value)) {
      alert('Item already Exists in the list');
      return;
    }
  }
  //adds to the page
  addtoDOM(itemInput.value);

  //adds to the localStorage
  addToStorage(itemInput.value);

  checkUI();

  itemInput.value = '';
}

function itemExists(item) {
  const itemsFromStorage = getStorageArray();
  return itemsFromStorage.includes(item);
}

function addtoDOM(item) {
  //creating the elements
  const li = document.createElement('li');
  const text = document.createTextNode(item);
  const button = document.createElement('button');
  button.className = 'remove-item btn-link text-red';
  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';

  //appending the elements
  button.appendChild(icon);
  li.appendChild(text);
  li.appendChild(button);
  list.appendChild(li);
}

//adding to the local storage

function addToStorage(item) {
  //creating the storage array
  const storageArray = getStorageArray();
  //push the current item in the storage array
  storageArray.push(item);
  //set the local storage to the storage array by strigifying it
  localStorage.setItem('items', JSON.stringify(storageArray));
}

function getStorageArray() {
  let storageArray;
  //if nothing in the local storage, set the array as empty
  if (localStorage.getItem('items') === null) {
    storageArray = [];
    //else you add the item into the storage array by parsing it
  } else {
    storageArray = JSON.parse(localStorage.getItem('items'));
  }
  return storageArray;
}

//removing using the cross-button
function removeFromDOM(item) {
  //removed from DOM
  item.remove();
  checkUI();
}
function removeFromLocalStorage(item) {
  let storageArr = getStorageArray();
  storageArr = storageArr.filter((i) => i !== item);
  console.log(storageArr);
  localStorage.setItem('items', JSON.stringify(storageArr));
}
function clickOnElement(e) {
  if (e.target.tagName === 'I') {
    removeFromDOM(e.target.parentElement.parentElement);
    removeFromLocalStorage(e.target.parentElement.parentElement.textContent);
  } else if (e.target.tagName === 'BUTTON') {
    removeFromDOM(e.target.parentElement);
    removeFromLocalStorage(e.target.parentElement.textContent);
  } else {
    isEditMode = true;
    const items = list.querySelectorAll('li');
    items.forEach((i) => i.classList.remove('edit-mode'));
    e.target.classList.add('edit-mode');
    formBtn.style.backgroundColor = 'green';
    formBtn.innerHTML = `<i class="fa-solid fa-pencil"></i> Update Item`;
    itemInput.value = e.target.textContent;
  }
}
//removing every element using the clearAll button
function removeAll() {
  if (confirm('Are you sure?!')) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    localStorage.removeItem('items');
    checkUI();
  }
}

function checkUI() {
  const items = list.querySelectorAll('li');
  if (items.length === 0) {
    filter.remove();
    clearButton.remove();
  } else if (items.length > 0) {
    container.appendChild(filter);
    container.appendChild(clearButton);
  }

  formBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
  formBtn.style.backgroundColor = 'black';
  isEditMode = false;
}

function onInput(e) {
  const value = e.target.value.toLowerCase();
  const items = list.querySelectorAll('li');
  items.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.includes(value)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

filter.addEventListener('input', onInput);
clearButton.addEventListener('click', removeAll);
list.addEventListener('click', clickOnElement);
form.addEventListener('submit', onSubmit);
document.addEventListener('DOMContentLoaded', displayItemsFromLocalStorage);

checkUI();
