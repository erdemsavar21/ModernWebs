class UnsplashApi {
    constructor() {
        this.baseUrl = "https://api.unsplash.com",
        this.clientId = "Client-ID 4OeluIjh4P0hC9-SWjzwecz5yiucnBlNvh9joYLBdXU",
            this.axiosObject = axios.create({
                baseURL: this.baseUrl,
                headers: {
                    Authorization: this.clientId
                }
            });
    }

    async getImage(){
        try {
            const response = await this.axiosObject.get('/photos/random');
            console.log(response);
            //return response.data.value;    
        } catch (error) {
            console.log(error);
        }
        
    }
}

//4OeluIjh4P0hC9-SWjzwecz5yiucnBlNvh9joYLBdXU
//6MI3T1Dx2pTgIU-MBi4VjpGaa3GEudoqC0t4WXYAk1E