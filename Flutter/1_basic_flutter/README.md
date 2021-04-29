# basic_flutter_1

-   Create a new flutter project `flutter create <projectName>`
-   Can run the flutter project `flutter run` or in vs code run with `run without debugging`

## Get Started

## Index
| SL. NO. |            Topic             |                                                                Link                                                                 |
| :-----: | :--------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|    1    |Simple Hello World(MaterialApp)|                   [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/1_basic_flutter#simple-hello-on-the-screen) |
|    2    |Scaffold| [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/1_basic_flutter#improve-litter-by-removing-black-background)          |
| 3 | Stateless & Stateful Widget | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/1_basic_flutter#stateless--stateful-widgets) |
| 4 | Private Class Property | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/1_basic_flutter#private-properties) |
| 5 | final & const | [click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/1_basic_flutter#final-vs-const-keyword) |
| 6 | Enum & Multiple Constructor | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/1_basic_flutter#enums--multiple-constructors) |
| 7 | getter | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/1_basic_flutter#getter) |


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
<img src = "https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/1.jpg" height = "500">

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
<img src = "https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/2.jpg" height = "500">

### Stateless & Stateful Widgets:

<img src = "https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/3.png" height = "700">

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
            Text(questions[_questionIndex]))
            ))}},
```

### `final` vs `const` keyword:

In StatelessWidget, sometime it gives warning that some class properties (which are for input data to the class) can be changed internally but the class or widget is Stateless, so it gives warning.
<img src = "https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/flutter/4.png" height = "400" />
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

Now `const`. Const is for compile time constant. It will never change through out the app. But `final` keyword is run time constant. After the value is initializing the value, then the value is not changed.<br>
Another case of `const` where you want to use.

```dart
var dummy = ['Hello'];
dummy.add('Sayan');
print(dummy);
```
This code will execute perfectly. But below code will not, because rather than const the variable, you const the value that is assigned in the variable. So can't change the value and it throws errors.

```dart
var dummy = const ['Hello'];
dummy.add('Sayan');
print(duppy);
```

But below code will be executed perfectly. Because you const the variable, not the value.

```dart
const dummy = ['Hello'];
dummy.add('Sayan');
print(duppy);
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

### Mapping through the list to the surrounding widget:

```dart
var questions = [
  {
    'questionText': 'What\'s your favourite color?',
    'answers': [
      'Black',
      'Red',
      'Green',
      'White',
    ],
  },
  {
    'questionText': 'What\'s your favourite animal?',
    'answers': [
      'Rabbit',
      'Snake',
      'Elephant',
      'Lion',
    ],
  },
  {
    'questionText': 'Who\'s your favourite instructor?',
    'answers': [
      'Max',
      'Max',
      'Max',
      'Max',
    ],
  },
];

Column(
  children: [
    Question(questions[_questionIndex]['questionText']),
    ...(questions[_questionIndex]['answers'] as List<String>)
        .map((answer) {
      return Answer(_answerQuestion, answer);
    }).toList()
  ],
),
```
### `Center Widget`:
To center a widget horizontally and vertically, then this widget is helpful.
```dart
Center(
  child: Text('You did it!'),
)
```

### `Getter`:
In a class, when the widgets are used and don't want to use directly the class properties, that's mean that you want to modify the class properties then `getter` is used. e.g.
```dart
import 'package:flutter/material.dart';

class Result extends StatelessWidget {
  final int resultScore;

  Result(this.resultScore);

  // Set getter
  String get resultPhrase {
    String resultText;

    if (resultScore <= 8) {
      resultText = 'You are awesome and innocent!';
    } else if (resultScore <= 12) {
      resultText = 'Pretty likeable!';
    } else if (resultScore <= 16) {
      resultText = 'You are ... strange?!';
    } else {
      resultText = 'You are so bad!';
    }

    return resultText;
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        resultPhrase,
        style: TextStyle(
          fontSize: 36,
          fontWeight: FontWeight.bold,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
```

### Convert old widget button to new widget button:
