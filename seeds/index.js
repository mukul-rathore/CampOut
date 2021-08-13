const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '601e037e1aa0d3036447f51f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: { 
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            images:  [
                {
                    url: 'https://res.cloudinary.com/dwj185am0/image/upload/v1612634716/YelpCamp/fn6teht9fqnukgo8wpg1.jpg',
                    filename: 'YelpCamp/fn6teht9fqnukgo8wpg1'
                },
                {
                    url: 'https://res.cloudinary.com/dwj185am0/image/upload/v1612635119/YelpCamp/ydpadrjj235tfyulbc49.jpg',
                    filename: 'YelpCamp/ydpadrjj235tfyulbc49'
                },
                {
                  url: 'https://res.cloudinary.com/dwj185am0/image/upload/v1612685872/YelpCamp/vio2iesr2s07k7xq7kmr.jpg',
                  filename: 'YelpCamp/vio2iesr2s07k7xq7kmr'
                },
                {
                  url: 'https://res.cloudinary.com/dwj185am0/image/upload/v1612685869/YelpCamp/ttzulkfsiigmeze47jd1.jpg',
                  filename: 'YelpCamp/ttzulkfsiigmeze47jd1'
                },
    {
                  url: 'https://res.cloudinary.com/dwj185am0/image/upload/v1612685869/YelpCamp/epo68sga06hxtt7sjgnm.jpg',
                  filename: 'YelpCamp/epo68sga06hxtt7sjgnm'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})