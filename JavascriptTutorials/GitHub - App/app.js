const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-user");
const gitHub = new Github();
const ui = new UI();

eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit", getUserInfo);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched)
}

function getUserInfo(e) {
    let username = nameInput.value.trim();
    if (username === "") {
        alert("Fill user name...")
    } else {
        gitHub.getUserData(username)
            .then(response => {
                if (response.user.message === "Not Found") {
                    ui.showAlert("info","User not found")
                } else {
                    ui.addSearchedUserUI(username);
                    Storage.addSearcedUsersToStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showUserRepos(response.userRepo);
                    
                }

            })
            .catch(err => ui.showAlert("danger",err));
    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched() {
    if (confirm("Are you sure that?")) {
        Storage.clearAllSearchedFromStorage();
        ui.clearAllSearchedFromUI();
    }
 
}

function getAllSearched() {
    let users = Storage.getSearcedUsersFromStorage();
    users.forEach(element => {
        ui.addSearchedUserUIContentLoad(element);
    });
}