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
<img src = "https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/1.jpg" height = "300">

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
![flutter](https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/2.jpg)

### Stateless & Stateful Widgets:
![flutter](https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/3.png)

### Private Properties:
To prevent to use the class and the class properties and objects to other files, add `_` before the definition. E.g.

```dart
class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  var _questionIndex = 0;

  void _answerQuestion() {
    setState(() {
      _questionIndex += 1;
    });
    print(_questionIndex);
  }
  // Anonymous Functions

  @override
  Widget build(BuildContext context) {
    var questions = [
      'What\'s your favourite color?',
      'What\'s your favourite animal?',
    ];
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('My First App'),
        ),
        body: Column(
          children: [
            Text(questions[_questionIndex]),
```

### `final` keyword:
In StatelessWidget, sometime it gives warning that some class properties (which are for input data to the class) can be changed internally but the class or widget is Stateless, so it gives warning.
![flutter](https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/4.png)
To solve this issue, `final` keyword is used to tell the flutter is that, the value of that properties will never changed internally.
```dart
import 'package:flutter/material.dart';

class Question extends StatelessWidget {
  final String questionText;

  Question(this.questionText);

  @override
  Widget build(BuildContext context) {
    return Text(questionText);
  }
}
```

### How style the widgets (`Container` & `Text`):
```dart
Container(
  width: double.infinity,
  margin: EdgeInsets.all(10),
  child: Text(
    questionText,
    style: TextStyle(fontSize: 28),
    textAlign: TextAlign.center,
  ),
);
```

### Enums & Multiple Constructors:
```dart
class Person {
  String name;
  int age;

  // General Constructor
  Person({this.name, this.age = 30});

  // Again Constructor
  Person.veryOld(this.name) {
    age = 60;
  }
}

void main() {
  var p1 = Person(name: 'Sayan');
  var p2 = Person({age: 27, name: 'Sayan'});
  var p3 = Person.veryOld('Sayan');

  print(p3.name);
  print(p3.age);
}
```