class Github {
    constructor() {
        this.url = "https://api.github.com/users/";
    }

    async getUserData(userName) {
        const response = await fetch(this.url + userName);
        const responseRepos = await fetch(this.url + userName + "/repos");
        const responseUser = await response.json();
        const responseRep = await responseRepos.json();
        return { user: responseUser, userRepo: responseRep };
    }

}
