// const txtAddNote = document.querySelector('.input-mission');
// const btnAddNote = document.querySelector('.btn-addMission');
// const missionlist = document.querySelector('.mission-list');

// btnAddNote.addEventListener('click', addMission);

// function addMission(e) {
//     e.preventDefault();

//const misDiv= document.createElement('div');
// misDiv.classList.add('mission-item');
// const misLi = document.createElement('li');
// misLi.classList.add('mission-define');
// misLi.innerText = txtAddNote.value;
// const btnDone = document.createElement('button');
// btnDone.className = 'miss-btn miss-done';
// const iconBtnDone = document.createElement('i');
// iconBtnDone.className = "fas fa-check";
// btnDone.appendChild(iconBtnDone);
// const btnDelete = document.createElement('button');
// btnDelete.className = 'miss-btn miss-delete';
// const iconBtnDelete = document.createElement('i');
// iconBtnDelete.className = "fas fa-trash-alt";
// btnDelete.appendChild(iconBtnDelete);
// misDiv.appendChild(misLi);
// misDiv.appendChild(btnDone);
// misDiv.appendChild(btnDelete);
//missionlist.appendChild(misDiv);
//     if (txtAddNote.value !== "") {
//         missionlist.innerHTML += `
//         <div class="mission-item">
//         <li class="mission-define">${txtAddNote.value}</li>
//         <button class="miss-btn miss-done"><i class="fas fa-check"></i></button>
//         <button class="miss-btn miss-delete"><i class="fas fa-trash-alt"></i></button>
//         </div>
//         `;

//     }


//     txtAddNote.value = "";
// }

$(document).ready(function () {

    getMissionsFromLocalStorage();

    $(".btn-addMission").click(function (e) {

        addMissionToUI($(".input-mission").val());

        addLocalStorage($(".input-mission").val());

        $(".input-mission").val("");
        
    });

});

function addMissionToUI(value) {
    var missItem = $(`<div class="mission-item"><li class="mission-define">${value}</li><button class="miss-btn miss-done"><i class="fas fa-check"></i></button><button class="miss-btn miss-delete"><i class="fas fa-trash-alt"></i></button></div>`);
    $(".mission-list").append(missItem);
    missItem.click(function (e) {

        if (e.target.classList.contains('miss-done')) {
            e.target.parentElement.classList.toggle('miss-finish');
        }

        if (e.target.classList.contains('miss-delete')) {
            deleteLocalStorege(e.target.previousElementSibling.previousElementSibling.innerText);
            e.target.parentElement.remove();
        }


    });
}

function addLocalStorage(value) {

    let missions;
    if (localStorage.getItem('missions') === null) {
        missions = [];
    } else {
        missions = JSON.parse(localStorage.getItem('missions'));
    }
    missions.push(value);
    localStorage.setItem('missions', JSON.stringify(missions));

}

function deleteLocalStorege(value) {
    let missions = JSON.parse(localStorage.getItem('missions'));
    let index = missions.indexOf(value);
    missions.splice(index, 1);
    localStorage.setItem("missions", JSON.stringify(missions));
}

function getMissionsFromLocalStorage() {
    if (localStorage.getItem('missions') !== null) {
        let missions = JSON.parse(localStorage.getItem('missions'));
        for (let mission of missions) {
            addMissionToUI(mission);
        }
    }
}