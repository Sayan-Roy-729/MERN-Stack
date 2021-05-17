# Styling

## Close keyboard when clicking other places of the screen:

```js
import { TouchableWithoutFeedback, Keyboard, TextInput, View } from 'react-native';

const Component = props => {
    return (
        <TouchableWithoutFeedback onPress = {() => {
            Keyboard.dismiss();
        }}>
            <View>
                {props.children}
            </View>
            <TextInput />
        </TouchableWithoutFeedback>
    );
}; 
```

## Alert:
```js
import {Alert} from 'react-native';

const AlertContainer = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [
                    {
                        text: 'Okay',
                        style: 'destructive',
                        onPress: resetInputHandler,
                    },
                ]
            );
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
    };

    return (
        <View>{props.children}</View>
    );
};
```

## Add Custom Fonts:
First download the required fonts and save in the assets folder. Then in `app.js` file.

```js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font'; // expo install expo-font
import AppLoading from 'expo-app-loading'; // expo install expo-app-loading

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    // Load the fonts
    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError = {(error) => console.log(error)}
            />
        );
    }

    return (
        <View>
            <Text style = {styles.font}>Add Custom Fonts</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    font: {
        fontFamily: 'open-sans-bold',
    },
});
```