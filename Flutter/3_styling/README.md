# styling

## Index:

| SL. NO. |            Topic             |                                                                Link                                                                 |
| :-----: | :--------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|    1    |        Column Widget         |                   [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#column-widget)                    |
|    2    |       Container Widget       |                  [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#container-widget)                  |
|    3    |         Text Widget          |                    [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#text-widget)                     |
|    4    |         Format Date          |           [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#format-date-with-intl-package)            |
|    5    |       TextField Widget       |                  [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#textfield-widget)                  |
|    6    | SingleChildScrollView Widget |            [click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#singlechildscrollview-widget)            |
|    7    |       ListView Widget        |                  [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#listview-widget)                   |
|    8    |         Icon Button          | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#icon-button-add-to-appbar-and-floatingactionbutton) |
|    9    |       Button on AppBar       | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#icon-button-add-to-appbar-and-floatingactionbutton) |
|   10    |     FloatingActionButton     | [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#icon-button-add-to-appbar-and-floatingactionbutton) |
|   11    |      Bottom Sheet Modal      |                 [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#bottom-sheet-modal)                 |
|   12    |   Widget Property in Class   |              [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#widget-property-in-class)              |
|   13    |            Theme             |                       [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#theme)                        |
|   14    |          Add Image           |                     [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#add-image)                      |
|   15    |       Add Assets Image       |                  [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#add-assets-image)                  |
|   16    |       SizedBox Widget        |                  [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#sizedbox-widget)                   |
|   17    | FractionallySizedBox Widget  |            [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#fractionallysizedbox-widget)             |
|   18    |         Stack Widget         |                    [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#stack-widget)                    |
|   19    |       Flexible Widget        |                      [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#flexible)                      |
|   20    |       Expanded Widget        |                  [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#expanded-widget)                   |
|   21    |       FittedBox Widget       |                  [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#fittedbox-widget)                  |
|   22    |        Padding Widget        |                   [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#padding-widget)                   |
|   23    |       ListTile Widget        |               [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#listtile--card-widget)                |
|   24    |         Card Widget          |               [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#listtile--card-widget)                |
|   25    |         Date Picker          |                     [Click](https://github.com/Sayan-Roy-729/MERN-Stack/tree/main/Flutter/3_styling#datepicker)                     |
|   26    |      FlatButton Widget       |                                                              [Click]()                                                              |
|   27    |        Switch Widget         |                                                              [Click]()                                                              |

## `Column` widget:

```dart
Column(
mainAxisAlignment: MainAxisAlignment.spaceAround,
    crossAxisAlignment: CrossAxisAlignment.center,
    children: <Widget>[
        Container(
        width: double.infinity,
        child: Card(
            color: Colors.blue,
            child: Text('CHART!'),
            elevation: 5,
        ),
        ),
        Card(
        color: Colors.red,
        child: Text('LIST OF TX'),
        ),
    ],
)
```

## `Container` Widget:

```dart
Container(
    margin: EdgeInsets.symmetric(
        vertical: 10,
        horizontal: 15,
    ),
    decoration: BoxDecoration(
        border: Border.all(
            color: Colors.black,
            width: 2,
        ),
    ),
    padding: EdgeInsets.all(10),
    child: Text(
        tx.amount.toString(),
    ),
)
```

## `Text` Widget:

```dart
Text(
    tx.amount.toString(),
    style: TextStyle(
        fontWeight: FontWeight.bold,
        fontSize: 20,
        color: Colors.purple,
    ),
)
```

## Format Date with [intl](https://pub.dev/packages/intl) package:

`flutter packages get`
**March 25, 2021 11:26:36 PM**

```dart
import 'package:intl/intl.dart';

DateFormat().format(tx.date);
```

**2021-03-25**
**2021/03/25**
**Mar 25, 2021**
**Letter for week days like Sun for Sunday**

```dart
import 'package/intl/intl.dart';

final weekDay = DateTime.now().subtract(
  Duration(
    days: index,
  ),
);

DateFormat('yyyy-MM-dd').format(tx.date);
DateFormat('yyyy/MM/dd').format(tx.date);
DateFormat.yMMMd().format(tx.date);
DateFormat.E().format(weekDay);
```

## `FlatButton` Widget:

-   Use Case - I: Without `Icon`

```dart
FlatButton(
    child: Text('Add Transcation'),
    textColor: Colors.purple,
    onPressed: () {
        print(titleInput);
        print(amountInput);
    },
)
```

-   Use Case - II: With `Icon and text`

```dart
FlatButton.icon(
  textColor: Theme.of(context).errorColor,
  onPressed: () => deleteTx(transactions[index].id),
  icon: Icon(Icons.delete),
  label: Text('Delete'),
)
```

## `TextField` Widget:

In the below code, every keystroke, the `onChanged` event will fire and store the input values into titleInput and amountInput which are class property. Then access these input values of button press on `FlatButton`. Thus inputs are merged with events.

```dart
Column(
    crossAxisAlignment: CrossAxisAlignment.end,
    children: [
        TextField(
            decoration: InputDecoration(
                labelText: 'Title',
            ),
            onChanged: (value) {
                titleInput = value;
            },
        ),
        TextField(
            decoration: InputDecoration(
                labelText: 'Amount',
            ),
            onChanged: (value) => amountInput = value,
        ),
        FlatButton(
            child: Text('Add Transcation'),
            textColor: Colors.purple,
            onPressed: () {
                print(titleInput);
                print(amountInput);
            },
        ),
    ],
),
```

Another way to register the input fields by using `TextEditingController`.

```dart
class MyApp ...... {

    // Ass class properties
    final titleController = TextEditingController();
    final amountController = TextEditingController();

    void submitData() {
        final enteredTitle = titleController.text;
        final enteredAmount = double.parse(amountController.text);

        if (enteredTitle.isEmpty || enteredAmount <= 0) {
            return;
        }

        addTx(
            enteredTitle,
            enteredAmount,
        );
    }

    ...... <build context>
    Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
                TextField(
                    decoration: InputDecoration(
                        labelText: 'Title',
                    ),
                    controller: titleController,
                    onSubmitted: (value) => submitData()
                ),
                TextField(
                    decoration: InputDecoration(
                        labelText: 'Amount',
                    ),
                    controller: amountController,
                    onSubmitted: (value) => submitData(),
                    keyboardType: TextInputType.number,
                ),
                FlatButton(
                    child: Text('Add Transcation'),
                    textColor: Colors.purple,
                    onPressed: submitData,
                ),
            ],
        );
}
```

## `SingleChildScrollView` Widget:

```dart
Scaffold(
    appBar: AppBar(
        title: Text('Flutter App'),
    ),
    body: SingleChildScrollView(
        child: Column(
            // mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
                Container(
                    width: double.infinity,
                    child: Card(
                    color: Colors.blue,
                    child: Text('CHART!'),
                    elevation: 5,
                    ),
                ),
                UserTransactions(),
            ],
        ),
    ),
)
```

The above code will work fine because the whole app is wrapped with this widget. But if you want to wrap only a specific widget, then it will not work, because it can't find the height of the contents and then scrolling functionality will not work properly.<br>
For that, specify the height of the parent widget and then add the `SingleChildScrollView` to the child.

```dart
Container(
    height: 300,
    child: SingleChildScrollView(
    child: Column(
        children: transactions.map((tx) {
        return Card(
            child: Row(
            children: <Widget>[
                Container(
                margin: EdgeInsets.symmetric(
                    vertical: 10,
                    horizontal: 15,
                ),
                decoration: BoxDecoration(
                    border: Border.all(
                    color: Colors.purple,
                    width: 2,
                    ),
                ),
                padding: EdgeInsets.all(10),
                child: Text(
                    '\$${tx.amount}',
                    style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                    color: Colors.purple,
                    ),
                ),
                ),
                Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                    Text(
                    tx.title,
                    style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                    ),
                    ),
                    Text(
                    DateFormat.yMMMd().format(tx.date),
                    style: TextStyle(
                        color: Colors.grey,
                    ),
                    ),
                ],
                ),
            ],
            ),
        );
        }).toList(),
    ),
    ),
);
```

## `ListView` Widget:

```dart
Container(
    height: 300,
    child: ListView(
        children: transactions.map((tx) {
            return Card(
                child: Row(
                    children: <Widget>[
                        Container(
                            margin: EdgeInsets.symmetric(
                                vertical: 10,
                                horizontal: 15,
                            ),
                            decoration: BoxDecoration(
                                border: Border.all(
                                    color: Colors.purple,
                                    width: 2,
                                ),
                            ),
                            padding: EdgeInsets.all(10),
                                child: Text(
                                '\$${tx.amount}',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 20,
                                    color: Colors.purple,
                                ),
                            ),
                        ),
                        Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                                Text(
                                    tx.title,
                                    style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    ),
                                ),
                                Text(
                                    DateFormat.yMMMd().format(tx.date),
                                    style: TextStyle(
                                    color: Colors.grey,
                                    ),
                                ),
                            ],
                        ),
                    ],
                ),
            );
        }).toList(),
    ),
);
```

`ListView` is the alternative of `SingleChildScrollView`. But have to wrap with `Container` widget with specific height, otherwise the `ListView` does not know how many have to add scrolling functionality, then it will specify infinite height and the contents can't see any more.<br><br><br>

**`ListView`** can be used in two ways

-   `ListView(children: [])`: The above code of ListView is with children. This listView has a flaw that it loads all list items at a time which consumes lots memory. So next method is preferable because it only loads that list items that are visible on the screen and optimisms the memory efficiency.
-   `ListView.builder()`

```dart
Container(
    height: 300,
    child: ListView.builder(
        itemCount: transactions.length,
        itemBuilder: (context, index) {
            return Card(
            child: Row(
                children: <Widget>[
                Container(
                    margin: EdgeInsets.symmetric(
                    vertical: 10,
                    horizontal: 15,
                    ),
                    decoration: BoxDecoration(
                    border: Border.all(
                        color: Colors.purple,
                        width: 2,
                    ),
                    ),
                    padding: EdgeInsets.all(10),
                    child: Text(
                    '\$${transactions[index].amount}',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                        color: Colors.purple,
                    ),
                    ),
                ),
                Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                    Text(
                        transactions[index].title,
                        style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        ),
                    ),
                    Text(
                        DateFormat.yMMMd().format(transactions[index].date),
                        style: TextStyle(
                        color: Colors.grey,
                        ),
                    ),
                    ],
                ),
                ],
            ),
            );
        },
    ),
);
```

## `Icon Button` (Add to` AppBar`) and `FloatingActionButton`:

```dart
@override
Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Text('Flutter App'),
            // Define AppBar Icon Button
            actions: <Widget>[
                IconButton(
                    icon: Icon(Icons.add),
                    onPressed: () {},
                )
            ],
        ),
        body: SingleChildScrollView(
            child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                    Container(
                        width: double.infinity,
                        child: Card(
                            color: Colors.blue,
                            child: Text('CHART!'),
                            elevation: 5,
                        ),
                    ),
                    UserTransactions(),
                ],
            ),
        ),
        // Define FloatingActionButton
        floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
        floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () {},
        ),
    );
}
```

## Bottom Sheet `Modal`:

```dart
class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final List<Transaction> _userTransactions = [
    Transaction(
      id: 't1',
      title: 'New Shoes',
      amount: 69.99,
      date: DateTime.now(),
    ),
    Transaction(
      id: 't2',
      title: 'Weekly Groceries',
      amount: 16.53,
      date: DateTime.now(),
    ),
  ];

  void _addNewTransaction(String txTitle, double txAmount) {
    final newTx = Transaction(
      id: DateTime.now().toString(),
      title: txTitle,
      amount: txAmount,
      date: DateTime.now(),
    );

    setState(() {
      _userTransactions.add(newTx);
    });
  }

  // Showing a Modal Bottom Sheet
  void _startAddNewTransaction(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (context) {
        return GestureDetector(
          onTap: () {},
          child: NewTransaction(_addNewTransaction),
          behavior: HitTestBehavior.opaque,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter App'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () => _startAddNewTransaction(context),
          )
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          // mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Container(
              width: double.infinity,
              child: Card(
                color: Colors.blue,
                child: Text('CHART!'),
                elevation: 5,
              ),
            ),
            TransactionList(_userTransactions),
          ],
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () => _startAddNewTransaction(context),
      ),
    );
  }
}
```

## `Widget` Property in Class:

In stateless widget classes, the properties value is stored from outside through the constructor. But in stateful widget, the two classes are used to maintain the state. For this, the properties that are required from outside, receives the main class through the constructor and pass that to the next class via `Widget`.

```dart
import 'package:flutter/material.dart';

class NewTransaction extends StatefulWidget {
  final Function addTx;

  NewTransaction(this.addTx);

  @override
  _NewTransactionState createState() => _NewTransactionState();
}

class _NewTransactionState extends State<NewTransaction> {
  final titleController = TextEditingController();

  final amountController = TextEditingController();

  void submitData() {
    final enteredTitle = titleController.text;
    final enteredAmount = double.parse(amountController.text);

    if (enteredTitle.isEmpty || enteredAmount <= 0) {
      return;
    }

    // receive from the State class
    widget.addTx(
      enteredTitle,
      enteredAmount,
    );

    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 5,
      child: Container(
        padding: EdgeInsets.all(10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: <Widget>[
            TextField(
              decoration: InputDecoration(
                labelText: 'Title',
              ),
              controller: titleController,
              onSubmitted: (value) => submitData(),
            ),
            TextField(
              decoration: InputDecoration(
                labelText: 'Amount',
              ),
              keyboardType: TextInputType.number,
              controller: amountController,
              onSubmitted: (value) => submitData(),
            ),
            FlatButton(
              child: Text('Add Transcation'),
              textColor: Colors.purple,
              onPressed: submitData,
            ),
          ],
        ),
      ),
    );
  }
}
```

## Theme:

For theming, the theme properties have to define inside the MaterialApp.

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Personal Expenses',
      theme: ThemeData(
        primarySwatch: Colors.purple,
        accentColor: Colors.amber,
        fontFamily: 'Quicksand',
        textTheme: ThemeData.light().textTheme.copyWith(
              headline6: TextStyle(
                fontFamily: 'OpenSans',
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
        // Apply to the AppBar
        appBarTheme: AppBarTheme(
          textTheme: ThemeData.light().textTheme.copyWith(
                headline6: TextStyle(
                  fontFamily: 'OpenSans',
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
        ),
      ),
      home: MyHomePage(),
    );
  }
}
```

Use the defined theme

```dart
Text(
    'Using the theme',
    style: TextStyle(
        fontWeight: FontWeight.bold,
        fontSize: 20,
        color: Theme.of(context).primaryColor,
    ),
)

Text(
  transactions[index].title,
  style: Theme.of(context).textTheme.headline6,
)
```

## Add Image:

### Add assets image:

```dart
Container(
  height: 200,
  child: Image.asset(
    'assets/images/waiting.png',
    fit: BoxFit.cover,
  ),
)
```

## `SizedBox` Widget:

This is the widget which is used to separate two other widget next to each other. It takes height and width with or without child.

```dart
Column(
  children: <Widget>[
    Text(
      'No Transactions added yet!',
      style: Theme.of(context).textTheme.headline6,
    ),
    SizedBox(
      height: 10,
    ),
    Container(
      height: 200,
      child: Image.asset(
        'assets/images/waiting.png',
        fit: BoxFit.cover,
      ),
    ),
  ],
)
```

## `FractionallySizedBox` Widget:

This widget allows to create a box as a fraction of another value. The `heightFactor` and `widthFactor` takes the value between 0 to 1 and according to that, it takes height and width of the parent height and width.

```dart
FractionallySizedBox(
  heightFactor: 0.7,
  child: Container(
    decoration: BoxDecoration(
      color: Theme.of(context).primaryColor,
      borderRadius: BorderRadius.circular(10),
    ),
  ),
)
```

## `Stack` Widget:

This widget helps to create a stack of widgets and very useful to create 3d views.

```dart
Container(
  height: 60,
  width: 10,
  child: Stack(
    children: <Widget>[
      Container(
        decoration: BoxDecoration(
          border: Border.all(
            color: Colors.grey,
            width: 1.0,
          ),
          color: Color.fromRGBO(220, 220, 220, 1),
          borderRadius: BorderRadius.circular(20),
        ),
      ),
      FractionallySizedBox(
        heightFactor: spendingPctOfTotal,
        child: Container(
          decoration: BoxDecoration(
            color: Theme.of(context).primaryColor,
            borderRadius: BorderRadius.circular(10),
          ),
        ),
      ),
    ],
  ),
)
```

## `Flexible`:

This widget is used when the child height and width goes on to the other child's content, mainly it prevent the overflow.<br>
Here, ChartBat is custom widget.

```dart
Flexible(
  flex: 2,
  fit: FlexFit.tight,
  child: ChartBar(
    data['day'],
    data['amount'],
    totalSpending == 0.0
        ? 0.0
        : (data['amount'] as double) / totalSpending,
  ),
)
```

`fit: FlexFit.loose` is by-default. It means that the child of `Flexible` widget items basically should keep its size and use that size in the surrounding row and column.<br>
`fit: FlexFit.tight` The child takes all the available size without shrink the other widgets' size. It the child gives width and also specify this tight property, then width will be ignored.<br>

If two next widgets are wrapped with `Flexible` widget with `fit: FlexFit.tight`, then these two widgets takes the available space and divide equal between them.<br>

`Flex: 1` is the by-default. Two `Flexible` widget get equal available space. If `Flex: 2` is set to the first `Flexible` widget and `Flex: 1` to the 2nd `Flexible` widget, then the first widget takes 2 times space of the second widget. It means that the first widget takes 2/3 of available space and the second one takes 1/3 available scape because flex 2 + flex 1 = 3 total space.<br>

## `Expanded` Widget:

The replacement of `Flexible widget` of `fit: FlexFit.tight`.

## `FittedBox` Widget:

This widget forces its child into the available space.

```dart
FittedBox(child: Text('\$${spendingAmount.toStringAsFixed(0)}'), )
```

## `Padding` Widget:

Alternative of `Container` widget if you want to give only padding to the `Container` Widget.

```dart
Padding(
  padding: EdgeInsets.all(10),
  child: Row(
    mainAxisAlignment: MainAxisAlignment.spaceAround,
    children: groupedTransactionValues.map((data) {
      return Flexible(
        fit: FlexFit.tight,
        // ChartBar is a custom widget
        child: ChartBar(
          data['day'],
          data['amount'],
          totalSpending == 0.0
              ? 0.0
              : (data['amount'] as double) / totalSpending,
        ),
      );
    }).toList(),
  ),
)
```

## `ListTile` & `Card` Widget:

This is used to create beautiful list with circle avatar.

```dart
Card(
  elevation: 5,
  margin: EdgeInsets.symmetric(
    vertical: 8,
    horizontal: 5,
  ),
  child: ListTile(
    leading: CircleAvatar(
      radius: 30,
      child: Padding(
        padding: EdgeInsets.all(6),
        child: FittedBox(
          child: Text(
            '\$${transactions[index].amount}',
          ),
        ),
      ),
    ),
    title: Text(
      'Main Title',
      style: Theme.of(context).textTheme.headline6,
    ),
    subtitle: Text(
      'SubTitle',
    ),
    // Right side of the list
    trailing: IconButton(
      icon: Icon(
        Icons.delete,
      ),
      color: Theme.of(context).errorColor,
      onPressed: () => deleteTx(transactions[index].id),
    ),
  ),
);
```

## DatePicker:

```dart
// Date picker Method
void _presentDatePicker() {
  showDatePicker(
    context: context,
    initialDate: DateTime.now(),
    firstDate: DateTime(2019),
    lastDate: DateTime.now(),
  ).then((pickedDate) {
    // If user pressed cancel, then pickedDate = null
    if (pickedDate == null) {
      return;
    }
    setState(() {
      _selectedDate = pickedDate;
    });
  });
}

// Widgets
Container(
  height: 70,
  child: Row(
    children: <Widget>[
      Expanded(
        child: Text(
          _selectedDate == null
              ? 'No Date Chosen!'
              : 'Picked Date: ${DateFormat.yMd().format(_selectedDate)}',
        ),
      ),
      FlatButton(
        textColor: Theme.of(context).primaryColor,
        child: Text(
          'Choose Date',
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
        onPressed: _presentDatePicker,
      ),
    ],
  ),
)
```

## `Switch` Widget:

Switch is toggle like button. For this widget, **`statefulWidget`** is required.

```dart
bool _showChart = false;

Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    Text('Show Chart'),
    Switch(
      value: _showChart,
      onChanged: (value) {
        setState(() {
          _showChart = value;
        });
      },
    ),
  ],
)
```

---

# Responsiveness:

## Device Height (`MediaQuery`):

```dart
Container(
  height: (MediaQuery.of(context).size.height -
          appBar.preferredSize.height -
          MediaQuery.of(context).padding.top) *
      0.4,
  child: Chart(_recentTransactions),
)
```

`MediaQuery.of(context).size.height` gives the total height of the device screen. In this height. the `AppBar` height and `StatusBar` height are also included. So deduct the height of AbbBar, the total AppBar widget store in a variable called `appBar` and use that. To get the height of the appbar, `appBar.preferredSize.height` is used and to deduct the height of the statusbar, `MediaQuery.of(contest).padding.top` is used. Last have to multiply `0.4` according to the requirement of the height.

## `textScaleFactor` ('MediaQuery'):

The `MediaQuery` offers way more than that of height and width. On particularly interesting property is the `textScaleFactor` property.

```dart
final curScaleFactor = MediaQuery.of(context).textScaleFactor;
```

`textScaleFactor` tells you by how much text output in the app should be scaled. Users can change this in their mobile phone / device settings.<br>
Depending on your app, you might want to consider using this piece of information when setting font sizes.
_Consider this example:_

```dart
Text('Always the same size!', style: TextStyle(fontSize: 20));
```

This text ALWAYS has a size of 20 device pixels, no matter what the user changed in his/her device settings.<br>

```dart
Text('This changes!', style: TextStyle(fontSize: 20 * curScaleFactor));
```

This text on the other hand also has a size of 20 if the user didn't change anything in the settings (because `textScaleFactor` by default is 1). But if changes were made, the font size of this text respects the user settings.

## `LayoutBuilder` Widget:

In depth of the widget tree, there the height calculation is not possible so much. So, in that case, `LayoutBuilder` takes place.

```dart
LayoutBuilder(builder: (context, constraints) {
  return Column(children: <Widget>[
    Container(
      height: constraints.maxHeight * 0.7,
      child: Text('maxHeight is the height specified to the parent Widget Column and this container widget takes 70% height of the height'),
    ),
  ],);
});
```

## Device Orientation as Portrait:

Restrict the device into portrait mode, if the device is set as landscape more though, the orientation of the app is not changed.

```dart
import 'package:flutter/services.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  runApp(MyApp());
}
```

## Showing Different Content Based on Device Orientation (Find Device Orientation):

```dart
final _isLandscape = MediaQuery.of(context).orientation == Orientation.landscape;

if (_isLandscape)
  Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      Text('Show Chart'),
      Switch(
        value: _showChart,
        onChanged: (value) {
          setState(() {
            _showChart = value;
          });
        },
      ),
    ],
  ),
if (!_isLandscape)
  Container(
    height: (MediaQuery.of(context).size.height -
            appBar.preferredSize.height -
            MediaQuery.of(context).padding.top) *
        0.3,
    child: Chart(_recentTransactions),
  ),
if (!_isLandscape) txListWidget,
if (_isLandscape)
  _showChart
      ? Container(
          height: (MediaQuery.of(context).size.height -
                  appBar.preferredSize.height -
                  MediaQuery.of(context).padding.top) *
              0.7,
          child: Chart(_recentTransactions),
        )
      : txListWidget,
```

## Adjust SoftKeyboard For User Input:

```dart
Container(
    padding: EdgeInsets.only(
      top: 10,
      left: 10,
      right: 10,
      // This gives the information about anything that's lapping into the view (here softKeyboard)
      bottom: MediaQuery.of(context).viewInsets.bottom + 10,
    ),
    child: Column(...
```

```dart
Card(
  elevation: 5,
  child: Container(
    padding: EdgeInsets.only(
      top: 10,
      left: 10,
      right: 10,
      // This gives the information about anything that's lapping into the view (here softKeyboard)
      bottom: MediaQuery.of(context).viewInsets.bottom + 10,
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: <Widget>[
        TextField(
          decoration: InputDecoration(
            labelText: 'Title',
          ),
          controller: _titleController,
          onSubmitted: (value) => _submitData(),
        ),
        TextField(
          decoration: InputDecoration(
            labelText: 'Amount',
          ),
          keyboardType: TextInputType.number,
          controller: _amountController,
          onSubmitted: (value) => _submitData(),
        ),
        Container(
          height: 70,
          child: Row(
            children: <Widget>[
              Expanded(
                child: Text(
                  _selectedDate == null
                      ? 'No Date Chosen!'
                      : 'Picked Date: ${DateFormat.yMd().format(_selectedDate)}',
                ),
              ),
              FlatButton(
                textColor: Theme.of(context).primaryColor,
                child: Text(
                  'Choose Date',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                onPressed: _presentDatePicker,
              ),
            ],
          ),
        ),
        RaisedButton(
          child: Text('Add Transcation'),
          color: Theme.of(context).primaryColor,
          textColor: Theme.of(context).textTheme.button.color,
          onPressed: _submitData,
        ),
      ],
    ),
  ),
)
```

## Checking Device Platform:

-   This below switch will automatically adjust with device platform by using `Switch.adaptive()`.

```dart
Switch.adaptive(
  activeColor: Theme.of(context).accentColor,
  value: _showChart,
  onChanged: (value) {
    setState(() {
      _showChart = value;
    });
  },
)
```

-   Checking Device Platform:

```dart
import 'dart.io';

Platform.isIOS ? Container() : FloatingActionButton();
```

## `SafeArea` Widget:

This widget helps to adjust the widget tree where there are top notch or something where widgets can't take places, for that `SafeArea` widget is used.

```dart
SafeArea(child: SingleChildScrollView(),);
```

---

## Widget Lifecycle:

### Stateless Widgets:

Constructor Function => build()

## Stateful Widget:

Constructor Function => initState() => build() => setState() => didUpdateWidget() => build() => dispose()

```dart
class NewTransaction extends StatefulWidget {
  final Function addTx;

  NewTransaction(this.addTx);

  @override
  _NewTransactionState createState() => _NewTransactionState();
}

class _NewTransactionState extends State<NewTransaction> {

  _NewTransactionState() {
    print('Constructor NewTransaction State');
  }

  @override
  void initState() {
    // TODO: implement initState
    // Here make http request or data from server
    // Here, don't allow to use setState
    print('NewTransaction init state');
    super.initState();
  }

  @override
  void didUpdateWidget(NewTransaction oldWidget) {
    // TODO: implement didUpdateWidget
    print('NewTransaction didUpdateWidget');
    super.didUpdateWidget(oldWidget);
  }

  @override
  void dispose() {
    // TODO: implement dispose; when widget is removed then this is called
    print('NewTransaction dispose');
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Text('Widget Lifecycle');
  }
}
```

## App Lifecycle:

| Lifecycle State Name |                   When is it hit?                   |
| :------------------: | :-------------------------------------------------: |
|       inactive       |       App is inactive, no user input received       |
|        paused        |   App not visible to user, running in background    |
|       resumed        | App is (again) visible and responding to user input |
|      suspending      |        App is about to be suspended (exited)        |

```dart
class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

// Create Mixing by `with` keyword
class _MyHomePageState extends State<MyHomePage> with WidgetsBindingObserver {

  // When the lifecycle of the app changes, want to go to the certain observer
  // and call `didChangedAppLifecycleState` method
  @override
  void initState() {
    WidgetsBinding,instance.addObserver(this);
    super.initState();
  }

  // This method is called when the lifecycle of the app will change
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    print(state);
  }

  @override
  dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }
}
```

## `Key & super(key: key)`:

Every widget in flutter can have an key.

```dart
import 'dart:math';
import 'package:flutter/material.dart';

class TransactionItem extends StatefulWidget {
  const TransactionItem({
    Key key,
    @required this.transaction,
    @required this.deleteTx,
  }) : super(key: key);

  final Transaction transaction,
  final Function deleteTx;

  @override
  _TransactionItemState createState() => _TransactionItemState();
}

class _TransactionItemState extends State<TransactionItem> {

  Color _bgColor;

  @override
  void initState() {
    const availableColors = [Colors.red, Colors.black, Colors.blue, Colors.purple];
    _bgColor = availableColors[Random().nextInt(4)];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('Hello World!', textColor: _bgColor,),
    );
  }
}
```
When calling or using the Widget Class, When passing the keys, there are two types of key, `UniqueKey` and `ValueKey`. `UniqueKey` is not recommended to use because when a simple widget updates, then the `UniqueKey` will generate a new key and re-render the whole Widget though there is no require to re-render so much. This problem solves by `ValueKey` and what is assigned it takes that don't change for every small update and thus the whole widget is not re-render and increase the performance of the app.  
```dart
ListView(
  children: transactions.map((item) => TransactionItem(
    // key: UniqueKey(),
    key: ValueKey(item.id),
    transaction: item,
    deleteTx: deleteTx.
  )).toList();
);
```
