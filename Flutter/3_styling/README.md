# styling

A new Flutter project.

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
      transactions[index].title,
      style: Theme.of(context).textTheme.headline6,
    ),
    subtitle: Text(
      DateFormat.yMMMd().format(transactions[index].date),
    ),
  ),
)
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