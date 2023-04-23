const tbody = document.querySelector('tbody');

// busca todas as tasks no banco de dados
const fetchTasks = async () => { // utiliza função assincrona pois não se sabe quanto tempo de retorno do banco de dados
    const response = await fetch('http://localhost:3333/tasks');
    const tasks = await response.json();
    return tasks;
}

// função que recebe uma tag HTML como parâmentro e retorna um elemento HTML
const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);

    if (innerText) {
        element.innerText = innerText;
    }
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
}

const createSelect = (value) => {
    const options = `
        <option value="pendente">Pendente</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Concluída">Concluída</option>
    `;

    const select = createElement('select', '', options);
    select.value = value;
    
    return select;
}

// objeto exemplo para fins de testes
const task = {
    id: 1,
    title: 'Pescar lagosta',
    created_at: '30 maio de 2023 11:11',
    status: 'pendente'
};

const createRow = (task) => {
    // recortando esses campos do objeto task
    const { id, title, created_at, status } = task;

    const tr = createElement('tr'); // envia para função createElement que cria os elementos HTML
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', created_at);
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);

    // criando os button do HTML
    const editButton = createElement('button', '', '<span class="material-symbols-rounded">edit_note</span>');
    editButton.classList.add('btn-action'); // adiciona a class do css no button
    const deleteButton = createElement('button', '', '<span class="material-symbols-rounded">delete</span>');
    deleteButton.classList.add('btn-action');

    // monta o campo select na coluna(td) Status
    tdStatus.appendChild(select);
    
    // colocando os button dentro da tag HTML td 
    tdActions.appendChild(editButton); // monta o edit button na coluna(td) de ações
    tdActions.appendChild(deleteButton); // monta o delete button na coluna(td) de ações
    
    // colocando os elementos dentro da tag HTML tr
    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    tbody.appendChild(tr); // chama todos os elementos e coloca no corpo HTML


    /* colocando as tags seguindo a ordem do HTML
    tr.appendChild(editButton);
    tbody.appendChild(tr); */

}

createRow(task);
