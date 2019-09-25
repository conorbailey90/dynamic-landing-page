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

        taskInput.value = '';
    }else{
        alert('Input is empty! Please add a task.');
    }

}

function deleteTask(e){
    console.log(e.target);
    if (e.target.className === 'list-item'){
        e.target.remove();
    }
    
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

// Event Listeners
submit.addEventListener('click', addTask);
taskList.addEventListener('click', deleteTask);
name.addEventListener('blur', (e)=>{
  localStorage.setItem('name', name.innerText);
})


// Run
showTime();
getName();