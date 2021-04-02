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
