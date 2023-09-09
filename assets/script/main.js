let getUserInput = document.querySelector('#user-input');
const getAddButton = document.querySelector('#button-add');
const getList = document.querySelector('#task-list');
const taskCounter = document.querySelector('#total-task');
const taskDone = document.querySelector('#done-task');

let userArray = [
    {id:'Task-01',
     task: 'Comprar tomates',   
     complete:false
    },
    {id:'Task-02 ',
     task: 'Llamar a mi mama urgente!',   
     complete:false
    },
    {id:'Task-03',
     task: 'Comprar las medicinas para la operación',
     complete:false
    },
];

getAddButton.addEventListener('click', () =>{
    // Agregamos la nueva tarea al arreglo
    const newtask = getUserInput.value;
    const timeStamp = Date.now();
    const lastTwoDigits = String(timeStamp).slice(-2);

    userArray.push( { id:lastTwoDigits, task: newtask, complete:false} )
    getUserInput.value = '';

    updateTaskList();
});

function updateTaskList() {
    let html = '';
    for (let i of userArray) {
        html += `
        <tr>
            <td>${i.id}</td>
            <td>${i.task}</td>
            <td><input type="checkbox" id="check-box" style="cursor:pointer"></td>
            <td>
                <button data-id="${i.id}" class="delete-button"
                 style="background: none;
                 border: 0;
                 color: inherit;">
                 <i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
        `;
    }
    getList.innerHTML = html;

    taskCounter.textContent = `${userArray.length}`;

    // Agrega un manejador de eventos para los botones de borrar

    function deleteTask(id) {
        const index = userArray.findIndex((ele) => ele.id == id);
        if (index !== -1) {
            userArray.splice(index, 1);
            updateTaskList();
            // Actualiza el contador de tareas completadas después de eliminar una tarea
            const completedTasks = userArray.filter((task) => task.complete);
            taskDone.textContent = completedTasks.length;
        }
    }
    
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const taskId = event.currentTarget.getAttribute('data-id');
            deleteTask(taskId);
        });
    });
}

getList.addEventListener('change', (event) => {
    if (event.target.matches('input[type="checkbox"]')) {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const completedTasks = Array.from(checkboxes).filter((checkbox) => checkbox.checked);
        taskDone.textContent = completedTasks.length;
    }
});

updateTaskList();
