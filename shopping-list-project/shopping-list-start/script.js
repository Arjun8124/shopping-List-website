//adding of elements using form

const form = document.querySelector('#item-form');
const list = document.querySelector('#item-list');
const itemInput = document.querySelector('#item-input');
const clearButton = document.querySelector('#clear');
const filter = document.querySelector('#filter');
const container = document.querySelector('.container');

function onSubmit(e) {
  //preventing the submission of a form
  e.preventDefault();

  //alerting for empty value
  if (itemInput.value.trim() === '') {
    alert('Please enter a Value');
    return;
  }

  //creating the elements
  const li = document.createElement('li');
  const text = document.createTextNode(itemInput.value);
  const button = document.createElement('button');
  button.className = 'remove-item btn-link text-red';
  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';

  //appending the elements
  button.appendChild(icon);
  li.appendChild(text);
  li.appendChild(button);
  list.appendChild(li);

  checkUI();

  itemInput.value = '';
}

//removing using the cross-button

function Delete(e) {
  if (e.target.tagName === 'I') {
    const button = e.target.parentElement;
    const li = button.parentElement;
    li.remove();
  } else if (e.target.tagName === 'BUTTON') {
    const li = e.target.parentElement;
    li.remove();
  }
  checkUI();
}

//removing every element using the clearAll button
function removeAll() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  checkUI();
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
list.addEventListener('click', Delete);
form.addEventListener('submit', onSubmit);

checkUI();
