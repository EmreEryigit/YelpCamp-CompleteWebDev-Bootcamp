
const mongoose = require('mongoose');
const campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require("./seedHelpers")
mongoose.connect("mongodb://localhost:27017/yelpCamp")

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDb = async() => {
    await campground.deleteMany({});
    for(let i = 0; i<250; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()* 150) + 50
        const camp =new campground({
            author: "6283ff28abc8746735dff953",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            geometry: { 
              type : "Point", 
              coordinates : [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dwt3hsbey/image/upload/v1652907506/YelpCamp/photo-1506744038136-46273834b3fb_bczkwm.avif',
                  filename: 'YelpCamp/ed2ufytzhnb4t8bqgb8h',
                },
                {
                  url: 'https://res.cloudinary.com/dwt3hsbey/image/upload/v1652907505/YelpCamp/photo-1508739773434-c26b3d09e071_rx5prk.avif',
                  filename: 'YelpCamp/s6d6bmkseuianihymd93',
                }
              ],
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo fuga repellat corrupti necessitatibus eligendi debitis nobis nostrum, totam deleniti vitae fugit esse rem officia molestias corporis non obcaecati consequatur unde?",
            price: price


        })
        await camp.save();
    }
}
seedDb().then(() => {
    mongoose.connection.close();
})