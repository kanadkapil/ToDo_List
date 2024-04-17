const taskInput = document.getElementById('taskInput');
const taskTable = document.getElementById('taskTable');

// Function to add task to table
function addTaskToTable(data) {
    const newRow = taskTable.insertRow();
    
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    
    cell1.innerHTML = data.text;
    cell2.innerHTML = '<button onclick="editTask(\'' + data._id + '\', this)" class="btn btn-info">Edit</button>';
    cell3.innerHTML = '<button onclick="removeTask(\'' + data._id + '\', this)" class="btn btn-danger">Done</button>';
}

// Function to add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: taskText })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add task');
            }
            return response.json();
        })
        .then(data => {
            addTaskToTable(data);
            taskInput.value = '';
        })
        .catch(error => {
            console.error('Error adding task:', error);
            alert('Failed to add task. Please try again.');
        });
    } else {
        alert('Please enter a valid task!');
    }
}

// Function to edit task
function editTask(id, element) {
    const row = element.parentElement.parentElement;
    const cells = row.getElementsByTagName('td');
    const newText = prompt('Edit task:', cells[0].textContent.trim());
    if (newText !== null && newText.trim() !== '') {
        fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newText })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to edit task');
            }
            return response.json();
        })
        .then(data => {
            cells[0].textContent = data.text;
        })
        .catch(error => {
            console.error('Error editing task:', error);
            alert('Failed to edit task. Please try again.');
        });
    }
}

// Function to remove task
function removeTask(id, element) {
    fetch(`/tasks/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        const row = element.parentElement.parentElement;
        row.remove();
    })
    .catch(error => {
        console.error('Error removing task:', error);
        alert('Failed to remove task. Please try again.');
    });
}


