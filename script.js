const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const toggle = document.querySelector('.toggle');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const hoursForClock = hours % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';


  keyframeHour.appendRule(`from {transform:  rotate(${scale(hoursForClock, 0, 12, 0, 360)+180}deg);}`);
  keyframeHour.appendRule(`to {transform:  rotate(${scale(hoursForClock, 0, 12, 0, 360)+540}deg);}`);

  keyframeMin.appendRule(`from {transform:  rotate(${scale(minutes, 0, 60, 0, 360)+180}deg);}`);
  keyframeMin.appendRule(`to {transform:  rotate(${scale(minutes, 0, 60, 0, 360)+540}deg);}`);

  keyframeSec.appendRule(`from {transform:  rotate(${scale(seconds, 0, 60, 0, 360)+180}deg);}`);
  keyframeSec.appendRule(`to {transform:  rotate(${scale(seconds, 0, 60, 0, 360)+540}deg);}`);

  timeEl.innerHTML =  `${hours}:${minutes < 10 ? `0${hours}` : minutes} ${ampm}`;
  dateEl.innerHTML = `${days[day]}, ${months[month]}, <span class="circle">${date}</span>`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setTime();