let curr_time = document.getElementById("curr-time");
let inputhour = document.getElementById("input-hour");
let inputmintue = document.getElementById("input-mintue");
let format = document.getElementById("input-format");
let add_btn = document.getElementById("add");
let list = document.getElementById("alarm-list");
let alarmSound = new Audio("ringtone-58761.mp3");
let initialHour = 0,
    initialMinute = 0,
    alarmIndex = 0;
let time = [];

function showtime(hour, minitue, second) {
    curr_time.innerHTML = `${hour} : ${minitue} : ${second}`;
}

inputhour.addEventListener("input", () => {
    inputhour.value = inputCheck(inputhour.value);
});

inputmintue.addEventListener("input", () => {
    inputmintue.value = inputCheck(inputmintue.value);
});

const appendZero = (value) => (value < 10 ? "0" + value : value);

const inputCheck = (inputValue) => {
    inputValue = parseInt(inputValue);
    if (inputValue < 10) {
        inputValue = appendZero(inputValue);
    }
    return inputValue;
};

setInterval(() => {
    let date = new Date();
    let hour = appendZero(date.getHours());
    let minitue = appendZero(date.getMinutes());
    let second = appendZero(date.getSeconds());

    showtime(hour, minitue, second);

    time.forEach((alarm, index) => {

        console.log(`${alarm.alarmhour}:${alarm.alarmminitue}`, `${hour}:${minitue}`)
        console.log(`${alarm.alarmhour}:${alarm.alarmminitue}` === `${hour}:${minitue}`)
        if (alarm.isActive) {
            
            if (`${alarm.alarmhour}:${alarm.alarmminitue}` === `${hour}:${minitue}`) {
                console.log("Sujal");
                alarmSound.play();
                alarmSound.loop = true;
            }
        }
    });
}, 1000);



let createAlarm = (alarmObj) => {
    const { id, alarmhour, alarmminitue } = alarmObj;

    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("activealarm");

    alarmDiv.setAttribute("data-id", id);
    alarmDiv.innerHTML = `<span>${alarmhour}: ${alarmminitue}</span>`;

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("center");


    let div = document.createElement('div')
    div.classList.add("center")


    checkbox.addEventListener("click", (e) => {
        if (e.target.checked) {
            startAlarm(e);
        } else {
            stopAlarm(e);
        }
    });

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<img src="Delete.svg" alt=""/>`;
    deleteButton.classList.add("delete-btn");

    deleteButton.children[0].addEventListener('click', (e) => deleteAlarm(e));
    deleteButton.addEventListener("click", (e) => deleteAlarm(e));


    div.appendChild(checkbox);
    div.appendChild(deleteButton);
    alarmDiv.appendChild(div);
    list.appendChild(alarmDiv);
}

add_btn.addEventListener("click", () => {
    if (inputhour.value == "" && inputmintue.value == "") {
        alert("Please Enter The value!!");
        return;
    }
    if (inputhour.value < 0 || inputhour.value > 24) {
        alert("Select Proper Range of Hour");
        return;
    }
    if (inputmintue.value < 0 || inputmintue.value > 60) {
        alert("Select Proper Range of Hour");
        return;
    }
    alarmIndex++;

    let alarmObj = {};
    alarmObj.id = `${alarmIndex}_${inputhour.value}_${inputmintue.value}`;
    alarmObj.alarmhour = inputhour.value;
    alarmObj.alarmminitue = inputmintue.value;
    alarmObj.isActive = false;
    // console.log(alarmObj);

    time.push(alarmObj);

    createAlarm(alarmObj);
});

const searchObject = (parameter, value) => {
    let alarmObject,
        objIndex,
        exists = false;
    console.log(parameter, value)
    time.forEach((alarm, index) => {
        if (alarm[parameter] == value) {
            exists = true;
            alarmObject = alarm;
            objIndex = index;
            return false;
        }
    });
    return [exists, alarmObject, objIndex];
};

const startAlarm = (e) => {

    console.log(e.target.parentElement.parentElement.getAttribute("data-id"));
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    console.log(exists, obj, index);
    if (exists) {
        time[index].isActive = true;
    }
    console.log(time[index].isActive);
};

const stopAlarm = (e) => {
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
        time[index].isActive = false;
        alarmSound.pause();
    }
};

const deleteAlarm = (e) => {
    console.log(e.target.parentElement.parentElement.parentElement.getAttribute("data-id"))
    let searchId = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
        e.target.parentElement.parentElement.parentElement.remove();
        time.splice(index, 1);
        alarmSound.pause();
    }
};

window.onload = () => {
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    time = [];
};

