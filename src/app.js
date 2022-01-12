const path = require("path");
const express = require("express")
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Set up Handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("/help", (req,res) => {
    res.render("help", {
        title: "Help Page",
        name: "Rafiq Kamal",
        helpText: "This is some helpful text.",
    })
})

app.get("/about", (req,res) => {
    res.render("about", {
        title: "About Me",
        name: "Rafiq Kamal"
    })
})

app.get("", (req, res) => {
    res.render("index", {
        title:"Weather App",
        name: "Rafiq Kamal"
    })
})

app.get("/weather",(req,res) => {
    if (!req.query.address) {
        return res.send({
            error:"Please provide a location with your search."
        })
    }

    const location = req.query.address;

    geocode(location, (error,{longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(longitude,latitude,(error, {text,temp,feelsLike,icon,currentTime} = {}) => {
            if (error) {
                return res.send({ error })
            }

            res.send( {
                text: text,
                temp: temp,
                location: location,
                address: req.query.address,
                feelsLike,
                icon,
                currentTime
            });
        })
    })

})

app.get("/products",(req,res) => {
    if (!req.query.search) {
        return res.send({
            error:"You must provide a search term"
        })
    }

    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get("/help/*", (req, res) => {
    res.render("404error", {

        generalMessage:"Help article not found",
        title:"404",
        name:"Rafiq Kamal",
    })
})

app.get("*", (req, res) => {
    res.render("404error", {

        generalMessage:"Aww Snap! That don't work",
        title:"404",
        name:"Rafiq Kamal",
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})