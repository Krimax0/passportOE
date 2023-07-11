module.exports = app => {
    const handler = require("../controllers/discordOE.controller.js");

    let router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/handler", handler.get);

    // Create a new Tutorial
    router.post("/handler", handler.get);

    // Update a Tutorial with id
    router.put("/handler", handler.update);

    app.use('/api/tutorials', router);
};