const inputField = document.querySelector('#user-input');
const addButton = document.querySelector('#button-add');
const taskList = document.querySelector('#task-list');
const totalTaskCounter = document.querySelector('#total-task');
const doneTaskCounter = document.querySelector('#done-task');

let taskArray = [
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

addButton.addEventListener('click', () =>{
    // Agregamos la nueva tarea al arreglo
    const newtask = inputField.value;
    const timeStamp = Date.now();
    const lastTwoDigits = String(timeStamp).slice(-2);

    taskArray.push( { id:lastTwoDigits, task: newtask, complete:false} )
    inputField.value = '';

    updateTaskList();
});

function updateTaskList() {
    let html = '';
    let completedTasksCount = 0; // Inicializa el contador de tareas completadas

    for (let i of taskArray) {
        const isCompletedClass = i.complete ? 'completed' : '';

        if (i.complete) {
            completedTasksCount++; // Incrementa el contador si la tarea está completa
        }

        html += `
        <tr class="${isCompletedClass}">
            <td>${i.id}</td>
            <td>${i.task}</td>
            <td><input type="checkbox" id="check-box" style="cursor:pointer" ${i.complete ? 'checked' : ''}></td>
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

    taskList.innerHTML = html;
    totalTaskCounter.textContent = `${taskArray.length}`;
    doneTaskCounter.textContent = `${completedTasksCount}`;

    // Agrega un manejador de eventos para los botones de borrar

    function deleteTask(id) {
        const index = taskArray.findIndex((ele) => ele.id == id);
        if (index !== -1) {
            taskArray.splice(index, 1);
            updateTaskList();
            // Actualiza el contador de tareas completadas después de eliminar una tarea
            const completedTasks = taskArray.filter((task) => task.complete);
            doneTaskCounter.textContent = completedTasks.length;
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

taskList.addEventListener('change', (event) => {
    if (event.target.matches('input[type="checkbox"]')) {
        const taskId = event.target.closest('tr').querySelector('td:first-child').textContent;
        const task = taskArray.find((t) => t.id === taskId);
        
        if (task) {
            task.complete = event.target.checked;
            updateTaskList();
        }
    }
});

updateTaskList();
