console.log("message is loaded");


const weatherForm = document.querySelector("form")
const search = document.querySelector("input");
const messageOne  = document.querySelector("#message-1")
const messageTwo  = document.querySelector("#message-2")


weatherForm.addEventListener("submit",(e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = "";

    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = "Captain. There is a problem.";
                messageTwo.textContent = data.error;
            }

            messageOne.textContent = data.text;
            messageTwo.textContent = `You searched for ${location}, and your search resulted with ${data.location}. The temperature in ${location} is ${data.temp}`
        })
    })
})