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

## Add Local Image:
```js
import React from 'react';
import { View, STyleSheet, Image } from 'react-native';

const ImageContainer = props => {
    return (
        <View style = {styles.imageContainer}>
            <Image 
                source={require('../assets/success.png')}
                style={styles.image}
                resizeMode='cover'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: '#000',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
```

## Add Network Image:
```js
import React from 'react';
import { View, STyleSheet, Image } from 'react-native';

const ImageContainer = props => {
    return (
        <View style = {styles.imageContainer}>
            <Image 
                source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}}
                style={styles.image}
                resizeMode='cover'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: '#000',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
```

## Add Icons:
```js
import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconContainer = props => {
    return (
        <View>
            <Ionicons name = 'md-add' size={24} color = '#fff'/>
        </View>
    );
};

export default IconContainer;
```