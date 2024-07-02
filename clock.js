setInterval(showClock, 1000);
showDate();

function showClock() {
    function addZero(i) {
        if(i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function twelveHour(i) {
        if(i >= 12) {
            i = i - 12;
        }
        return i;
    }

    const time = new Date();
    const minute = addZero(time.getMinutes());
    //const second = addZero(time.getSeconds());
    const timeDisplay = document.getElementById("clockDisplay");

    if(time.getHours() >= 12) {
        const hour = addZero(twelveHour(time.getHours()));
        timeDisplay.textContent = hour + ":" + minute + " PM";
    }
    else {
        timeDisplay.textContent = hour + ":" + minute + " AM";
    }
}

function showDate() {
    const date = new Date();
    const day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const year = date.getFullYear();
    const dateDisplay = document.getElementById("dateDisplay");

    dateDisplay.textContent = day[date.getDay()] + " " + month[date.getMonth()] + " " + date.getDate() + ", " + year;
}