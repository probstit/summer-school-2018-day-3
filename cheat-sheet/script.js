fetch('/notes').then(resp => resp.json()).then(notes => {
  console.log(notes);

  let container = document.querySelector('#wrapper');
  console.log(container);
  let list = document.createElement('ul');
  container.appendChild(list);
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    let item = document.createElement('li');
    item.textContent = note.message;
    list.appendChild(item);
  }
})
