# navigation_screens

## Index:
| Sl. No. | Topic | Link |
| :---: | :---: | :---: |
| 1 | push() method | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#navigatorofcontextpush) |
| 2 | pushNamed() method | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#navigatorofcontextpush) |
| 3 | pushReplacement() method | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#navigatorofcontextpush) |
| 4 | Named Routes | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#named-routes) |
| 5 | static const routeName | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#deep-drive-into-named-routes) |
| 6 | onGenerateRoute  | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#ongenerateroute--onunknownroute) |
| 7 | onUnknownRoute | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#ongenerateroute--onunknownroute) |
| 8 | TabBar | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#tabbar-in-appbar) |
| 9 | Bottom TabBar | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#bottom-tabbar) |
| 10 | Drawer | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#add-drawer) |
| 11 | pushReplacementNamed() Method | [click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#pushreplacementnamed) |
| 12 | pop() Method | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#navigatorofcontextpop) |
| 13 | CLipRRect Widget | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#cliprrect-widget) |
| 14 | Network Image | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#network-images) |
| 15 | Card Widget | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#card-widget) |
| 16 | Stack Widget | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#stack-widget) |
| 17 | Positioned Widget | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#positioned-widget) |
| 18 | Dicider Widget | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#divider-widget) |
| 19 | SwitchListTile | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/4_navigation_screens#switchlisttile-widget) |

## `Navigator.of(context).push()`:

Stack the page on top each other pages.

```dart
class CategoryItem extends StatelessWidget {

  void selectCategory(BuildContext context) {
    // Navigator.of(context).pushNamed(routeName);
    // Navigator.of(context).pushReplacement(newRoute);
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) {
          return CategoryMealsScreen(id, title);
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => selectCategory(context),
      ),
    );
  }
}
```

## Named Routes:

For bigger apps, changing pages through `Navigator` is not fully controlled and if any error occurred, it is difficult to find the error. And to control which page the user is visiting, the named routes is very useful.<br>

For that, first register the route in the `main.dart` file.

```dart
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DeliMeals',
      theme: ThemeData(),
      home: CategoriesScreen(),
      // Register as route
      routes: {
        '/category-meals': (context) => CategoryMealsScreen(),
      },
    );
  }
}
```

Here, can't pass the details the requirements that are required to the Screen Widget through constructor. So there is a different way to pass the data.<br>
The page from where user will go the next page, have to pass that data that are required to the next screen page.

```dart
class CategoryItem extends StatelessWidget {

  void selectCategory(BuildContext context) {
    // Pass the data through named routes;
    // name of the routes "/category-meals" should match that is defined in main.dart file at the tile of registration
    Navigator.of(context).pushNamed(
      '/category-meals',
      arguments: {'id': id, 'title': title},
    );
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => selectCategory(context),
    );
  }
}
```

Extract the data and use them

```dart
import 'package:flutter/material.dart';

class CategoryMealsScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    // Extract the arguments passed to this page via modal route settions
    final routeArgs =
        ModalRoute.of(context).settings.arguments as Map<String, String>;
    final categoryId = routeArgs['id'];
    final categoryTitle = routeArgs['title'];

    return Scaffold(
      appBar: AppBar(
        title: Text(categoryTitle),
      ),
      body: Center(
        child: Text('The Recipes For The Category!'),
      ),
    );
  }
}
```

### Deep Drive into Named Routes:

Alternative to register as a default route when the app is first opened in `main.dart` file.

```dart
// home: CategoriesScreen(),
initialRoute: '/',
routes: {
  '/': (context) => CategoriesScreen(),
  CategoryMealsScreen.routeName: (context) => CategoryMealsScreen(),
},
```

To avoid typo (because in this case error can't find easily), the screen page add an `static const routeName` property and use that when required.

```dart
class CategoryMealsScreen extends StatelessWidget {
  static const routeName = '/category-meals';

  @override
  Widget build(BuildContext context) {
    final routeArgs =
        ModalRoute.of(context).settings.arguments as Map<String, String>;
    final categoryId = routeArgs['id'];
    final categoryTitle = routeArgs['title'];

    return Scaffold(
      appBar: AppBar(
        title: Text(categoryTitle),
      ),
      body: Center(
        child: Text('The Recipes For The Category!'),
      ),
    );
  }
}
```

Can connect the screens through the above method. But if the main.dart file methos or properties are required one of the route screen, then can pass that method or properties through of the constructor.

```dart
CategoryMealsScreen.routeName: (context) => CategoryMealsScreen(somethingCanPass);
```

## `onGenerateRoute` & `onUnknownRoute`:

```dart
// home: CategoriesScreen(),
initialRoute: '/',
routes: {
  '/': (context) => CategoriesScreen(),
  CategoryMealsScreen.routeName: (context) => CategoryMealsScreen(),
  // MealDetailScreen.routeName: (context) => MealDetailScreen(),
},
// When not registered the route name into the routes, then this route will go to this
// onGenerateRoute and then load the CategoriesScreen Widget as screen
onGenerateRoute: (settings) {
  print(settings.arguments);
  if (settings.name == '/meal-detail') {
    return ...;
  } else if (settings.name == '/something-else'){
    return ...;
  }
  return MaterialPageRoute(
    builder: (context) => CategoriesScreen(),
  );
},

// onUnknownRoute is reached when flutter failed to build the screen with all other measures.
// When defined nothing as a route and don't use onGenerateRoute, then as the last, it will be executed.
// It is like 404 page like web
onUnknownRoute: (settings) {
  return MaterialPageRoute(
    builder: (context) => CategoriesScreen(),
  );
},
```

## TabBar in AppBar:

<img src = "https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/7.png" height = "550"/>

```dart
class TabsSCreen extends StatefulWidget {
  @override
  _TabsSCreenState createState() => _TabsSCreenState();
}

class _TabsSCreenState extends State<TabsSCreen> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      // default is set as 0, if other value instead of 0, then that tab will be
      // shown when first time rendered.
      initialIndex: 0,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Meals'),
          bottom: TabBar(tabs: <Widget>[
            Tab(
              icon: Icon(
                Icons.category,
              ),
              text: 'Categories',
            ),
            Tab(
              icon: Icon(
                Icons.star,
              ),
              text: 'Favourite',
            ),
          ]),
        ),
        body: TabBarView(
          children: <Widget>[
            CategoriesScreen(),
            FavouritesScreen(),
          ],
        ),
      ),
    );
  }
}
```

## Bottom TabBar:

<img src = "https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/8.png" height = "550"/>

If you want to use the `type: BottomNavigationBarType.shifting`, then have to add `backgroundColor: Theme.of(context).primaryColor` separately. Otherwise the background will be white and the tabs can't see anymore.

```dart
class TabsSCreen extends StatefulWidget {
  @override
  _TabsSCreenState createState() => _TabsSCreenState();
}

class _TabsSCreenState extends State<TabsSCreen> {
  final List<Map<String, Object>> _pages = [
    {
      'page': CategoriesScreen(),
      'title': 'Categories',
    },
    {
      'page': FavouritesScreen(),
      'title': 'Your Favourites',
    },
  ];
  int _selectedPageIndex = 0;

  void _selectPage(int index) {
    setState(() {
      _selectedPageIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_pages[_selectedPageIndex]['title']),
      ),
      body: _pages[_selectedPageIndex]['page'],
      bottomNavigationBar: BottomNavigationBar(
        onTap: _selectPage,
        backgroundColor: Theme.of(context).primaryColor,
        unselectedItemColor: Colors.white,
        selectedItemColor: Theme.of(context).accentColor,
        currentIndex: _selectedPageIndex,
        // type: BottomNavigationBarType.shifting,
        items: [
          BottomNavigationBarItem(
            // backgroundColor: Theme.of(context).primaryColor,
            icon: Icon(Icons.category),
            label: 'Categories',
          ),
          BottomNavigationBarItem(
            // backgroundColor: Theme.of(context).primaryColor,
            icon: Icon(Icons.star),
            label: 'Favoutite',
          ),
        ],
      ),
    );
  }
}
```

## Add Drawer:

```dart
class TabsSCreen extends StatefulWidget {
  @override
  _TabsSCreenState createState() => _TabsSCreenState();
}

class _TabsSCreenState extends State<TabsSCreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_pages[_selectedPageIndex]['title']),
      ),
      // Add Drawer
      drawer: MainDrawer(),
    );
  }
}
```

Defined the main drawer widget

```dart
class MainDrawer extends StatelessWidget {
  Widget buildListTile(String title, IconData icon, Function tabHandler) {
    return ListTile(
      leading: Icon(
        icon,
        size: 26,
      ),
      title: Text(
        title,
        style: TextStyle(
          fontFamily: 'RobotoCondensed',
          fontSize: 24,
          fontWeight: FontWeight.bold,
        ),
      ),
      onTap: tabHandler,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: <Widget>[
          Container(
            height: 120,
            width: double.infinity,
            padding: EdgeInsets.all(20),
            alignment: Alignment.centerLeft,
            color: Theme.of(context).accentColor,
            child: Text(
              'Cooking Up!',
              style: TextStyle(
                fontWeight: FontWeight.w900,
                fontSize: 30,
                color: Theme.of(context).primaryColor,
              ),
            ),
          ),
          SizedBox(
            height: 20,
          ),
          buildListTile(
            'Meals',
            Icons.restaurant,
            () {
              Navigator.of(context).pushNamed('/');
            },
          ),
          buildListTile(
            'Filters',
            Icons.settings,
            () {
              Navigator.of(context).pushNamed(FiltersScreen.routeName);
            },
          ),
        ],
      ),
    );
  }
}
```

## `pushReplacementNamed`:
To avoid the infinitely growing the stack of the pages, this is used. It remove the last page from the stack and also increase performance if so many pages is opened and lots of memory is consumed and lacked the app. It will create an impact on user.
```dart
Navigator.of(context).pushReplacementNamed(FiltersScreen.routeName);
```

## `Navigator.of(context).pop()`:
Pop removes screens that are top of the stack. Dialog or ModalBottomSheet are most of the time closed with this method.

```dart
Navigator.of(context).pop();
```
Through `pop()`, passing data is optional. You can pass any types of data.

```dart
Navigator.of(context).pop(id);
```
WHen passing data through pop, you have to retrieve that data from that page from where you go to the popped page. E.g., you go page A to page B. And you pop the page B and pass a data through pop. So that data will retrieve from page A.

```dart
Navigator.of(context)
    .pushNamed(
  MealDetailScreen.routeName,
  arguments: id,
)
    .then((result) {
  print(result); // null or the passed data
  if (result != null) {
    removeItem(result);
  }
});
```

To retrieve the pop data, there is an `future` and called when popped the page. The passed data will received in the `result` argument. If you simply back through mobile back button, then this `result will be null`. If popped the page, then there will be the data that have been passed will store in that `result` argument.

# More Widgets:

## `CLipRRect` Widget:

When working with images, sometime to create a rounded border corners, then can't do directly with the image. For that, this widget helps to create rounded corners.

```dart
ClipRRect(
  borderRadius: BorderRadius.only(
    topLeft: Radius.circular(15),
    topRight: Radius.circular(15),
  ),
  child: Image.network(
    imageUrl,
    height: 250,
    width: double.infinity,
    fit: BoxFit.cover,
  ),
)
```

## Network Images:

```dart
ClipRRect(
  borderRadius: BorderRadius.only(
    topLeft: Radius.circular(15),
    topRight: Radius.circular(15),
  ),
  child: Image.network(
    imageUrl,
    height: 250,
    width: double.infinity,
    fit: BoxFit.cover,
  ),
)
```

## `Card` Widget:

```dart
Card(
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(15),
  ),
  elevation: 4,
  margin: EdgeInsets.all(10),
  child: Column(
    children: <Widget>[],
  ),
)
```

## `Stack` Widget:

This widget is used to position the widgets to top each-others in 3-dimensional directions.<br>
In this below code, the text is stacked on the image. And due to more hight and width, the image will take place the entire places and the text will be on the image.

```dart
Stack(
  children: <Widget>[
    ClipRRect(
      borderRadius: BorderRadius.only(
        topLeft: Radius.circular(15),
        topRight: Radius.circular(15),
      ),
      child: Image.network(
        imageUrl,
        height: 250,
        width: double.infinity,
        fit: BoxFit.cover,
      ),
    ),
    Positioned(
      bottom: 20,
      right: 10,
      child: Container(
        width: 300,
        color: Colors.black54,
        padding: EdgeInsets.symmetric(
          vertical: 5,
          horizontal: 20,
        ),
        child: Text(
          title,
          style: TextStyle(
            fontSize: 26,
            color: Colors.white,
          ),
          softWrap: true,
          overflow: TextOverflow.fade,
        ),
      ),
    ),
  ],
)
```

## `Positioned` Widget:

To position the children widgets of the `Stack` Widget, this `Positioned` Widget is used. It can't be used independently without using the `Stack` Widget.

```dart
Stack(
  children: <Widget>[
    ClipRRect(
      borderRadius: BorderRadius.only(
        topLeft: Radius.circular(15),
        topRight: Radius.circular(15),
      ),
      child: Image.network(
        imageUrl,
        height: 250,
        width: double.infinity,
        fit: BoxFit.cover,
      ),
    ),
    Positioned(
      bottom: 20,
      right: 10,
      child: Container(
        width: 300,
        color: Colors.black54,
        padding: EdgeInsets.symmetric(
          vertical: 5,
          horizontal: 20,
        ),
        child: Text(
          title,
          style: TextStyle(
            fontSize: 26,
            color: Colors.white,
          ),
          softWrap: true,
          overflow: TextOverflow.fade,
        ),
      ),
    ),
  ],
)
```

## `Divider` Widget:

To create a simple divider or a horizontal line, then this widget is used.

```dart
Divider(
  color: Colors.grey,
)
```

## `SwitchListTile` Widget:

Alternative of `Switch` widget. Advantages of this widget is can pass the label directly that creates a label. Don't required a separate widget to create a label.

```dart
SwitchListTile(
  value: currentValue,
  title: Text(title),
  subtitle: Text(subtitle),
  onChanged: (changesValue) {
    currentValue = changedValue;
  },
);
```
