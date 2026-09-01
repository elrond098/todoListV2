export function displayctnr(params, onDelete) {
  const main = document.getElementById('list');
  main.innerHTML = '';
  params.forEach((ctnr) => {
    const li = document.createElement('li');
    li.textContent = ctnr.countained_name;
    li.className = ctnr.id;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => onDelete(ctnr.id));

    main.appendChild(li);
    li.appendChild(deleteButton)
  })
}
