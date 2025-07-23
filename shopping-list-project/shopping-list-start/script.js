//adding of elements using form

const form = document.querySelector('#item-form');
const list = document.querySelector('#item-list');
const itemInput = document.querySelector('#item-input');
const clearButton = document.querySelector('#clear');
const items = list.querySelectorAll('li');

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
}

//removing every element using the clearAll button
function removeAll() {
  items.forEach((item) => item.remove());
}

clearButton.addEventListener('click', removeAll);
list.addEventListener('click', Delete);
form.addEventListener('submit', onSubmit);
