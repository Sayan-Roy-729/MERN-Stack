# Native Device Features

## Image Picker & The Device Camera:
- [image_picker package](https://pub.dev/packages/image_picker)
- [path_provider package](https://pub.dev/packages/path_provider) for finding the path
- [path package](https://pub.dev/packages/path) For combining path
- [sqflite package](https://pub.dev/packages/sqflite) for store in the device

### Folder Structure:
```js
lib
├── helpers
│   └── db_helper.dart
├── models
│   └── place.dart
├── providers
│   └── great_places.dart
├── screens
│   └── app_place_screen.dart
├── widgets
│   └── image_input.dart
└── main.dart
```
### image_input.dart file
Access for take a picture
```dart
import 'dart:io'; // For access File Datatype
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart'; // For open the device camera
import 'package:path/path.dart' as path; // For add the image file path to the registered add directory
import 'package:path_provider/path_provider.dart' as syspaths; // For finding where app data will store

class ImageInput extends StatefulWidget {
  final Function onSelectImage;

  ImageInput(this.onSelectImage);

  @override
  _ImageInputState createState() => _ImageInputState();
}

class _ImageInputState extends State<ImageInput> {
  File _storedImage;

  // On Button click, open camera and store the image
  Future<void> _takePicture() async {
    final picker = ImagePicker();
    final imageFile = await picker.getImage(
      source: ImageSource.camera,
      // Set how many size of Image allow to user
      maxWidth: 600,
    );

    // If user simply return to the app without taking a picture, then simply return
    // to avoid the error
    if (imageFile == null) {
      return;
    }
    
    // Convert the image to file and store to the class property for preview the image
    setState(() {
      _storedImage = File(imageFile.path);
    });

    // Find that directory that is reserved for app data
    final appDirectory = await syspaths.getApplicationDocumentsDirectory();
    // imageFile.path is that path where the image file is currently stored
    final fileName = path.basename(imageFile.path);
    final savedImage =
        await File(imageFile.path).copy('${appDirectory.path}/$fileName');
    // Pass the image to the next method (Here, parent widget) 
    widget.onSelectImage(savedImage);
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Container(
          width: 150,
          height: 100,
          decoration: BoxDecoration(
            border: Border.all(width: 1, color: Colors.grey),
          ),
          child: _storedImage != null
              ? Image.file(
                  _storedImage,
                  fit: BoxFit.cover,
                  width: double.infinity,
                )
              : Text(
                  'No Image Taken',
                  textAlign: TextAlign.center,
                ),
          alignment: Alignment.center,
        ),
        SizedBox(
          width: 10,
        ),
        Expanded(
          child: FlatButton.icon(
            icon: Icon(Icons.camera),
            label: Text('Take Picture'),
            textColor: Theme.of(context).primaryColor,
            onPressed: _takePicture,
          ),
        ),
      ],
    );
  }
}
```

### app_place_screen.dart file:

```dart
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/image_input.dart';
import '../providers/great_places.dart';

class AddPlaceScreen extends StatefulWidget {
  static const routeName = '/add-place';

  @override
  _AddPlaceScreenState createState() => _AddPlaceScreenState();
}

class _AddPlaceScreenState extends State<AddPlaceScreen> {
  final _titleController = TextEditingController();
  File _pickedImage;
  
  // Accept the image from the child widget
  void _selectImage(File pickedImage) {
    _pickedImage = pickedImage;
  }
  
  // For saving the image, pass the image to the provider
  void _savePlace() {
    if (_titleController.text.isEmpty || _pickedImage == null) {
      return;
    }

    Provider.of<GreatePlaces>(context, listen: false)
        .addPlace(_titleController.text, _pickedImage);

    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add a New Place'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: EdgeInsets.all(10),
                child: Column(
                  children: <Widget>[
                    TextField(
                      decoration: InputDecoration(labelText: 'Title'),
                      controller: _titleController,
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    // Accept the image from the child widget
                    ImageInput(_selectImage),
                  ],
                ),
              ),
            ),
          ),
          RaisedButton.icon(
            icon: Icon(Icons.add),
            label: Text('Add Place'),
            elevation: 0,
            materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
            color: Theme.of(context).accentColor,
            // Save the image on button press
            onPressed: _savePlace,
          ),
        ],
      ),
    );
  }
}
```

### great_places.dart Provider:

```dart
import 'dart:io';
import 'package:flutter/cupertino.dart';

import '../models/place.dart';
import '../helpers/db_helper.dart';

class GreatePlaces with ChangeNotifier {
  List<Place> _items = [];

  List<Place> get items {
    return [..._items];
  }
  
  void addPlace(
    String title,
    File image,
  ) {
    final newPlace = Place(
      id: DateTime.now().toString(),
      title: title,
      image: image,
      location: null,
    );

    _items.add(newPlace);

    notifyListeners();

    // Store Image into the user device
    DBHelper.insert(
      'user_places',
      {
        'id': newPlace.id,
        'title': newPlace.title,
        'image': newPlace.image.path,
      },
    );
  }

  // Fetch the image from the user device
  Future<void> fetchAndSetPlaces() async {
    final dataList = await DBHelper.getData('user_places');
    _items = dataList
        .map(
          (item) => Place(
            id: item['id'],
            title: item['title'],
            location: null,
            image: File(item['image']),
          ),
        )
        .toList();

    notifyListeners();
  }
}
```

### db_helper.dart:

```dart
import 'package:sqflite/sqflite.dart' as sql;
import 'package:path/path.dart' as path;

class DBHelper {
  // Create the database connection
  static Future<dynamic> database() async {
    // Find the database directory of the user device 
    final dbPath = await sql.getDatabasesPath();

    // If database is already created then connect with that, otherwise
    // create database named places.db and connect with that
    return sql.openDatabase(path.join(dbPath, 'places.db'),
        onCreate: (db, version) {
        // Database query
      return db.execute(
          'CREATE TABLE user_places(id TEXT PRIMARY KEY, title TEXT, image TEXT)');
    }, version: 1);
  }

  // insert data
  static Future<void> insert(String table, Map<String, Object> data) async {
    final db = await DBHelper.database();
    db.insert(
      table,
      data,
      conflictAlgorithm: sql.ConflictAlgorithm.replace,
    );
  }

  // Get all the data
  static Future<List<Map<String, dynamic>>> getData(String table) async {
    final db = await DBHelper.database();
    return db.query(table);
  }
}
```

---

## User Location:

