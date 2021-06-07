# Communication with MySQL Database:

## Create a Connection:

```js
const mysql = require("mysql2"); // npm install --save mysql2

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "node-complete",
    password: "",
});

module.exports = pool.promise();
```

## Fetch Data from the database:

```js
db.execute("SELECT * FROM products")
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

## Filter Data When Fetching from the DB:

```js
db.execute("SELECT * FROM products WHERE products.id = ?", [id])
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

## Insert data into the DB:

```js
db.execute(
    "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
    [this.title, this.price, this.imageUrl, this.description]
)
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

# Sequelize Package:

## Create Connection:

```js
const Sequelize = require("sequelize"); // npm install --save sequelize

// database name, userName, password
const sequelize = new Sequelize("node-complete", "root", "", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
```

## Create Model:

```js
const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Product;
```

## Establish the Connection:

```js
const sequelize = require("./util/database");

sequelize
    .sync()
    .then((result) => {
        // console.log(result);
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
```

## Insert into the database:

```js
const Product = require('Import Product model defined earlier');

Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
    })
        .then((result) => {
            console.log('Product created');
        })
        .catch((err) => console.log(error));
```

## Retrieving Data from the Database:

```js
const Product = require('Import Product model defined earlier');


Product.findAll()
        .then((products) => {
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products",
            });
        })
        .catch((err) => {
            console.log(err);
        });
```

##  Fetch a single row from the database:

```js
Product.findOne({where: {id: prodId}})
        .then((product) => {
            res.render("shop/product-detail", {
                product: product,
                pageTitle: product.title,
                path: "/products",
            });
        })
        .catch((err) => console.log(err));
```
## Update:

```js
const prodId = req.body.productId;
const updatedTitle = req.body.title;
const updatedPrice = req.body.price;
const updatedImageUrl = req.body.imageUrl;
const updatedDesc = req.body.description;

Product.findOne({ where: { id: prodId } })
    .then((product) => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.imageUrl = updatedImageUrl;

        return product.save();
    })
    .then((result) => {
        console.log("PRODUCT IS UPDATED!");
        res.redirect("/admin/products");
    })
    .catch((err) => {
        console.log(err);
    });
```

## Delete:

- Way One:
```js
Product.destroy({where: {id: prodId}});
```
- Way Two: 

```js
Product.findOne({ where: { id: prodId } })
    .then((product) => {
        return product.destroy();
    })
    .then((result) => {
        console.log("DELETED!");
        res.redirect("/admin/products");
    })
    .catch((err) => {
        console.log(err);
    });
```

## Relationship between different Models:

### Ont-To-Many Relationship:

#### Create User Model
```js
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
});

module.exports = User;
```

#### Establish the relationship in main file where the app is stared to executed (either `app.js` file or `server.js` file)

```js
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");


// For find the user and create other things
app.use((req, res, next) => {
    User.findOne({ where: { id: 1 } })
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
        });
});


// Product to User Model RelationShip, onDelete: delete User also delete from products
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User to Product Relationship
User.hasMany(Product);

sequelize
    // force is used because the Product Model is created already and then the User model is created.
    // So to create a connection, this will help. But not in production mode, otherwise it will delete
    // all data from the database. So before the production ready app, remove it.
    .sync({ force: true })
    .then((result) => {
        return User.findOne({where: {id: 1}});
    })
    .then(user => {
        if (!user) {
            return User.create({name: 'Sayan', email: 'test@test.com'})
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
```

#### Magic Association Methods:

##### Store into The Database

```js
// Products belong to user, so create<AssociationName> automatically passed by Sequelize.
// This code will store new product into Products Table and automatically refers to the User Table
req.user
    .createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
    })
    .then((result) => {
        console.log("Product created");
        res.redirect("/admin/products");
    })
    .catch((err) => console.log(error));
```

##### Fetch from the Database:

```js
req.user
    .getProducts({ where: { id: prodId } })
    .then((product) => {
        if (!product) {
            return res.redirect("/");
        }
        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product: product,
        });
    })
    .catch((err) => {
        console.log(err);
    });
```

### One-To-Many & Many-To-Many Relations:

#### Create Models:
- Create `Cart` model:

```js
const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = Cart;
```

- Create `Cart-Item` model

```js
const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const CartItem = sequelize.define("cartItem", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
```

#### Establish the Relations in Main File (app.js or server.js):

```js
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

// To access the use everywhere
app.use((req, res, next) => {
    User.findOne({ where: { id: 1 } })
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
        });
});

// Product to User Model RelationShip, onDelete: delete User also delete from products
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User to Product Relationship
User.hasMany(Product);

// Create association between Product and user
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
    .sync()
    .then((result) => {
        return User.findOne({ where: { id: 1 } });
    })
    .then((user) => {
        if (!user) {
            return User.create({ name: "Sayan", email: "test@test.com" });
        }
        return user;
    })
    .then((user) => {
        // console.log(user);
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
```

#### Fetch from the Tables:

```js
req.user
    .getCart()
    .then((cart) => {
        return cart
            .getProducts()
            .then(products => {
                res.render("shop/cart", {
                    path: "/cart",
                    pageTitle: "Your Cart",
                    products: products,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(err);
    });
```

#### Add new Products Model to the Cart Model:


```js
const prodId = req.body.productId;
let fetchedCart;
let newQuantity = 1;
req.user
    .getCart()
    .then((cart) => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        
        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Product.findOne({ where: { id: prodId } });
    })
    .then(product => {
        return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity },
        });
    })
    .then(() => {
        res.redirect("/cart");
    })
    .catch((err) => {
        console.log(err);
    });
```

#### Deleing Related Items & Deleting Cart (Model) Products (Model):

```js
const prodId = req.body.productId;
req.user
    .getCart()
    .then(cart => {
        return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
        const product = products[0];
        // Only delete from the CartItem table, not from the other Tables
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect("/cart");
    })
    .catch((err) => {
        console.log(err);
    });
```