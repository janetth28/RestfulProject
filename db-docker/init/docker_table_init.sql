CREATE TABLE IF NOT EXISTS Lists(
                      listname VARCHAR(50) NOT NULL UNIQUE ,
                      listdescription VARCHAR(100) NOT NULL,
                      PRIMARY KEY (listname)
);

CREATE TABLE IF NOT EXISTS list_items(
                           item_id INT AUTO_INCREMENT,
                           listname VARCHAR(50) NOT NULL,
                           i_name VARCHAR(50) NOT NULL,
                           i_details VARCHAR(100) NOT NULL,
                           PRIMARY KEY (item_id),
                           FOREIGN KEY (listname)
                               REFERENCES Lists(listname)

);

ALTER USER 'root'@'localhost' IDENTIFIED BY 'testing123';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'testing123';
FLUSH PRIVILEGES;