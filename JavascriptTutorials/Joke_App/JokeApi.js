class JokeApi {
    constructor() {
        this.baseUrl = "https://api.chucknorris.io",
            this.axiosObject = axios.create({
                baseURL: this.baseUrl,
            });
    }

    async getJoke(){
        try {
            const response = await this.axiosObject.get('/jokes/random');
            return response.data.value;    
        } catch (error) {
            console.log(error);
        }
    }
}