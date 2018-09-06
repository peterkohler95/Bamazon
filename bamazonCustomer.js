var inquirer = require('inquirer');
var mysql = require('mysql');
var Cli = require('cli-table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    database: 'bamazon'
});


function displayItems() {
    var table = new Cli({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    listInventory();

    function listInventory() {

        connection.query("SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

                table.push(
                    [itemId, productName, departmentName, price, stockQuantity]
                );
            }
            console.log("");
            console.log("====================================================== Current Bamazon Inventory ======================================================");
            console.log("");
            console.log(table.toString());
            console.log("");
            promptFunc();
        });
    }
}

function promptFunc() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?'
        }
    ]).then(function (input) {
        // console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);

        var item = input.item_id;
        var quantity = input.quantity;

        // Query db to confirm that the given item ID exists in the desired quantity
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;

            // If the user has selected an invalid item ID, data attay will be empty
            // console.log('data = ' + JSON.stringify(data));

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayInventory();

            } else {
                var productData = data[0];

                // console.log('productData = ' + JSON.stringify(productData));
                // console.log('productData.stock_quantity = ' + productData.stock_quantity);

                // If the quantity requested by the user is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log('Congratulations, the product you requested is in stock! Placing order!');

                    // Construct the updating query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    // Update the inventory
                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log('Your oder has been succesfully placed, your total is $' + productData.price * quantity);

                        console.log("\n---------------------------------------------------------------------\n");

                        // End the database connection
                        connection.end();
                    })
                } else {
                    console.log('Not enough product to place your order');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayItems();
                }
            }
        })
    })
}

displayItems();

