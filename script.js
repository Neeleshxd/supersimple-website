document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task');
    const hoursInput = document.getElementById('hours');
    const priorityInput = document.getElementById('priority');
    const reminderInput = document.getElementById('reminder');
    const dueDateInput = document.getElementById('due-date'); // Get the due date input field
    const addTaskButton = document.getElementById('add-task');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const taskList = document.getElementById('task-list');
  
    let todoList = []; // Initialize the to-do list array
  
    // Event listener for the "Add" button
    addTaskButton.addEventListener('click', function () {
      const task = taskInput.value.trim();
      const hours = hoursInput.value.trim();
      const priority = priorityInput.value;
      const reminder = reminderInput.value.trim();
      const dueDate = dueDateInput.value.trim(); // Get the value of the due date input field
  
      if (task !== '') {
        // Create a new task item object with the due date
        const taskItem = {
          task: task,
          hours: hours,
          priority: priority,
          reminder: reminder,
          dueDate: dueDate // Add the due date to the task item object
        };
  
        // Add the task item to the to-do list
        todoList.push(taskItem);
  
        // Display the updated to-do list
        displayItems();
  
        // Clear input fields
        taskInput.value = '';
        hoursInput.value = '';
        priorityInput.value = 'high';
        reminderInput.value = '';
        dueDateInput.value = ''; // Clear the due date input field
      }
    });
  
    // Event listener for the "Toggle Dark Mode" button
    darkModeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
    });
  
    function displayItems() {
      taskList.innerHTML = '';
      for (let i = 0; i < todoList.length; i++) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item', todoList[i].priority);
        taskItem.innerHTML = `
          <span>${todoList[i].task} (Time: ${todoList[i].hours} hours)</span>
          <button class="delete-button">Delete</button>
        `;
        if (todoList[i].reminder !== '') {
          const reminderText = document.createElement('p');
          reminderText.classList.add('reminder-text');
          reminderText.textContent = `Reminder: ${new Date(todoList[i].reminder).toLocaleString()}`;
          taskItem.appendChild(reminderText);
        }
        if (todoList[i].dueDate !== '') { // Add the due date to the task item if it exists
          const dueDateText = document.createElement('p');
          dueDateText.classList.add('due-date');
          dueDateText.textContent = `Due date: ${new Date(todoList[i].dueDate).toLocaleDateString()}`;
          taskItem.appendChild(dueDateText);
        }
        const deleteButton = taskItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
          todoList.splice(i, 1);
          displayItems();
        });
        taskList.appendChild(taskItem);
      }
    }
  
    displayItems();
  });