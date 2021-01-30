const  mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "deliah_db"
});

const connectDb = () => {  
  con.connect()
};

/* SQL */

const getUsers = () => {
  return new Promise ((resolve, reject) => {
    con.query('SELECT * FROM Users', function (error, results) {
      return error ? reject(err) : resolve(results);
    });
  })
}

const getProducts = () => {
  return new Promise ((resolve, reject) => {
    con.query('SELECT * FROM Products', function (error, results) {
      return error ? reject(error) : resolve(results);
    });
  })
}

const createRequest = (userId, status, description) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO requests (user_id, status, description) VALUES ('+userId+', "'+status+'", "'+description+'")'
    con.query(sql, function(error, results) {
      return error ? reject(error) : resolve(results);
    })
  })
}

const updateRequest = (id, status) => {
  return new Promise ((resolve, reject) => {
    const sql = 'UPDATE requests SET status = "'+status+'" WHERE id = '+id
    con.query(sql, function (error, results) {
      return error ? reject(error) : resolve(results);
    })
  })
}

const createProduct = (name, price, quantity) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO products (name, price, quantity) VALUES ("'+name+'", '+price+', '+quantity+')'
    con.query(sql, function(error, results) {
      return error ? reject(error) : resolve(results);
    })
  })
}

const updateProduct = (id, name, price, quantity) => {
  return new Promise ((resolve, reject) => {
    const sql = 'UPDATE products SET name = "'+name+'", price = '+price+', quantity = '+quantity+' WHERE id = '+id
    con.query(sql, function (error, results) {
      return error ? reject(error) : resolve(results);
    })
  })
}

const deleteProduct = (id) => {
  return new Promise ((resolve, reject) => {
    const sql = 'DELETE FROM products WHERE id = '+id
    con.query(sql, function (error, results) {
      return error ? reject(error) : resolve(results);
    })
  })
}

const connectionEnd = () => {
  con.end()
}

exports.connectDb = connectDb;
exports.connectionEnd = connectionEnd;
exports.getUsers = getUsers;
exports.getProducts = getProducts;

exports.createRequest = createRequest;
exports.updateRequest = updateRequest;

exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;