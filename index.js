document.addEventListener('DOMContentLoaded', () => {
    const messageEl = document.querySelector('.message-text')
    const daytimeEl = document.querySelector('.daytime-text')
    const dogeTextEl = document.querySelector('.doge-text')
    const btcTextEl = document.querySelector('.btc-text')
    const dogeImgEl = document.querySelector('.doge-img')
    const btcImgEl = document.querySelector('.btc-img')
    const timeTextEl = document.querySelector('.time-text')
    const weatherImgEl = document.querySelector('.weather-img')
    const degreeTextEl = document.querySelector('.degree-text')
    const cityTextEl = document.querySelector('.city-text')
    let lon = 1
    let lat = 0
    async function getImage(){
        try {
            const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=abstract')
            const data = await res.json()
            document.body.style.backgroundImage = `url(${data['urls']['regular']})`
            document.querySelector('.author-text').textContent = `by ${data['user']['name']}`
        }
        catch {
            document.body.style.background = 'black'
        }
    }

    getImage()

    async function getQuote() {
        try {
            const res = await fetch('https://type.fit/api/quotes')
            const data = await res.json()
            const quote = data[Math.floor(Math.random() * 16)]['text']
            messageEl.textContent = quote
        }
        catch {
            messageEl.textContent = 'Less is more.'
        }

    }
    getQuote()

    setInterval(() => {
        messageEl.classList.toggle('hidden')
        daytimeEl.classList.toggle('hidden')
    }, 5000)


    async function getdogePrice() {
        try {
            const res = await fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
            if (res.ok) {
                const data = await res.json()
                dogeTextEl.textContent = `${data['market_data']['current_price']['usd']}$`
                dogeImgEl.src = data['image']['thumb']
            }
            else {
                throw Error('Something went wrong')
            }
        }
        catch (err){
            console.log(err)
        }
    }

    async function getBtcPrice() {
        try {
            const res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
            if (res.ok) {
                const data = await res.json()
                btcTextEl.textContent = `${data['market_data']['current_price']['usd']}$`
                btcImgEl.src = data['image']['thumb']
            }
            else {
                throw Error('Something went wrong')
            }
        }
        catch (err){
            console.log(err)
        }
    }

    function getTime() {
        const date = new Date()
        const currentHour = date.getHours()
        currentHour < 12 ? daytimeEl.textContent = 'Good Morning!' : currentHour < 18 ? daytimeEl.textContent = 'Good Afternoon!' : daytimeEl.textContent = "Good Night!"
        timeTextEl.textContent = date.toLocaleTimeString('en-us', {timeStyle: 'short'})
    }

    getdogePrice()
    getBtcPrice()
    setInterval(() => {
        getTime()
    }, 1000)


  function getWeather() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
                if (res.ok) {
                    const data = await res.json()
                    weatherImgEl.src = `http://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`
                    cityTextEl.textContent = data['name']
                    degreeTextEl.textContent = `${Math.round(data['main']['temp'])}°`
                }
                else {
                    throw Error('Weather data not available.')
                }
            }
            catch(err) {
                console.log(err)
            }
            

        })
        

    }
    getWeather()

})