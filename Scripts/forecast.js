class Forecast {
    constructor() {
        this.key = 'ljZjn1WEkqJM6lyComZkvgv0Cg4lmHEL';
        this.weatherURL = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURL = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city) {
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);

        return { cityDetails, weather };
        // cityDetails: cityDetails,
            // weather: weather
    }
    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURL + query);
        const data = await response.json();

        return data[0];
    }
    async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}&alias=--`;
    const response = await fetch(this.cityURL + query);
    
    if (!response.ok) {
        throw new Error(`Error fetching city data for ${city}: ${response.statusText}`);
    }

    const data = await response.json();
    return data[0];
}
}
