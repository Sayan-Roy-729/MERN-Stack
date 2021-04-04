# State Management (Provider Package)

## Pattern of the `Provider` Package:

<img src = "https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/9.png" height = "550" alt = "Flutter"/>

## Define Global Storage:

For an app, there could be more than one global storage container. And to define every storage, have to define a class that have to `mixing with ChangeNotifier`.

```dart
import 'package:flutter/material.dart';

import '../models/product.dart';

class Products with ChangeNotifier {
  List<Product> _items = [
    Product(
      id: 'p1',
      title: 'Red Shirt',
      description: 'A red shirt - it is pretty red!',
      price: 29.99,
      imageUrl:
          'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    ),
    Product(
      id: 'p2',
      title: 'Trousers',
      description: 'A nice pair of trousers.',
      price: 59.99,
      imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Trousers%2C_dress_%28AM_1960.022-8%29.jpg/512px-Trousers%2C_dress_%28AM_1960.022-8%29.jpg',
    ),
    Product(
      id: 'p3',
      title: 'Yellow Scarf',
      description: 'Warm and cozy - exactly what you need for the winter.',
      price: 19.99,
      imageUrl:
          'https://live.staticflickr.com/4043/4438260868_cc79b3369d_z.jpg',
    ),
    Product(
      id: 'p4',
      title: 'A Pan',
      description: 'Prepare any meal you want.',
      price: 49.99,
      imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Cast-Iron-Pan.jpg/1024px-Cast-Iron-Pan.jpg',
    ),
  ];

  // To restrict the direct access the data, add the data as private and
  // create a getter that returns the copy of the data
  List<Product> get items {
    return [..._items];
  }

  // Beside defining the method in the widget class, define that method here
  // that is required to clean the widget tree code.
  Product findById(String id) {
    return _items.firstWhere((product) => product.id == id);
  }

  void addProduct() {
    // _items.add(value);
    // The ChangeNotifier mixing is added to the class because it notifies to the
    // other widgets or screens that are connected with this global data
    notifyListeners();
  }
}
```

The above code id for multiple products data container. For single, product, another provider is defined like this

```dart
import 'package:flutter/material.dart';

class Product with ChangeNotifier {
  final String id;
  final String title;
  final String description;
  final double price;
  final String imageUrl;
  bool isFavourite;

  Product({
    @required this.id,
    @required this.title,
    @required this.description,
    @required this.price,
    @required this.imageUrl,
    this.isFavourite = false,
  });

  void toggleFavoriteStatus() {
    isFavourite = !isFavourite;
    notifyListeners();
  }
}
```

## Add the global storage with the app:

In the app, there will be many more widgets and child widgets or many more screens. So when one child is required that global storage, then should have to add the defined global storage to the parent child widget. E.g., in the below code, the global data is required in the `ProductOverviewScreen` widget that is a child widget of the `main.dart` file here. So have to add the provider with this file.

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './screens/products_overview_screen.dart';
import './screens/product_detail_screen.dart';

// Import the global data container file
import './providers/products.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Wrap the entire app with ChangeNotifierProvider and add
    // create key to add the global storage. The storage is defined
    // above of this section.
    return ChangeNotifierProvider(
        // Add the global data container here
      create: (context) => Products(),
      child: MaterialApp(
        title: 'MyShop',
        theme: ThemeData(
          primarySwatch: Colors.purple,
          accentColor: Colors.deepOrange,
          fontFamily: 'Lato',
        ),
        home: ProductsOverviewScreen(),
        routes: {
          ProductDetailScreen.routeName: (context) => ProductDetailScreen(),
        },
      ),
    );
  }
}
```

## Use the provider data container:

After defining the global data container and adding to the parent widget, next have to use the provider.

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/products.dart';
import './product_item.dart';

class ProductsGrid extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Use the provider; There will be multiple global data storage, then how to choose which data
    // container have to add here? By <Products> that is defined also when adding with the
    // parent widget.
    final productsData = Provider.of<Products>(context);
    final products = productsData.items;

    return GridView.builder(
      padding: const EdgeInsets.all(10.0),
      itemCount: products.length,
      itemBuilder: (context, index) => ProductItem(
        products[index].id,
        products[index].title,
        products[index].imageUrl,
      ),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 3 / 2,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
      ),
    );
  }
}
```

## Listening in Different Places & Ways:

Sometimes, in the widget, the global data storage is required but don't required if the global data is changed and for that, the widget is rebuild. For that, have to pass `listen: false` in the `.of(context)` as `.of(context, listen: false)`.

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/products.dart';

class ProductDetailScreen extends StatelessWidget {
  static const routeName = '/product-detail';

  @override
  Widget build(BuildContext context) {
    final productId = ModalRoute.of(context).settings.arguments as String;
    final loadedProduct = Provider.of<Products>(
      context,
      // Stop the rebuild if the global data storage is changed
      listen: false,
    ).findById(productId);

    return Scaffold(
      appBar: AppBar(
        title: Text(loadedProduct.title),
      ),
    );
  }
}
```

## Nested Models & Providers:

To show that if the product is favorite then show filled heart icon otherwise show outer favorite icon. For that, the provider data container that is defined for a single product is required because in this data container, there is a property that the product is favorite or not. So, for every single product, the provider is required.</br></br>
For that, in which file the single product widget is called, there have to define the `Product` provider like previously define the `Products` data container in `main.dart` file. But when rendering for each single product, every single product is already defined as `Product (Not Products)` data container class, so here have not to specify that like `main.dart` file.</br></br>

So in this file, Outer provider(`final productsData = Provider.of<Products>(context);`) is used to fetch all products and the nested provider (`ChangeNotifierProvider(create: (context) => products[index], child: ProductItem(),)`) is used to pass every single product to the child widget.

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/products.dart';
import './product_item.dart';

class ProductsGrid extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Outer provider
    final productsData = Provider.of<Products>(context);
    final products = productsData.items;

    return GridView.builder(
      padding: const EdgeInsets.all(10.0),
      itemCount: products.length,
      itemBuilder: (context, index) => ChangeNotifierProvider(
        // Nested Provider
        create: (context) => products[index],
        child: ProductItem(),
      ),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 3 / 2,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
      ),
    );
  }
}
```

Now, here have to use the `Product (Not Products)` data container. So fetch the single product here. Noticeable is that, don't have to pass the product id to fetch the single product. **Everything is that inside of the provider and managed by the provider.**

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/product.dart';
import '../screens/product_detail_screen.dart';

class ProductItem extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final product = Provider.of<Product>(context);

    return ClipRRect(
      borderRadius: BorderRadius.circular(10),
      child: GridTile(
        child: GestureDetector(
          onTap: () {
            Navigator.of(context).pushNamed(
              ProductDetailScreen.routeName,
              arguments: product.id,
            );
          },
          child: Image.network(
            product.imageUrl,
            fit: BoxFit.cover,
          ),
        ),
        footer: GridTileBar(
          backgroundColor: Colors.black87,
          leading: IconButton(
            icon: Icon(
                product.isFavourite ? Icons.favorite : Icons.favorite_border),
            onPressed: () {
              product.toggleFavoriteStatus();
            },
            color: Theme.of(context).accentColor,
          ),
          title: Text(
            product.title,
            textAlign: TextAlign.center,
          ),
          trailing: IconButton(
            icon: Icon(Icons.shopping_cart),
            onPressed: () {},
            color: Theme.of(context).accentColor,
          ),
        ),
      ),
    );
  }
}
```

## Alternative Provider Syntaxes `ChangeNotifierProvider.value(value: ..., child: ...)`:

Instead of using `ChangeNotifierProvider(create: (context) => products[index], child: ProductItem(),)`, there is an alternative approach, that is `ChangeNotifierProvider.value(value: products[index], child: ProductItem())`. </br></br>

There actually is an **important difference** between change notified provider dot value and the approach we had before with the builder function distort value approach. Here is the right approach you should use if you for example use a **provider on something that's part of a list or a grid**. Because of the issue I described in the last lecture where widgets are recycled by flatterer but the data that's attached to the widget changes when using change notifies provider dot value. You actually make sure that the provider works even if data changes for the widget. If you had a builder function that would not work correctly here it will work correctly because now the provider is tied to its data and is attached and detached to and from the widget. Instead of changing data being attached to the same provider.

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/products.dart';
import './product_item.dart';

class ProductsGrid extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Use the provider
    final productsData = Provider.of<Products>(context);
    final products = productsData.items;

    return GridView.builder(
      padding: const EdgeInsets.all(10.0),
      itemCount: products.length,
      itemBuilder: (context, index) => ChangeNotifierProvider.value(
        // Nested Provider
        value: products[index],
        child: ProductItem(),
      ),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 3 / 2,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
      ),
    );
  }
}
```

## `Consumer` instead of `Provider.of()`:

Almost same the `Consumer` and the `Provider.of()`. But there are some differences. When use the `Provider.of()`, then whole build method will rerun when that data changes. But you want a subpart that will run when the data changes, not the whole build method, though you can split the code as a way that only Provider.of() will run. For this, `Consumer` is more advantages in this case.</br></br>

Also you can use both at a time. If you want to fetch global data from the `Provider.of` but wrap that sub-widget which is required to re-render not the whole widget.

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/product.dart';
import '../screens/product_detail_screen.dart';

class ProductItem extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // final product = Provider.of<Product>(context);

    return Consumer<Product>(
      builder: (context, product, child) => ClipRRect(
        borderRadius: BorderRadius.circular(10),
        child: GridTile(
          child: GestureDetector(
            onTap: () {
              Navigator.of(context).pushNamed(
                ProductDetailScreen.routeName,
                arguments: product.id,
              );
            },
            child: Image.network(
              product.imageUrl,
              fit: BoxFit.cover,
            ),
          ),
          footer: GridTileBar(
            backgroundColor: Colors.black87,
            leading: IconButton(
              icon: Icon(
                  product.isFavourite ? Icons.favorite : Icons.favorite_border),
              onPressed: () {
                product.toggleFavoriteStatus();
              },
              color: Theme.of(context).accentColor,
            ),
            title: Text(
              product.title,
              textAlign: TextAlign.center,
            ),
            trailing: IconButton(
              icon: Icon(Icons.shopping_cart),
              onPressed: () {},
              color: Theme.of(context).accentColor,
            ),
          ),
        ),
      ),
      child: Text('It is the child of Consumer widget and Never changes!'),
    );
  }
}
```
The `child` of the `Consumer` widget.
```dart
Consumer<Product> (
  builder: (context, product, child) => IconButton(
    icon: Icon(Icons.favorite),
    label: child, // this child is referred to the child of the Consumer that is defined below.
    onPressed: () {}
  ),
  child: Text('Never changes!')
)
```

## Multiple Providers:

After initialing the Provider class, add the provider like before `main.dart` file has done.

```dart
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Multiple Provider
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (context) => Products(),
        ),
        ChangeNotifierProvider(
          create: (context) => Cart(),
        ),
      ],
      child: MaterialApp(
        title: 'MyShop',
        theme: ThemeData(
          primarySwatch: Colors.purple,
          accentColor: Colors.deepOrange,
          fontFamily: 'Lato',
        ),
        home: ProductsOverviewScreen(),
        routes: {
          ProductDetailScreen.routeName: (context) => ProductDetailScreen(),
        },
      ),
    );
  }
}
```


---

# More Widgets:

## `GridTile` Widget:

This is like `ListTile` widget but for `GridView`, though can use without `GridView`.

```dart
GridTile(
    child: Image.network(
        imageUrl,
        fit: BoxFit.cover,
    ),
    header: ...,
    footer: GridTileBar(
        backgroundColor: Colors.black54,
        leading: IconButton(
            icon: Icon(Icons.favorite),
            onPressed: () {},
        ),
        title: Text(
            title,
            textAlign: TextAlign.center,
        ),
        trailing: IconButton(
            icon: Icon(Icons.shopping_cart),
            onPressed: () {},
        ),
    ),
);
```

## `GridTileBar` Widget:

```dart
GridTile(
    child: Image.network(
        imageUrl,
        fit: BoxFit.cover,
    ),
    header: ...,
    footer: GridTileBar(
        backgroundColor: Colors.black54,
        leading: IconButton(
            icon: Icon(Icons.favorite),
            onPressed: () {},
        ),
        title: Text(
            title,
            textAlign: TextAlign.center,
        ),
        trailing: IconButton(
            icon: Icon(Icons.shopping_cart),
            onPressed: () {},
        ),
    ),
);
```
## `PopupMenuButton` Widget:

<img src = "https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/10.png" height = "500"/>

```dart
enum FilterOptions {
  Favorites,
  All,
}


Scaffold(
  appBar: AppBar(
    title: const Text('MyShop'),
    actions: <Widget>[
      PopupMenuButton(
        onSelected: (FilterOptions selectedValue) {
          print(selectedValue);
        },
        icon: Icon(
          Icons.more_vert,
        ),
        itemBuilder: (context) => [
          PopupMenuItem(
            child: Text('Only Favorites'),
            value: FilterOptions.Favorites,
          ),
          PopupMenuItem(
            child: Text('Show All'),
            value: FilterOptions.All,
          ),
        ],
      ),
    ],
  ),
  body: ProductsGrid(),
)
```

## `Chip` Widget:

```dart
Chip(
  label: Text('\$${cart.totalAmount}'),
  backgroundColor: Theme.of(context).primaryColor,
)
```

## `Spacer` Widget:
When using row and arranging the children widgets with space-between or other something, then one content have to arrange in left and other have to right, then add this widget in middle of them.

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  children: <Widget>[
    Text(
      'Total',
      style: TextStyle(
        fontSize: 20,
      ),
    ),
    Spacer(),
    Chip(
      label: Text(
        '\$${cart.totalAmount}',
        style: TextStyle(
          color:
              Theme.of(context).primaryTextTheme.headline6.color,
        ),
      ),
      backgroundColor: Theme.of(context).primaryColor,
    ),
    FlatButton(
      onPressed: () {},
      child: Text('ORDER NOW'),
      textColor: Theme.of(context).primaryColor,
    ),
  ],
)
```

## Avoid Import Naming Crash:

```dart
import '../providers/cart.dart' show Cart; // Import the specific that class which is required
import '../widgets/cart_item.dart' as ci; // If two class is same, then use as keyword to change one class name
```

## `Dismissible` Widget:

In android, if you swipe left to right or right to left then some icon or button is came up and something happened like delete an item. 

<img src = "https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/12.png" height = "550" alt = "Flutter"/>

```dart
Dismissible(
  key: ValueKey(id),
  direction:
      DismissDirection.endToStart, // swiping allow only right to left
  onDismissed: (direction) {
    Provider.of<Cart>(context, listen: false).removeItem(productId);
  },
  confirmDismiss: (direction) {
    // Have to return boolean because it takes future
    return showDialog(
      context: context,
      // ALertDialog(), showDialog(), aboutDialog()
      builder: (context) => AlertDialog(
        title: Text('Are you sure?'),
        content: Text('Do you want to remove the item from the cart?'),
        actions: <Widget>[
          FlatButton(
            child: Text('No'),
            onPressed: () {
              Navigator.of(context).pop(false);
            },
          ),
          FlatButton(
            child: Text('Yes'),
            onPressed: () {
              Navigator.of(context).pop(true);
            },
          ),
        ],
      ),
    );
  },
  background: Container(
    color: Theme.of(context).errorColor,
    child: Icon(
      Icons.delete,
      color: Colors.white,
      size: 40,
    ),
    alignment: Alignment.centerRight,
    padding: EdgeInsets.only(right: 20),
    margin: EdgeInsets.symmetric(
      horizontal: 15,
      vertical: 4,
    ),
  ),
  child: Card(
    margin: EdgeInsets.symmetric(horizontal: 15, vertical: 4),
    child: Padding(
      padding: EdgeInsets.all(8),
      child: ListTile(
        leading: CircleAvatar(
          child: Padding(
            padding: EdgeInsets.all(5),
            child: FittedBox(
              child: Text('\$$title'),
            ),
          ),
        ),
        title: Text(title),
        subtitle: Text('Total: \$${(price * quantity)}'),
        trailing: Text('$quantity x'),
      ),
    ),
  ),
);
```

# User Interaction:

## Open Drawer on some other button press:
This `Scaffold` will only work when the widget where this scaffold is used for open side drawer, has no scaffold. So there will be no two or more than two Scaffold in a widget. </br></br>
This drawer will open when the nearest scaffold has defined the drawer.
```dart
onPressed: () {
  cart.addItem(product.id, product.price, product.title);
  Scaffold.of(context).openDrawer();
}
```

## Popup Info `Snackbar` (Deprecated in Flutter 2, for that 2nd code block):

<img src = "https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/11.png" height = "550" alt = "Flutter"/>

```dart
onPressed: () {
  cart.addItem(product.id, product.price, product.title);
  // If more snackbar is popup, then hide the last and show the current
  Scaffold.of(context).hideCurrentSnackBar();
  Scaffold.of(context).showSnackBar(
    SnackBar(
      content: Text(
        'Added item to cart!',
      ),
      duration: Duration(
        seconds: 2,
      ),
      action: SnackBarAction(
        label: 'UNDO',
        onPressed: () {
          cart.removeSingleItem(product.id);
        },
      ),
    ),
  );
}
```

For flutter 2:

```dart
onPressed: () {
  cart.addItem(product.id, product.price, product.title);
  // If more snackbar is popup, then hide the last and show the current
  ScaffoldMessenger.of(context).hideCurrentSnackBar();
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(
        'Added item to cart!',
      ),
      duration: Duration(
        seconds: 2,
      ),
      action: SnackBarAction(
        label: 'UNDO',
        onPressed: () {
          cart.removeSingleItem(product.id);
        },
      ),
    ),
  );
}
```

## Alert PopUP `ALertDialog()`:

<img src = "https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/13.png" height = "550" alt = "Flutter"/>

```dart
showDialog(
  context: context,
  // ALertDialog(), showDialog(), aboutDialog()
  builder: (context) => AlertDialog(
    title: Text('Are you sure?'),
    content: Text('Do you want to remove the item from the cart?'),
    actions: <Widget>[
      FlatButton(
        child: Text('No'),
        onPressed: () {
          Navigator.of(context).pop(false);
        },
      ),
      FlatButton(
        child: Text('Yes'),
        onPressed: () {
          Navigator.of(context).pop(true);
        },
      ),
    ],
  ),
)
```

## User Input `Form` & `TextFormField`:

To get more suitable code, click [Here]().

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/products.dart';
import '../providers/product.dart';

class EditProductScreen extends StatefulWidget {
  static const routeName = '/edit-product';

  @override
  _EditProductScreenState createState() => _EditProductScreenState();
}

class _EditProductScreenState extends State<EditProductScreen> {
  final _priceFocusNode = FocusNode();
  final _descriptionFocusNode = FocusNode();
  final _imageUrlController = TextEditingController();
  final _imageUrlFocusNode = FocusNode();
  final _form = GlobalKey<FormState>();
  var _editedProduct = Product(
    id: null,
    title: '',
    price: 0,
    description: '',
    imageUrl: '',
  );

  @override
  void initState() {
    _imageUrlFocusNode.addListener(_updateImageUrl);
    super.initState();
  }

  // Have to dispose separately because flutter does not do this manually
  // So dispose Lifecycle is helful. If don't do this, then these occupy the memory
  // and memory leaks will happen.
  @override
  void dispose() {
    _imageUrlFocusNode.removeListener(_updateImageUrl);
    _priceFocusNode.dispose();
    _descriptionFocusNode.dispose();
    _imageUrlController.dispose();
    _imageUrlFocusNode.dispose();
    super.dispose();
  }

  void _updateImageUrl() {
    if (!_imageUrlFocusNode.hasFocus) {
      if (!_imageUrlController.text.startsWith('http') &&
          _imageUrlController.text.startsWith('https')) {
        return;
      }
      setState(() {});
    }
  }

  // submit the form
  void _saveForm() {
    final isValid = _form.currentState.validate();
    if (!isValid) {
      return;
    }
    _form.currentState.save();
    Provider.of<Products>(context, listen: false).addProduct(_editedProduct);
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Product'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.save),
            onPressed: _saveForm,
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _form,
          child: ListView(
            children: <Widget>[
              TextFormField(
                decoration: InputDecoration(
                  labelText: 'Title',
                  errorStyle: TextStyle(
                    color: Colors.red,
                  ),
                ),
                // What will be done when user pressed the bottom right key of the soft-keyboard
                textInputAction: TextInputAction.next,
                onFieldSubmitted: (value) {
                  FocusScope.of(context).requestFocus(_priceFocusNode);
                },
                validator: (value) {
                  // If return is null, then there is no validation error means input is correct
                  if (value.isEmpty) {
                    return 'Please provide a value.';
                  }
                  return null;
                },
                onSaved: (value) {
                  _editedProduct = Product(
                    title: value,
                    price: _editedProduct.price,
                    description: _editedProduct.description,
                    imageUrl: _editedProduct.imageUrl,
                    id: null,
                  );
                },
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Price'),
                textInputAction: TextInputAction.next,
                keyboardType: TextInputType.number,
                focusNode: _priceFocusNode,
                onFieldSubmitted: (value) {
                  FocusScope.of(context).requestFocus(_descriptionFocusNode);
                },
                validator: (value) {
                  if (value.isEmpty) {
                    return 'Please enter a price.';
                  }
                  if (double.tryParse(value) == null) {
                    return 'Please enter a valid number.';
                  }
                  if (double.parse(value) <= 0) {
                    return 'Please enter a number greater than zero.';
                  }
                  return null;
                },
                onSaved: (value) {
                  _editedProduct = Product(
                    title: _editedProduct.title,
                    price: double.parse(value),
                    description: _editedProduct.description,
                    imageUrl: _editedProduct.imageUrl,
                    id: null,
                  );
                },
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Description'),
                maxLines: 3,
                keyboardType: TextInputType.multiline,
                focusNode: _descriptionFocusNode,
                validator: (value) {
                  if (value.isEmpty) {
                    return 'Please enter a description.';
                  }
                  if (value.length > 10) {
                    return 'Should be atleast 10 characters long.';
                  }
                  return null;
                },
                onSaved: (value) {
                  _editedProduct = Product(
                    title: _editedProduct.title,
                    price: _editedProduct.price,
                    description: value,
                    imageUrl: _editedProduct.imageUrl,
                    id: null,
                  );
                },
              ),
              Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: <Widget>[
                  Container(
                    width: 100,
                    height: 100,
                    margin: EdgeInsets.only(
                      top: 8,
                      right: 10,
                    ),
                    decoration: BoxDecoration(
                      border: Border.all(width: 1, color: Colors.grey),
                    ),
                    child: _imageUrlController.text.isEmpty
                        ? Text('Enter a valid URL')
                        : FittedBox(
                            child: Image.network(
                              _imageUrlController.text,
                              fit: BoxFit.cover,
                            ),
                          ),
                  ),
                  Expanded(
                    child: TextFormField(
                      decoration: InputDecoration(
                        labelText: 'Image URL',
                      ),
                      keyboardType: TextInputType.url,
                      textInputAction: TextInputAction.done,
                      controller: _imageUrlController,
                      focusNode: _imageUrlFocusNode,
                      onFieldSubmitted: (value) {
                        _saveForm();
                      },
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Please enter an image URL';
                        }
                        if (!value.startsWith('http') &&
                            value.startsWith('https')) {
                          return 'Please enter a valid URL.';
                        }
                        return null;
                      },
                      onSaved: (value) {
                        _editedProduct = Product(
                          title: _editedProduct.title,
                          price: _editedProduct.price,
                          description: _editedProduct.description,
                          imageUrl: value,
                          id: null,
                        );
                      },
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

