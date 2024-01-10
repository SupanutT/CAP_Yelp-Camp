const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random923 = Math.floor(Math.random() * 923);
        const price = Math.floor(Math.random() * 1500) + 500;
        const camp = new Campground({
            author: '659da476dfee85db545edfcd',
            location: `${cities[random923].AMPHOE_E}, ${cities[random923].CHANGWAT_E}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random923].LONG, cities[random923].LAT]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, quae. Deleniti animi, amet ducimus fuga ab facilis voluptate nisi pariatur fugit veritatis ipsa totam sapiente architecto laudantium est incidunt dolorum.',
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dgwfiyuty/image/upload/v1704888425/yelp-camp/ottgmhcl9j5rbb1yrter.jpg',
                    filename: 'yelp-camp/ottgmhcl9j5rbb1yrter'
                },
                {
                    url: 'https://res.cloudinary.com/dgwfiyuty/image/upload/v1704888426/yelp-camp/cehpwhppiph7wan1ge2y.jpg',
                    filename: 'yelp-camp/cehpwhppiph7wan1ge2y'
                },
                {
                    url: 'https://res.cloudinary.com/dgwfiyuty/image/upload/v1704888427/yelp-camp/f4kv6dzatawzekky8moa.jpg',
                    filename: 'yelp-camp/f4kv6dzatawzekky8moa'
                },
                {
                    url: 'https://res.cloudinary.com/dgwfiyuty/image/upload/v1704888427/yelp-camp/c5mcrbaxfazzumjh4wzx.jpg',
                    filename: 'yelp-camp/c5mcrbaxfazzumjh4wzx'
                }
            ]
        });
        await camp.save();
    }
    console.log('SEEDING DONE');
};

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database disconnected');
});
