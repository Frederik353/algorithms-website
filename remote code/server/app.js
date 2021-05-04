const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cp = require('child_process');
const fs = require('fs');
const rimraf = require("rimraf");
const cors = require('cors')
const redis = require('redis');
const amqp = require('amqp-connection-manager');
const https = require('https');
const fs = require('fs')






app.use(cors({
    origin: 'http://localhost:3000', // tillater cross origin request fra nettsiden
    origin: 'https://frederik-it.netlify.app',// tillater cross origin request fra nettsiden
    origin: 'http://frederik-it.netlify.app'// tillater cross origin request fra nettsiden
}));

app.use(bodyParser.urlencoded({extended:true})); // konfigurerer bodyparser som middlevare, trengs for å lese body i en post request
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); //midleware for å sende statiske filer

const client = redis.createClient({ //setter opp redis database
	host: 'redis-server',
	port: 6379
})

client.on('error', (err) => { // hvis error i redis log error
    console.log("Error " + err)
});

const extensions = {
    "cpp":"cpp",
    "c": "c",
    "java":"java",
    "python":"py",
    "javascript":"js"
};

function random(size) { //genererer string for navn på folder
    return require("crypto").randomBytes(size).toString('hex');
}

app.post("/submit", (req, res) => {

    let data= { // req.body er body objektet motat i post requesten
        'src':req.body.src,
        'input':req.body.stdin,
        'lang':req.body.lang,
        'timeOut':req.body.timeout,
        'folder':random(10)
    }

    sendMessage(data);
    res.status(202).send("http://localhost:7000/results/" + data.folder);

});



app.get("/results/:id", (req, res) => { // håndterer get request
    let key = req.params.id;
    client.get(key, (err, status) => { // sjekker status i redis database
        if (status == null){ // hvis id ikke finnes anta at serveren ikke har startet å kjøre koden og at koden står i kø
            res.status(202).send('{"status":"Queued"}'); // send http status kode 202 (accepted) indikerer akseptert for prosessering
        }
        else if(status=='{"status":"Processing"}') { //samme som over bare startet men ikke ferdig
            res.status(202).send('{"status":"Processing"}');
        }
        else{ // hvis ikke er det ferdig prosessert, send status objekt som nå inneholder output
            res.status(200).send(status);
        }
    });
});


var QUEUE_NAME = "judge"

//håndterer tilkoblinger
var connection = amqp.connect(['amqp://rabbitmq:5672']);
connection.on('connect', function() {
    console.log('Connected!');
});
connection.on('disconnect', function(err) {
    console.log('Disconnected.', err.stack);
});

// Create a channel wrapper
var channelWrapper = connection.createChannel({
    json: true,
    setup: function(channel) {
        // `channel` here is a regular amqplib `ConfirmChannel`.
        return channel.assertQueue(QUEUE_NAME, {durable: true});
    }
});


var sendMessage = function(data) { // Send messages until someone hits CTRL-C or something goes wrong...
    channelWrapper.sendToQueue(QUEUE_NAME, data)
    .then(function() {
        console.log("Message sent");
    })
    .catch(function(err) {
        console.log("Message was rejected:", err.stack);
        channelWrapper.close();
        connection.close();
    });
};

const port = process.env.PORT || 7000;
https.createServer({
    key: fs.readFileSync('../../../server.key'),
    cert: fs.readFileSync('../../../server.cert')
}, app).listen(port, () => console.log(`Example app listening on port ${port}!`));

