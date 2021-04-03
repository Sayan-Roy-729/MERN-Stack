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

```dart
Dismissible(
  key: ValueKey(id),
  direction:
      DismissDirection.endToStart, // swiping allow only right to left
  onDismissed: (direction) {
    Provider.of<Cart>(context, listen: false).removeItem(productId);
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