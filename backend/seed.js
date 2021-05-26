const mongoose = require('mongoose')
const { port, dbURI } = require('./config/environment')
const Projects = require('./models/projects')
const User = require('./models/user')
const axios = require('axios')
require('dotenv').config()
const globalArray = []
const globalUsers = []
mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.log(err)

    console.log('Mongoose connected!')
    mongoose.connection.db
      .dropDatabase()
      .then(() => {
        return User.create([
          {
            username: 'balta',
            email: 'balta@balta.com',
            password: 'balta',
            passwordConfirmation: 'balta',
            isAdmin: true
          }
        ])
      })
      .then((users) => {
        users.map((item) => {
          globalUsers.push(item)
        })
        console.log(`${users.length} users have been created!`)
        return users
      })
      .then((users) => {
        const seedData = [
          {
            name: 'Know your Heritage',
            url: '/myprojects/know-your-heritage',
            website: 'https://knowyourheritage.herokuapp.com/',
            github: 'https://github.com/Baromeg/project-4',
            description: [
              'The application showcases the wonders of the UNESCO’s World Heritage List to promote its awareness.',
              'Using Python I computed the data from several API’s requests (UNESCO list + Google Places & Photos) and built the componentry for the UI.',
              'The app has email verification using SendGrid, a map feature using Mapbox and an image carousel using ImageGallery.'
            ],
            tools: ['hello'],
            user: users[0]
          },
          {
            name: 'GreenWorld',
            url: '/myprojects/greenworld',
            website: 'https://greenworld-p3.herokuapp.com/',
            github: 'https://github.com/Baromeg/project-3',
            description: [
              'The application helps the user make greener decisions by discovering sustainable business and communities locally.',
              "I built the 'Single location' page and enriched the UX with the map tile using MapBox, the comments and ratings using React-Ratings, the photo upload feature using Cloudinary.",
              'It handles async requests (Yelp, Mapbox) with error handling triggers and geolocation for best UX.'
            ],
            tools: ['hello'],
            user: users[0]
          },
          {
            name: 'Heroes',
            url: '/myprojects/heroes',
            website: 'https://baromeg.github.io/project-2',
            github: 'https://github.com/Baromeg/project-2',
            description: [
              'The application features all-time comic heroes.',
              'Pair programming throughout the project fetching several API’s (SuperHero & ComicVine) to link each hero with its first comic appearance as well as the entire UI.',
              'I enhanced the UX by implementing the image carousel on the home page using react-carousel library.'
            ],
            tools: ['hello'],
            user: users[0]
          },
          {
            name: 'The Frogger',
            url: '/myprojects/frogger',
            website: 'https://baromeg.github.io/project-1',
            github: 'https://github.com/Baromeg/project-1',
            description: [
              'It was my first independently made application. It is a grid-based game where I implemented the concepts learned on CSS, JavaScript, logical thinking and problem-solving.',
              "The game handles moving obstacles and tracks the player's scoring."
            ],
            tools: ['hello'],
            user: users[0]
          }
        ]
        // return Promise.all(seedData)
        // console.log(seedData)
        return seedData
      })
      .then((seedData) => {
        seedData.map((item) => {
          globalArray.push(item)
        })
        console.log(seedData)
        return seedData
      })
      .then((seedData) => {
        console.log(seedData)
        return Projects.create(seedData)
      })
      .then((project) => {
        console.log(`${project.length} projects have been created!`)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        mongoose.connection.close()
      })
  }
)
