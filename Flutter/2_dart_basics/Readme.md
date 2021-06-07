# Dart Basics

## Inheritance (`extends`) vs Mixins (`with`):

```dart
mixin Agility {
    var speed = 20;

    void sitDown() {
        print('Sitting down...');
    }
}

class Mammal {
    void breathe() {
        print('Breathe in... breathe out...');
    }
}

// Inherit with Mammal class
class Person extends Mammal with Agility{
    String name;
    int age;

    Person(this.name, this.age);

    @override
    void breathe() {
        //...
    }
}

void main() {
    final pers = Person('Sayan', 21);
    print(pers.name);

    pers.breathe();

    print(pers.speed);
    pers.sitDown();

    // Connection is much stronger between Person class and Mammal class than the connection
    // with Person class and Agility.
    // And only can inherit with only one Object. But mixin can add as many as you want.
}
```

# Futures & Async Code:

```dart
void main() {
    var result = 1 + 1;
    var myFuture = Future(() {
        return 'Hello';
    });
    print('This run first!');
    myFuture
        .then((result) => print(result))
        .catch((error) {
            print(error);
        });
    print('This is also runs before the future is done!');
}
```
