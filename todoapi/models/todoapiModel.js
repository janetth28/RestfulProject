// Require the configuration of the db
const sql = require("./db.js");

//Constructor to define the table for the todolist and the items inside todoList
const TodoList = function (todolist) {
    this.listname = todolist.listname;
    this.listdescription = todolist.listdescription;
};

const ListItem = function (listItem) {
    this.listname = listItem.listname;
    this.i_name = listItem.i_name;
    this.i_details = listItem.i_details;
};

// Queries or Insert associates with the table definitions.

//1 Create a new TODOList name and description are required fields of the body.
TodoList.createList = (newTodoList, result) => {
    console.log(result);
    sql.query("INSERT INTO Lists SET ?", newTodoList, (err, res) => {
        if(err) {
            console.log(result);
            console.log("Error while inserting into DB: ", err);
            result(err, null);
            return;
        }
        console.log("created a new TODO list -> ", {id: res.insertId, ...newTodoList});
        result(null, {id: res.insertId, ...newTodoList});
    })
};

//2 Add item to a TODOList
ListItem.createItem = (newListItem, result) => {
    console.log(result);
    sql.query("INSERT INTO list_items SET ?", newListItem, (err, res) => {
        if(err) {
            console.log(result);
            console.log("Error while inserting into DB: ", err);
            result(err, null);
            return;
        }
        console.log("Added a new item to list -> ", {id: res.insertId, ...newListItem});
        result(null, {id: res.insertId, ...newListItem});
    });
};

//3 Return all items of TodoList given a name as part of param.
ListItem.getAllItems = (lname, result) => {
    sql.query(`SELECT * FROM list_items WHERE listname='${lname}' `, (err, res) => {
        if(err) {
            console.log(result);
            console.log("Error while retrieving from DB: ", err);
            result(err, null);
            return;
        }
        if(res.length) {
            console.log("Found items on lists");
            result(null, res)
        }
    });
};

//4 Delete an item from todolist given list name and item name.
ListItem.complete = (listName, itemName, result) => {
    sql.query(`DELETE FROM list_items WHERE listname='${listName}' AND i_name='${itemName}'`, (err, res) => {
        if(err) {
            console.log(result);
            console.log("Error deleting from DB: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows === 0){
            //Did not find any rows with those values.
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Success deleted from DB");
        result(null, res);
    });
}

// Export this functions
module.exports =  {TodoList, ListItem};
