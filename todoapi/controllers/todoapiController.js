
const {TodoList, ListItem} = require("../models/todoapiModel.js");


//Method to create a new todoList
exports.create = (req, res) => {
    // Validate request
    validateRequest(req.body, res)
    // Else create the new todolist.
    const todol = new TodoList({
        listname: req.body.listname,
        listdescription: req.body.listdescription
    });

    //Validate the required fields.
    if(!todol.listdescription || !todol.listname){
        return res.status(400).send("Error - todolist name and description are required."
        );
    }
    const result = (err, data) => {
        //Check for errors else send success message.
        if(err) {
            res.status(500).send({
            message: err.message
        });}

        else {
            res.status(201).send({
                message: "Success creating item"
            });
        }
    }
    // Call the method to save to the database.
    TodoList.createList(todol, result);
};

//Method to create a new todoList item
exports.createItem = (req, res) => {
    // Validate request
    validateRequest(req.body, res)

    if(!req.params.todoListName){
        return res.status(400).send({
            message: "Input parameter required for sending request."
        });
    }

    // Else create the new listItem
    const newListItem = new ListItem({
        listname: req.params.todoListName,
        i_name: req.body.i_name,
        i_details: req.body.i_details
    });

    //Validate the required fields.
    if(!newListItem.i_name || !newListItem.i_details){
        return res.status(400).send("Error - item name and details are required."
        );
    }
    const result = (err, data) => {
        //Check for errors else send success message.
        if(err) {
            res.status(500).send({
                message: err.message
            });}

        else {
            res.status(201).send({
                message: "Success adding item"
            });
        }
    }
    // Call the method to save to the database.
    ListItem.createItem(newListItem, result);
};

//Method to retrieve all items on todolist
exports.getAllTodos = (req, res) => {
    const listName = req.params.todoListName;
    if(!listName){
        return res.status(400).send({
            message: "Input parameter required for sending request."
        });
    }
     ListItem.getAllItems(listName, (err, data) => {
         if(err){
             res.status(500).send({
                 message: err.message
             });
         }
         else res.send(data);
     });
};

//Method to delete an item on a todoList
exports.delete = (req, res) => {
    const listName = req.body.listname;
    const itemName = req.body.i_name;

    validateRequest(req.body, res)

    //Validate the required fields.
    if(!listName || !itemName){
        return res.status(400).send("Error - todolist name and list item name are required."
        );
    }

    ListItem.complete(listName, itemName, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Did not find any items on list: ${listName} with itemName: ${itemName}`
                });
            }
            else{
                res.status(500).send({
                    message: err.message
                });
            }
        } else {
            res.send({message: `Successfully completed item=${itemName}`});
        }
    });
};

function validateRequest(reqBody, res) {
    //Validate the request or else return and error 400
    if (Object.keys(reqBody).length === 0) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
}