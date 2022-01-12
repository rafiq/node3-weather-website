const weatherForm = document.querySelector("form")
const search = document.querySelector("input");
const messageOne  = document.querySelector("#message-1")
const messageTwo  = document.querySelector("#message-2")
const messageZero  = document.querySelector("#message-0")
const icon = document.querySelector("#icon");

weatherForm.addEventListener("submit",(e) => {
    e.preventDefault()
    const location = search.value

    messageZero.textContent = "";
    messageOne.textContent = "Loading..."
    messageTwo.textContent = "";

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = "Captain. There's a problem...We just don't have the power!";
                messageTwo.textContent = data.error;
            }

            icon.setAttribute("src",data.icon)
            messageOne.textContent = data.text;
            messageZero.textContent = `The current time in ${location} is ${data.currentTime}
            `
            messageTwo.textContent = `You searched for ${location}, and your search resulted with ${data.location}. The temperature in ${location} feels like ${data.feelsLike}`
        })
    })
})