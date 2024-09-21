// Import required modules
require('dotenv').config();  // Load environment variables
const express = require('express');
const mysql = require('mysql2');

const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('assets')); // Serve static files



// Create the MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,    
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME 
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});


// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: './src/assets/images/', // Specify where to store the file
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file name
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
}).single('image'); // 'image' is the name of the form field

// API endpoint to handle file upload and saving data to the database
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
      if (err) {
          return res.status(500).json({ error: 'File upload failed' });
      }
      
      const { username } = req.body;
      const imagePath = req.file.filename; // The uploaded file name

      // Insert data into the database
      const sql = 'INSERT INTO file (username, image) VALUES (?, ?)';
      db.query(sql, [username, imagePath], (err, result) => {
          if (err) {
              return res.status(500).json({ error: 'Database insertion failed' });
          }
          res.json({ message: 'File uploaded and data saved to the database successfully' });
      });
  });
});


// Route to get all products
app.get('/products', (req, res) => {
  const productQuery = 'SELECT * FROM products';
  db.query(productQuery, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/create-product', (req, res) => {
  upload(req, res, (err) => {
    
    if (err) {
      return res.status(500).send({ message: 'Error uploading file' });
    }

    const { name, qty, unitPrice, discount, shippingCost } = req.body;

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    const imagePath = req.file.filename; // Correctly access the uploaded file's name

    const productQuery = 'INSERT INTO products (name, image, qty, unitPrice, discount, shippingCost) VALUES (?, ?, ?, ?, ?,?)';
  
    db.query(productQuery, [name, imagePath, qty, unitPrice, discount, shippingCost], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to create product' });
      }
      res.status(200).json({ message: 'Product created successfully' });
    });
    
    console.log('Product Data:', { name, qty, unitPrice, discount, shippingCost, imagePath });

    res.status(200).send({ message: 'Product created successfully' });
  });
});


app.put('/products/:id', (req, res) => {
  const productId = req.params.id;

  // First, upload the new image if there's one
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send({ message: 'Error uploading file' });
    }

    // Extract the form data
    const { name, unitPrice, shippingCost } = req.body;
    const imagePath = req.file ? req.file.filename : null; // Handle new image

    // Get the current product details to retrieve the old image path
    const getProductQuery = 'SELECT image FROM products WHERE id = ?';
    db.query(getProductQuery, [productId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch product' });
      }

      const oldImage = result[0]?.image;

      // Update the product details
      const updateProductQuery = 'UPDATE products SET name = ?, unitPrice = ?, shippingCost = ?, image = ? WHERE id = ?';
      db.query(updateProductQuery, [name, unitPrice, shippingCost, imagePath || oldImage, productId], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to update product' });
        }

        // If there's a new image, delete the old image from the server
        if (imagePath && oldImage) {
          const fs = require('fs');
          const oldImagePath = path.join(__dirname, 'src/assets/images/', oldImage);

          // Delete the old image file
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error('Failed to delete old image:', err);
            } else {
              console.log('Old image deleted:', oldImage);
            }
          });
        }

        res.status(200).json({ message: 'Product updated successfully' });
      });
    });
  });
});



// Route to delete an order by ID
app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  const deleteProductQuery = 'DELETE FROM products WHERE id = ?';

  db.query(deleteProductQuery, [productId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete order' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  });
});


// Route to get all orders
app.get('/orders', (req, res) => {
  const orderQuery = 'SELECT * FROM orders';
  db.query(orderQuery, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Route to create an order
app.post('/create-order', (req, res) => {
  const { productName, quantity, price, customerName, customerEmail, customerAddress } = req.body;
  const orderQuery = 'INSERT INTO orders (productName, quantity, price, customerName, customerEmail, customerAddress) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(orderQuery, [productName, quantity, price, customerName, customerEmail, customerAddress], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create order' });
    }
    res.status(200).json({ message: 'Order created successfully' });
  });
});

// Update an order by ID
app.put('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const { productName, quantity, price, customerName, customerEmail, customerAddress } = req.body;

  const updateOrderQuery = 'UPDATE orders SET productName = ?, quantity = ?, price = ?, customerName = ?, customerEmail = ?, customerAddress = ? WHERE id = ?';
  
  db.query(updateOrderQuery, [productName, quantity, price, customerName, customerEmail, customerAddress, orderId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update order' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Fetch the updated order to return in the response
    const getOrderQuery = 'SELECT * FROM orders WHERE id = ?';
    db.query(getOrderQuery, [orderId], (err, updatedOrder) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch updated order' });
      }
      res.status(200).json(updatedOrder[0]); // Return the updated order
    });
  });
});


// Route to delete an order by ID
app.delete('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const deleteOrderQuery = 'DELETE FROM orders WHERE id = ?';

  db.query(deleteOrderQuery, [orderId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete order' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  });
});

// Start the server using the port from environment variables
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
