const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase, createMeeting } = require('./db.js'); 
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

apiRouter.param('minionId', (req, res, next, minionId) => {
    const object = getFromDatabaseById('minions', minionId);
    if (object) {
        req.minionId = minionId;
        req.minionObject = object;
        return next();
    } else {
        return res.status(404).send({});
    }
});

apiRouter.get('/minions', (req, res, next) => {
    const minionsArray = getAllFromDatabase('minions');
    res.status(200).send(minionsArray || []);
});

apiRouter.post('/minions', (req, res, next) => {
    const updatedDatabase = addToDatabase('minions', req.body);
    if (updatedDatabase) {
        res.status(201).send(updatedDatabase);
    } else {
        res.status(400).send();
    }
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
    res.send(req.minionObject);
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(400).send();
    }
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const wasDeleted = deleteFromDatabasebyId('minions', req.minionId);
    if (wasDeleted) {
        res.status(204).send();
    }
});




// apiRouter.use('/ideas', checkMillionDollarIdea);

apiRouter.param('ideaId', (req, res, next, ideaId) => {
    const object = getFromDatabaseById('ideas', ideaId);
    if (object) {
        req.ideaId = ideaId;
        req.ideaObject = object;
        return next();
    } else {
        return res.status(404).send({});
    }
});

apiRouter.get('/ideas', (req, res, next) => {
    const ideasArray = getAllFromDatabase('ideas');
    res.status(200).send(ideasArray || []);
});

apiRouter.post('/ideas',checkMillionDollarIdea, (req, res, next) => {
    const updatedDatabase = addToDatabase('ideas', req.body);
    if (updatedDatabase) {
        res.status(201).send(updatedDatabase);
    } else {
        res.status(400).send();
    }
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    res.send(req.ideaObject);
});

apiRouter.put('/ideas/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdeas = updateInstanceInDatabase('ideas', req.body);
    if (updatedIdeas) {
        res.send(updatedIdeas);
    } else {
        res.status(400).send();
    }
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    const wasDeleted = deleteFromDatabasebyId('ideas', req.ideaId);
    if (wasDeleted) {
        res.status(204).send();
    }
});







apiRouter.get('/meetings', (req, res, next) => {
    const meetingsArray = getAllFromDatabase("meetings");
    res.send(meetingsArray);
});

apiRouter.post('/meetings', (req, res, next) => {
    const newMeeting = createMeeting();
    const updatedDatabase = addToDatabase('meetings', newMeeting); 
    if (updatedDatabase) {
        res.status(201).send(updatedDatabase);
    } else {
        res.status(400).send();
    }
});

apiRouter.delete('/meetings', (req, res, next) => {
    const emptyArray = deleteAllFromDatabase('meetings');
    res.status(204).send(emptyArray);
});



module.exports = apiRouter;

