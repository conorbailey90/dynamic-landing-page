var today = new Date;

const time = document.querySelector('.time');
const taskInput = document.querySelector('.task');
const list = document.querySelector('.task-list ul');
const submit = document.querySelector('.submit');
const taskList = document.querySelector('.task-list');
const name = document.querySelector('.name');


// Time Section

function showTime(){
    let today = new Date;

    let hour = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds();

        time.textContent = `${hour}:${addZero(minutes)}:${addZero(seconds)}`;

    setTimeout(showTime, 1000);
}

function addZero(num){
    return (num < 10 ? `0${num}` : `${num}`);
}


// Task List Section

function addTask(e){
    if (taskInput.value !== ''){
        const li = document.createElement('li');

        li.className='list-item';

        li.appendChild(document.createTextNode(taskInput.value));
    
        list.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }else{
        alert('Input is empty! Please add a task.');
    }
}

function deleteTask(e){
  if (e.target.className === 'list-item'){
    if (confirm('Are your sure you want to delete this task?')){
      e.target.remove();
      removeTaskFromLocalStorage(e.target);
    }
  }    
}


// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove from local storage

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Weather Section

function weatherBalloon( cityID ) {
  var key = '6dafd285803162612ccd76ec335d85ce';
  fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
  console.log(data);
  drawWeather(data);
   
  })
  .catch(function() {
    // catch any errors
  });
}

window.onload = function() {
  weatherBalloon( 2653266 );
}

function drawWeather (d){
  var celcius = Math.round(parseFloat(d.main.temp)-273.15);

  document.getElementById('description').innerHTML = d.weather[0].description;
  document.getElementById('temp').innerHTML = `${celcius} °C`;
  document.getElementById('location').innerHTML = d.name;

  setTimeout(weatherBalloon, 60000);
};


// Local Storage

function getName(){
  if (localStorage.getItem('name') === null){
    name.textContent = '[Enter Name]';
  }else{
    name.textContent = localStorage.getItem('name');
  }
}

// Get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
   tasks = JSON.parse(localStorage.getItem("tasks"));
  };

  tasks.forEach(function(task) {
    //Create li element
  
    const li = document.createElement("li");
    // Add class
    li.className='list-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    
    // Append the li to the ul
    taskList.appendChild(li);
  });
}

// Event Listeners
submit.addEventListener('click', addTask);

taskList.addEventListener('click', deleteTask);

name.addEventListener('blur', (e)=>{
  localStorage.setItem('name', name.innerText);
});

submit.addEventListener('click',(e)=>{
  localStorage.setItem('tasklist', JSON.stringify(list.children));
});

list.addEventListener('click', (e)=>{
  localStorage.setItem('tasklist', JSON.stringify(list.children));
});

// Run
showTime();
getName();
getTasks();

