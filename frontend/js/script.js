const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task'); // busca o valor que foi adicionado ao campo input-task

// busca todas as tasks no banco de dados
const fetchTasks = async () => { // utiliza função assincrona pois não se sabe quanto tempo de retorno do banco de dados
    const response = await fetch('http://localhost:3333/tasks');
    const tasks = await response.json();
    return tasks;
}

// adiciona tasks ao clicar no "+" e inserir o nome da task
const addTask = async (event) => {
    event.preventDefault(); // cancela o recarregamento da página quando é enviado um submit

    const task = { title: inputTask.value }; // objeto task que tem como title o valor que foi escrito no campo input-task
    // espera a chamada desse endpoint e informa o método(verbo) post
    await fetch('http://localhost:3333/tasks', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }, // os dados serão tratados como json
        body: JSON.stringify(task),
    });

    loadTasks(); // recarrega a página, atualiza a lista de tasks
    inputTask.value = ''; // limpa o campo de input
}

// deleta tasks ao clicar no botão de deletar
const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete',
    });

    loadTasks(); // recarrega a página depois que uma task é deletada
}

const updateTask = async (task) => {
    // recorta cada item de dentro do objeto task
    const { id, title, status } = task;
    
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, status: status }),
    });
    
    loadTasks();
}

// formata o tipo de data das tasks
const formatDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short' };
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    return date;
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
/* const task = {
    id: 1,
    title: 'Pescar lagosta',
    created_at: '30 maio de 2023 11:11',
    status: 'pendente'
}; */

const createRow = (task) => {
    // recortando esses campos do objeto task
    const { id, title, created_at, status } = task;

    const tr = createElement('tr'); // envia para função createElement que cria os elementos HTML 
    const tdTitle = createElement('td', title); // Passe o tipo de tag HTML como parâmetro
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);
    /* o target dentro da função anônima recebe o responsável(select) por ativar o eventListener
    o valor do select será passado como parâmetro para o status */
    select.addEventListener('change', ({ target }) => updateTask({ id, title, status: target.value}));
    
    // criando os button do HTML
    const editButton = createElement('button', '', '<span class="material-symbols-rounded">edit_note</span>');
    editButton.classList.add('btn-action'); // adiciona a class do css no button
    const deleteButton = createElement('button', '', '<span class="material-symbols-rounded">delete</span>');
    deleteButton.classList.add('btn-action');
    // função anônima que recebe a função deleteTask, serve para passar o id ao clicar no botão
    deleteButton.addEventListener('click', () => {deleteTask(id)}); 

    // cria um mini formulário para fazer a edição dos textos
    const editForm = createElement('form');
    const editInput = createElement('input');
    
    editInput.value = title; // preenche o input que será criado com o valor da task vigente
    editForm.appendChild(editInput);
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        updateTask({ id: id, title: editInput.value, status: status });
    })
    
    editButton.addEventListener('click', () => { // ouvidor de click no botão de edi
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
    })


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

    /* colocando as tags seguindo a ordem do HTML
    tr.appendChild(editButton);
    tbody.appendChild(tr); */

    return tr;
}

// busca as tasks do banco de dados e carrega na tela(HTML)
const loadTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = ''; // limpa o corpo do HTML, depois preenche com as tasks
    // para cada elemento do array o forEach vai executar a arrow function
    tasks.forEach((task) => {
        const tr = createRow(task); // task vem do parâmetro da arrow function
        tbody.appendChild(tr) // tr é a const criada a cima
    });
}


/* escutador de evento do addForm que aguarda um envio de botão tipo submit
quando receber esse envio executa a function addTask */
addForm.addEventListener('submit', addTask);
loadTasks();

