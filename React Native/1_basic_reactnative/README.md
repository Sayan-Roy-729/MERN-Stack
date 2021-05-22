# React Native Basics:

## Index:

| SL NO |              Topic              |   Link    |
| :---: | :-----------------------------: | :-------: |
|   1   |          Button Widget          | [Click]() |
|   2   |           Text Widget           | [Click]() |
|   3   |           StyleSheet            | [Click]() |
|   4   |           View Widget           | [Click]() |
|   5   |        TextInput Widget         | [Click]() |
|   6   |        ScrollView Widget        | [Click]() |
|   7   |         FlatList Widget         | [Click]() |
|   8   |        Touchable Widget         | [Click]() |
|   9   |     TouchableOpacity Widget     | [Click]() |
|  10   |    TouchableHighlight Widget    | [Click]() |
|  11   | TouchableNativeFeedback Widget  | [Click]() |
|  12   | TouchableWithoutFeedback Widget | [Click]() |
|  13   |          Modal Widget           | [Click]() |


## `View`, `Button`, `Text`, `TextInput`, `FlatList` & 'ScrollView'  Widget:
- `View` widget is a warper or container of any widget. It is used to  styling of other widget.
- `Button` widget is for event handling.
- `Text` widget is to display some string or text into display.
- `TextInput` widget is used to take user input.
- `ScrollView` widget is used to add scrolling functionality into the app. It can be used as a whole widget of a app or as a warper of a widget.
- `FlatList` is used when many more list items have to be rendered. It only renders only those items which will be into the device screen. It increases the performance of the app.  

```js
export default function App() {
    const [courseGoals, setCourseGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false); 

    const addGoalHandler = (goalTitle) => {
        setCourseGoals((currentGoals) => [
            ...currentGoals,
            { id: Math.random().toString(), value: goalTitle },
        ]);
        setIsAddMode(false);
    };

    const removeGoalHandler = goalId => {
        setCourseGoals(currentGoals => {
            return currentGoals.filter((goal) => goal.id !== goalId);
        });
    };

    const cancelGoalAdditionHandler = () => {
        setIsAddMode(false);
    };

    return (
        <View style={styles.screen}>
            <Button title = 'Add New Goal' onPress = {() => setIsAddMode(true)}/>
            <GoalInput onAddGoal = {addGoalHandler} visible = {isAddMode} onCancel = {cancelGoalAdditionHandler}/>

            <ScrollView>
                {courseGoals.map((goal, index) => (
                    <View key={index} style={styles.listItem}>
                        <Text>{goal}</Text>
                    </View>
                ))}
            </ScrollView>

            <TextInput
                placeholder="Course Goal"
                style={styles.input}
                value={enteredGoal}
                onChangeText={goalInputHandler}
                blurOnSubmit 
                autoCapitalize='none' 
                autoCorrect = {false} 
                keyboardType = 'number-pad' 
                maxLength = {2}
            />

            <FlatList
                keyExtractor={(item, index) => item.id}
                data={courseGoals}
                renderItem={(itemData) => (
                    <View style={styles.listItem} >
                        <Text>{itemData.item.title}</Text>
                    </View>
                )}
            />
        </View>
    );
}

// For styling
const styles = StyleSheet.create({
    screen: {
        padding: 50,
    },
});
```

## Touchable, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback & TouchableWithoutFeedback Widget:

These widgets are used to add events of a widget. These widgets create different types of visualization effects when events are triggered. 

```js
<TouchableOpacity onPress={props.OnDelete} activeOpacity={0.7}>
    <View style={styles.listItem}>
        <Text>{props.title}</Text>
    </View>
</TouchableOpacity>
```

```js
<TouchableNativeFeedback onPress={props.OnDelete} useForeground>
    <View style={styles.listItem}>
        <Text>{props.title}</Text>
    </View>
</TouchableNativeFeedback>
```

## Modal Widget:
When `visible` will be `true`, modal will be open and vice-versa.  
```js
<Modal visible = {props.visible} animationType='slide'>
    <View style={styles.inputContainer}>
        <TextInput
            placeholder="Course Goal"
            style={styles.input}
            value={enteredGoal}
            onChangeText={goalInputHandler}
        />
        <View style = {styles.buttonContainer}>
            <View style = {styles.button}>
                <Button title='CANCEL' color='red' onPress={props.onCancel}/>
            </View>
            <View style = {styles.button}>
                <Button title="ADD" onPress={addGoalHandler}/>
            </View>
        </View>
    </View><Modal visible = {props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Course Goal"
                    style={styles.input}
                    value={enteredGoal}
                    onChangeText={goalInputHandler}
                />
                <View style = {styles.buttonContainer}>
                    <View style = {styles.button}>
                        <Button title='CANCEL' color='red' onPress={props.onCancel}/>
                    </View>
                    <View style = {styles.button}>
                        <Button title="ADD" onPress={addGoalHandler}/>
                    </View>
                </View>
            </View>
        </Modal>
</Modal>
```

