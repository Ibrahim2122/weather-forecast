const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img'); 
const forecast = new Forecast();

const updateUI = data => {

    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    // Destructure properties
    const { cityDetails, weather } = data;

    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>    
    `;

    // update background
    const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'
    time.setAttribute('src', timeSrc);

    // update icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc)


    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }   

}

cityForm.addEventListener('submit', e => {
    // prevent defult
    e.preventDefault();

    // get city from input feild
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error));

    // save city to local storage
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(error => console.log(error));
}
