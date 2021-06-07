// Objects
class Person {
  String name;
  int age;

  // Constructor
  // Person({String name, int age = 30}) {
  //   this.name = name;
  //   this.age = age;
  // }
  Person({this.name, this.age = 30});
}

// Fu7nhctions
double addNumbers(double num1, double num2) {
  // print(num1 + num2);
  return num1 + num2;
}

// int num1
// double num2
// num num3

void main() {
  // Create instance
  var p1 = Person(name: 'Sayan', age: 30);

  var firstResult = addNumbers(1, 2);
  print(firstResult);

  print(p1.name);
  print(p1.age);

  print('Hello');
}
