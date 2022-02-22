// Export all the routes for the app to find them.

module.exports = app => {
    const todoList = require("../controllers/todoapiController.js");
    const listitem = require("../controllers/todoapiController.js");
    const router = require("express").Router();

    //Route to create a new todoList
    router.post("/", todoList.create);

    //Route to create an item on todoList
    router.post("/add/:todoListName", listitem.createItem);

    //Route to retrieve all item on a todoList
    router.get("/:todoListName", listitem.getAllTodos);

    //Route to delete an item on a todoList
    router.delete("/", listitem.delete);

    // Let app use the routes
    app.use('/api/todo', router);
}