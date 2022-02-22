# TODO API List Creator

TODO API is a Node.js/Express/SQL local application that creates TODOs List and is able to add items to those lists and
keep track of when an item is completed. The application can be run locally and it contains a docker file that will 
create an instance of MySQL db for data storing purposes.


## Installation

To install and run the application locally. First create run the docker file that will initialize the database instance
and create tables.

```bash
docker compose up
```

Once the database is running and is active. Run npm to start the application on a localhost server by running the 
following command. 

```bash
npm run start
```

That command will let the application come together. The console will log a message saying where the application is 
running. Then the application is ready to be tested on Postman.


## REST API

### Create new TODO list.

```POST /todo```

Requires a JSON body that contain the name of the list and a description of that list.

```
{
    listname: 'SomeName',
    listdescription: 'Description of the list'
    
}
```

### Create a new item on TODO list.

```POST /api/todo/add/{todoListName}```

Requires a JSON body that contain the name of the item todo and a detail about it.
Also, it takes as parameter of the name of  TODO list

```
{
    i_name: 'SomeName',
    i_details: 'Description of the list'
}
```

### Retrieves all items of the TODO list.

```GET /api/todo/{todoListName}```

Requires a JSON body that contain the name of the item todo and a detail about it.
Also, it takes as parameter of the name of  TODO list

Example of response mesasge:
```
[
    {
        "item_id": 1,
        "listname": "grocerylist",
        "i_name": "tomatoe",
        "i_details": "for the soup"
    },
    {
        "item_id": 2,
        "listname": "grocerylist",
        "i_name": "POTATOE",
        "i_details": "for the soup"
    },
    {
        "item_id": 3,
        "listname": "grocerylist",
        "i_name": "kiwis",
        "i_details": "I need 5 kiwis "
    }
]
```

### Delete/Complete an item on a todo list

```DELETE /api/todo```

Requires a body that contains the list name and the item name that is on the list.


```
{
    listname: 'Name of the list'
    i_name: 'SomeName'
}
```


