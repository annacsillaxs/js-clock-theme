const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const toggle = document.querySelector('.toggle');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let time = new Date();

let myRules = document.styleSheets[0].cssRules;
let keyframeHour = myRules[16];
let keyframeMin = myRules[17];
let keyframeSec = myRules[18];

toggle.addEventListener('click', (e) => {
  const html = document.querySelector('html');

  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    e.target.innerHTML = 'Light mode';
  } else {
    html.classList.add('dark');
    e.target.innerHTML = 'Dark mode';
  }
})

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function setDate() {
  time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  
  return dateEl.innerHTML = `${days[day]}, ${months[month]}, <span class="circle">${date}</span>`;
}

function getHours() {
  return hour = time.getHours();
}

function getMin() {
  return min = time.getMinutes();
}

function getSec() {
 return sec = time.getSeconds();
}

function setTime() {
  time = new Date();
  hour = getHours();
  min = getMin();

  return timeEl.innerHTML =  `${hour}:${min < 10 ? `0${min}` : min}`;
}

function setHourNeedle(hour) {
  hour = getHours();
  const hoursForClock = hour % 12;

  keyframeHour.appendRule(`from {transform:  rotate(${scale(hoursForClock, 0, 12, 0, 360)+180}deg);}`);
  keyframeHour.appendRule(`to {transform:  rotate(${scale(hoursForClock, 0, 12, 0, 360)+540}deg);}`);
}

function setMinNeedle(min) {
  min = getMin();

  keyframeMin.appendRule(`from {transform:  rotate(${scale(min, 0, 60, 0, 360)+180}deg);}`);
  keyframeMin.appendRule(`to {transform:  rotate(${scale(min, 0, 60, 0, 360)+540}deg);}`);
}

function setSecNeedle(sec) {
  sec = getSec();

  keyframeSec.appendRule(`from {transform:  rotate(${scale(sec, 0, 60, 0, 360)+180}deg);}`);
  keyframeSec.appendRule(`to {transform:  rotate(${scale(sec, 0, 60, 0, 360)+540}deg);}`);

}

setHourNeedle()
setMinNeedle()
setSecNeedle()

function updateTime() {
  setDate();
  setTime();
  console.log('object')
}

updateTime();

setInterval(updateTime, 1000);