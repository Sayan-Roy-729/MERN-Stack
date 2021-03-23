# basic_flutter_1

- Create a new flutter project `flutter create <projectName>`
- Can run the flutter project `flutter run` or in vs code run with `run without debugging`

## Get Started

### Simple Hello on the screen:
```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Text('Hello!'),
    );
  }
}
```
Result of the above code -->
![hello](https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/1.jpg)

### Improve litter by removing black background
```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('My First App'),
        ),
        body: Text('This is my default text!'),
      ),
    );
  }
}
```
Result of the above code -->
![flutter](![hello](https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/2.jpg))

