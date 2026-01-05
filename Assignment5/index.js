const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;


// Create the connection to database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'store_db',
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {

        console.log("Success");
    }
});

app.use(express.json());


/// Part 03

/**
01-


CREATE TABLE suppliers (
    id ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    contactNumber VARCHAR(20)
);


CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    stockQuantity INT,
    supplierId INT,
    FOREIGN KEY (supplierId) REFERENCES suppliers(id)
);

CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT,
    quantitySold INT,
    saleDate DATE,
    FOREIGN KEY (productId) REFERENCES products(id)
);

 */

// 02-
app.post('/add-category', (req, res, next) => {
    const query = 'ALTER TABLE products ADD COLUMN Category VARCHAR(100)';
    connection.execute(query, (error, result) => {
        if (error) {
            res.status(400).json({ message: "Add category column field", error });
        }
        if (result) {
            res.status(200).json({ message: "Add Category column success" });
        }
    })
});

//03-
app.post('/delete-category', (req, res, next) => {
    const query = 'ALTER TABLE products DROP COLUMN Category';
    connection.execute(query, (error, result) => {
        if (error) {
            res.status(400).json({ message: "Delete category column field", error });
        }
        if (result) {
            res.status(200).json({ message: "Delete Category column success" });
        }
    })
});

// 04- 
app.post('/change-contactnumber', (req, res, next) => {
    const query = 'ALTER TABLE suppliers MODIFY COLUMN contactNumber VARCHAR(15)';
    connection.execute(query, (error, result) => {
        if (error) {
            res.status(400).json({ message: "Change ContactNumber to VARCHAR(15) field", error });
        }
        if (result) {
            res.status(200).json({ message: "Change ContactNumber to VARCHAR(15) successed" });
        }
    })
});

// 05-
app.post('/change-productname', (req, res, next) => {
    const query = 'ALTER TABLE products MODIFY COLUMN name VARCHAR(100) NOT NULL';
    connection.execute(query, (error, result) => {
        if (error) {
            res.status(400).json({ message: "Change ProductName to VARCHAR(100) NOT NULL field", error });
        }
        if (result) {
            res.status(200).json({ message: "Change ProductName to VARCHAR(100) NOT NULL successed" });
        }
    })
});

// 06- 
app.post('/add-supplier', (req, res, next) => {
    const supplierName = "FreshFoods";
    const contactNumber = "01001234567";

    const insertSupplierQuery = 'INSERT INTO suppliers (name, contactNumber) VALUES (?, ?)';

    connection.execute(insertSupplierQuery, [supplierName, contactNumber], (err, supplierResult) => {
        if (err) {
            return res.status(400).json({ message: "Failed to add supplier", error: err });
        }
        const supplierId = supplierResult.insertId;

        const productsQuery = `
            INSERT INTO products (name, price, stockQuantity, supplierId)
            VALUES 
            (?, ?, ?, ?),
            (?, ?, ?, ?),
            (?, ?, ?, ?)
        `;

        const productsValues = [
            "Milk", 15.00, 50, supplierId,
            "Bread", 10.00, 30, supplierId,
            "Eggs", 20.00, 40, supplierId
        ];

        connection.execute(productsQuery, productsValues, (err2, productsResult) => {
            if (err2) {
                return res.status(400).json({ message: "Failed to add products", error: err2 });
            }

            const selectMilkQuery = 'SELECT id FROM products WHERE name = ? AND supplierId = ?';

            connection.execute(selectMilkQuery, ["Milk", supplierId], (err3, milkResult) => {
                if (err3 || milkResult.length === 0) {
                    return res.status(400).json({ message: "Failed to find Milk product", error: err3 });
                }

                const milkId = milkResult[0].id;

                console.log(`Mohammad Joumani ${milkId}`);


                const insertSaleQuery = 'INSERT INTO sales (productId, quantitySold, saleDate) VALUES (?, ?, ?)';
                connection.execute(insertSaleQuery, [milkId, 2, '2025-05-20'], (err4, saleResult) => {
                    if (err4) {
                        return res.status(400).json({ message: "Failed to record sale", error: err4 });
                    }

                    return res.status(200).json({
                        message: "All inserts completed successfully",
                        supplierId,
                        productIdsInserted: productsResult.affectedRows,
                        saleId: saleResult.insertId
                    });
                });
            });
        });
    });
});

// 07- Update the price of 'Bread' to 25.00. (0.5 Grade)
app.patch('/update-price', (req, res, next) => {
    const name = "Bread";

    const query = 'UPDATE products SET price = 25 WHERE name = ?';
    connection.execute(query, [name], (error, result) => {
        if (error) {
            res.status(400).json({ message: "Failure Update price", error });
        }
        if (result) {
            res.status(200).json({ message: "Success Update price" });
        }
    })
});

// 08- 
app.delete('/delete-product', (req, res, next) => {
    const name = "Eggs";

    const query = 'DELETE FROM products WHERE name = ?';
    connection.execute(query, [name], (error, result) => {
        if (error) {
            res.status(400).json({ message: "Failure Delete product", error });
        }
        if (result) {
            res.status(200).json({ message: "Success Delete product" });
        }
    })
});

// 09-
app.get('/sale-products', (req, res, next) => {
    const query = `
    SELECT products.name, SUM(sales.quantitySold) As total
     FROM sales JOIN products 
     ON sales.productId = products.id
     GROUP BY products.id
    `;
    connection.execute(query, (error, result) => {
        if (error) {
            res.status(400).json({ message: "Failure get products", error });
        }
        if (result) {
            res.status(200).json(result);
        }
    })
});
//10-Get the product with the highest stock. (0.5 Grade)

app.get('/highest-stock-products', (req, res, next) => {
    const query = `SELECT * FROM products ORDER BY StockQuantity DESC LIMIT 1`;
    connection.execute(query, (error, result) => {
        if (error) {
            res.status(400).json({ message: "Failure get products", error });
        }
        if (result) {
            if (result.length > 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(200).json({ message: "Empty data" });
            }
        }
    })
});


//11-
app.get('/supplier-search', (req, res, next) => {
    const query = `SELECT * FROM suppliers WHERE name LIKE 'F%'`;
    connection.execute(query, (error, result) => {
        if (error) {
            res.status(400).json({ message: "Failure get suppliers start with F", error });
        }
        if (result) {
            res.status(200).json(result);
        }
    })
});

//12-Show all products that have never been sold. (0.5 Grade)
app.get('/products-without-sold', (req, res, next) => {
    const query = `
    SELECT products.* FROM products LEFT JOIN sales
    ON products.id = sales.productId
    WHERE sales.id is null
    `;
    connection.execute(query, (error, result) => {
        if (error) {
            res.status(400).json({ message: "Failure get products", error });
        }
        if (result) {
            res.status(200).json(result);
        }
    })
});
//13-
app.get('/all-sales', (req, res, next) => {
    const query = `
    SELECT products.name,
    Sales.quantitySold,
    Sales.saleDate
    FROM sales
    JOIN products ON sales.productId = products.id
    `;
    connection.execute(query, (error, result) => {
        if (error) {
            res.status(400).json({ message: "Failure get sales", error });
        }
        if (result) {
            res.status(200).json(result);
        }
    })
});

app.use((req, res, next) => {
    res.status(404).json({ message: `404 Not Found ${req.url}` });

});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});