const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const express = require('express');
const path = require('path');
const compression = require('compression');

// security
const helmet = require('helmet'); 
const cors = require('cors');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

// compress all responses
app.use(compression())

app.use(helmet()); 
app.use(cors());

app.get('/', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.render('index')
});

exports.app = functions.https.onRequest(app);
