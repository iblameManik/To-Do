document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task));
        updateTask();
        updateStats();
    }
})

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTask();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTask();
    updateStats();
    saveTasks()
};

const deleteTask = (index) =>{
    tasks.splice(index,1);
    updateTask();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    tasks.splice(index,1);
    updateTask();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    const progressBar = document.getElementById('progress');
    const numbersDisplay = document.getElementById('numbers');

    
    if (totalTasks === 0) {
        progressBar.style.width = "0%";
        numbersDisplay.innerText = "0 / 0";
    } else {
        const progress = (completeTasks / totalTasks) * 100;
        progressBar.style.width = `${progress}%`;
        numbersDisplay.innerText = `${completeTasks} / ${totalTasks}`;
    }
    if(tasks.length && totalTasks===completeTasks){
        blastConfetti();
    }
};

const updateTask = () => {
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onClick="editTask(${index})" alt="edit">
                    <img src="./img/bin.png" onClick="deleteTask(${index})" alt="delete">
                </div>
            </div>
        `;

        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault();
    addTask()
})

const blastConfetti = ()=>{
    const duration = 15 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}

