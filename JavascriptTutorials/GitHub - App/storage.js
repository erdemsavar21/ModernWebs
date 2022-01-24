class Storage{
    
    static getSearcedUsersFromStorage(){
        let users = localStorage.getItem("searched") !== null ? JSON.parse(localStorage.getItem("searched")) : [];
        return users;
    }

    static addSearcedUsersToStorage(userName){
        let users = this.getSearcedUsersFromStorage();
        if(users.indexOf(userName) === -1){
            users.push(userName);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }

    static clearAllSearchedFromStorage(){
        localStorage.removeItem("searched");
    }
}