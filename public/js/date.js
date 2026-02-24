// Data final: 6 de Abril de 2026 às 06:30
const finalDate = new Date("2026-04-26T06:30:00");

const dayElement = document.getElementById('day');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

function updateCountdown() {
    const now = new Date();
    const difference = finalDate - now;

    if (difference <= 0) {
        clearInterval(interval);
        dayElement.innerText = "00";
        hoursElement.innerText = "00";
        minutesElement.innerText = "00";
        secondsElement.innerText = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    dayElement.innerText = String(days).padStart(2, '0');
    hoursElement.innerText = String(hours).padStart(2, '0');
    minutesElement.innerText = String(minutes).padStart(2, '0');
    secondsElement.innerText = String(seconds).padStart(2, '0');
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();