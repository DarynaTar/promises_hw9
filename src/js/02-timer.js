import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputTargetDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let targetDate = null;
let timer = null;

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function updateTime() {
    const date = new Date();
    const dateMs = date.getTime();
    const timeDifference = targetDate - dateMs;
  
    if (timeDifference <= 0) {
        clearInterval(timer);
        days.textContent= "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
        return;
    }
  
    const timeObj = convertMs(timeDifference);
    days.textContent = timeObj.days < 10 ? `0${timeObj.days}` : timeObj.days
    hours.textContent = timeObj.hours < 10 ? `0${timeObj.hours}` : timeObj.hours;
    minutes.textContent = timeObj.minutes < 10 ? `0${timeObj.minutes}` : timeObj.minutes;
    seconds.textContent = timeObj.seconds < 10 ? `0${timeObj.seconds}` : timeObj.seconds;
}

startBtn.addEventListener("click", () => {
    timer = setInterval(updateTime, 1000);
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();
        
        if (selectedDate <= currentDate) {
            Notify.failure('Please choose a date in the future!');
            console.log('Please choose a date in the future')
            startBtn.setAttribute('disabled', true);
        } else {
            startBtn.removeAttribute('disabled');
            targetDate = selectedDate.getTime();
            updateTime();
        }
    },
};

flatpickr(inputTargetDate, options);








