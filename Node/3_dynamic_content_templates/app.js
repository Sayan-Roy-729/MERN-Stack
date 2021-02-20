const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars'); // handlebars template engine

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// allow to set some value globally in the app and can read with app object that is get
// For EJS Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// For Handlebars Engine
// app.engine(
//     'hbs',
//     expressHbs({
//       layoutsDir: 'views/layouts/',
//       defaultLayout: 'main-layout',
//       extname: 'hbs'
//     })
//   );
// app.set('view engine', 'hbs');
// app.set('views', 'views');

// For Pug Template Engine
// app.set('view engine', 'pug');
// app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);
