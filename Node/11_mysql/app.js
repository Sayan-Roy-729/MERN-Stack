const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-items");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Fetch data from the database
// db.execute("SELECT * FROM products")
//     .then((result) => {
//         console.log(result[0], result[1]);
//     })
//     .catch((err) => {
//         console.log("Database connection failed. Error: ", err);
//     });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

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

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Product to User Model RelationShip, onDelete: delete User also delete from products
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User to Product Relationship
User.hasMany(Product);

// Create association between Product and user
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// One user has many orders
Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });

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
    .then((cart) => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
