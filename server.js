// const express = require('express');
// const bodyParser = require('body-parser')
// const MongoClient = require('mongodb').MongoClient
// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }))

// MongoClient.connect('mongodb+srv://noahmilliken:Squeak207@cluster0.lddh3tt.mongodb.net/?retryWrites=true&w=majority', {
//     useUnifiedTopology: true
// })

//     .then(client => {
//         console.log('connected to database')
//         const db = client.db('star-wars-quotes')
//         const quotesCollection = db.collection('quotes')
//         app.set('view engine', 'ejs')
//         app.use(bodyParser.urlencoded({ extended: true }))
//         app.use(bodyParser.json())
//         app.use(express.static('public'))



//         app.listen(3000, function () {
//             console.log('listening on 3000')
//         })
//         app.get('/', (req, res) => {
//             res.sendFile(__dirname + '/index.html')
//         })
//         app.post('/quotes', (req, res) => {
//             quotesCollection.insertOne(req.body)
//                 .then(result => {
//                     res.redirect('/')
//                 })
//                 .catch(error => console.error(error))
//         })
//     })
//     .catch(error => console.error(error))

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('bson');
const MongoClient = require('mongodb').MongoClient
const app = express();


MongoClient.connect('mongodb+srv://noahmilliken:Squeak207@cluster0.lddh3tt.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('connected to database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))


        app.listen(3000, function () {
            console.log('listening on 3000')
        })
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    console.log(results)
                    res.render('index.ejs', { quotes: results })
                }).catch(() => { console.log('error') })

        })
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                    // res.redirect('/')
                })
                .catch(error => console.error(error))
        })
        app.post('/quotes/:id', (req, res) => {
            quotesCollection.deleteOne({ "_id": ObjectID(req.params.id) })
                .then(() => res.redirect("/"))
            console.log(req.params.id)
        })
    })
    .catch(error => console.error(error))