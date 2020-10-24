const slots = ['first', 'second', 'third'];
const users = [
  { id: 1, name: 'moe', slot: 'first', selected: false },
  { id: 2, name: 'larry', slot: 'second', selected: false },
  { id: 3, name: 'curly', slot: 'third', selected: false },
  { id: 4, name: 'lucy', slot: 'third', selected: true },
];

const lists = document.getElementById('lists');

function selectUser(user) {
  const toggle = users.find((_user) => _user.name === user);
  toggle.selected = !toggle.selected;
}

function placeItems(user) {
  const userSlot = user.slot;
  const element = document.getElementById(user.slot);
  const person = document.createElement('li');
  person.classList.add('person');
  person.setAttribute('id', user.name);
  if (user.selected) {
    person.classList.add('selected');
  }
  person.innerHTML = user.name;
  element.childNodes[7].appendChild(person);
}

function shiftUsers(button) {
  const slot = [...button.classList][0];
  const direction = [...button.classList][1];
  const items = [...button.parentNode.childNodes[7].childNodes].map(
    (item) => item.innerHTML
  );
  items.forEach((item) => {
    if (users.find((user) => user.name === item).selected === true) {
      if (direction === 'left') {
        const selectedUser = users.find((user) => user.name === item);
        selectedUser.slot = slots[slots.indexOf(selectedUser.slot) - 1];
        const toBeDeleted = document.getElementById(item);
        toBeDeleted.parentNode.removeChild(toBeDeleted);
        placeItems(users.find((user) => user.name === item));
      } else if (direction === 'right') {
        const selectedUser = users.find((user) => user.name === item);
        selectedUser.slot = slots[slots.indexOf(selectedUser.slot) + 1];
        const toBeDeleted = document.getElementById(item);
        toBeDeleted.parentNode.removeChild(toBeDeleted);
        placeItems(users.find((user) => user.name === item));
      }
    }
  });
}

lists.addEventListener('click', function (ev) {
  const button = ev.target;
  const classList = [...button.classList];
  if (classList.includes('person')) {
    if (classList.includes('selected')) {
      button.classList.remove('selected');
      selectUser(button.innerHTML);
    } else {
      button.classList.add('selected');
      selectUser(button.innerHTML);
    }
  } else if (classList.includes('shifter')) {
    shiftUsers(button);
  }
});

users.forEach((user) => {
  placeItems(user);
});
