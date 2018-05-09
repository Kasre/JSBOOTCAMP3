const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Room = require('./lib/room');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = {
    rooms: []
};

// Get room details /room/MyGameRoom
app.get('/room/:roomId', function (req, res) {
    const roomId = req.params.roomId;

    let room = db.rooms.find((room) => {
        return room.name === roomId;
    }) || {};

    res.status(200).send(room);
});

app.post('/room/:roomId/players/:userId/score', function (req, res) {
    const roomId = req.params.roomId;

    let room = db.rooms.find((room) => {
        return room.name === roomId;
    });

    if (!roomId || !room) {
        res.status(500).send('Invalid room');

        return;
    }

    const userId = req.params.userId;
    const user = room.getPlayerByName(userId);

    if (!userId || !user) {
        res.status(500).send('Invalid request');

        return;
    }

    user.addScore(req.body.score);

    res.status(200).send({});
});

app.get('/room/:roomId/players/:playerName/draw', function (req, res) {
    const roomId = req.params.roomId;

    let room = db.rooms.find((room) => {
        return room.name === roomId;
    });

    if (!roomId || !room) {
        res.status(500).send('Invalid room');

        return;
    }

    const player = room.getPlayerByName(req.params.playerName);

    if (!player) {
        res.status(500).send('No such player exists');

        return;
    }

    const score = Math.ceil(Math.random() * 14);

    player.addScore(score);

    res.status(200).send({});
});

// Add player to room /room/MyGameRoom/players
app.post('/room/:roomId/players/:playerName', function (req, res) {
    const roomId = req.params.roomId;
    const playerName = req.params.playerName;

    if (!playerName) {
        res.status(500).send('Please give a name to the player');

        return;
    }

    if (!roomId) {
        res.status(500).send('Invalid room name');

        return;
    }

    let room = db.rooms.find((room) => {
        return room.name === roomId;
    });

    if (!room) {
        room = new Room(roomId);
        db.rooms.push(room);
    }

    if (!room.addUniquePlayer(playerName)) {
        res.status(400).send(`Player already exists with name ${req.body.name}`);

        return;
    }

    res.status(200).send(room);
});

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(3000);