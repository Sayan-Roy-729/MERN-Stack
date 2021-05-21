# Styling

## Close keyboard when clicking other places of the screen:

```js
import {
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    View,
} from 'react-native';

const Component = (props) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View>{props.children}</View>
            <TextInput />
        </TouchableWithoutFeedback>
    );
};
```

## Alert:

```js
import { Alert } from 'react-native';

const AlertContainer = (props) => {
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

    return <View>{props.children}</View>;
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
                onError={(error) => console.log(error)}
            />
        );
    }

    return (
        <View>
            <Text style={styles.font}>Add Custom Fonts</Text>
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

const ImageContainer = (props) => {
    return (
        <View style={styles.imageContainer}>
            <Image
                source={require('../assets/success.png')}
                style={styles.image}
                resizeMode="cover"
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

const ImageContainer = (props) => {
    return (
        <View style={styles.imageContainer}>
            <Image
                source={{
                    uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg',
                }}
                style={styles.image}
                resizeMode="cover"
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

const IconContainer = (props) => {
    return (
        <View>
            <Ionicons name="md-add" size={24} color="#fff" />
        </View>
    );
};

export default IconContainer;
```

# Responsiveness:

## Flexible Width:

```js
const styles = StyleSheet.create({
    container: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
    },
});
```

## `Dimensions` API:

To get the width and height of the user's device, this API is used. It has two options: `window` & `screen`. `window` statusbar height is excluded (only for android).

```js
import { Dimensions } from 'react-native';

if (Dimensions.get('window').height > 600) {
    return (
        <View>
            <Text>Only render when device height > 600px</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        // Get the device width
        width: Dimensions.get('window').width / 4;
    },
    buttonContainer: {
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    },
    listContainer: {
        width: Dimensions.get('window').width > 500 ? '60%' : '80%',
    },
});
```

## Device Orientations:

By default the expo app is set to portrait mode. This is defined into the `app.json` file.

```json
"orientation": "portrait"
```

The app can also locked to landscape mode by defining

```json
"orientation": "landscape"
```

To support the both orientation, simply define

```json
"orientation": "default"
```

## KeyboardAvoidingView Widget:

When the soft keyboard is opened, the input field is not visible properly. To fixed this issue, this widget is used.</br>
**To use this widget, first have to wrap the whole widget with `ScrollView` and the have to wrap the next child contents with it.**

```js
import React from 'react';
import {
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    View,
} from 'react-native';

const InputContainer = (props) => {
    return (
        <ScrollView>
            <KeyboardAvoidingView>
                <View>
                    <TextInput />
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
```

## Listening to Orientation Changes:
By default, the expo apps does not change the layout when the orientation is changed. It locks the previous layouts and display that in current orientation.</br>
To solve this issue, there is no build in Widget or API and the `Dimensions API` is defined when the first time app rendered. Then this will not be calculated. To solve the issue

```js
import React, { useState, useEffect } from 'react';
import { View, Button, Dimensions } from 'react-native';

const OrientationChange = props => {
    const [buttonWidth, setButtonWidth] = useState(
        Dimensions.get('window').width / 4
    );

    // Have to use useEffect to clear the event when re-render this component
    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    return (
        <View style={styles.buttonContainer}>
            {/* Have to use inline styling, if style object is used, then 
                the value of width will not change according to the changes 
                of the device orientation change. */}
            <View style={{ width: buttonWidth }}>
                <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.accent}
                />
            </View>
            <View style={{ width: buttonWidth }}>
                <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                />
            </View>
        </View>
    );
};
```

## `ScreenOrientation API` of Expo:
The orientation related operations can be done by this.

```js
import * as ScreenOrientation from 'expo-screen-orientation'; // expo install expo-screen-orientation

// This code is to lock the screen into PORTRAIT mode.
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
```

## `Platform` API:
Change style according to the platform means ios and android.

```js
const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '#fff',
        borderBottomColor: Platform.Os === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    },
});
```

Another example to render according to the platform os.

```js
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';

import Colors from '../constants/colors';

const MainButton = (props) => {
    let ButtonComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style = {styles.buttonContainer}>
            <ButtonComponent onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden',
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'open-sans',
        fontSize: 18,
    },
});

export default MainButton;
```

## `Platform.select()`:
To check again and again according to the ios, there is an more suitable way.

```js
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = (props) => {
    return (
        <View
            style={{
                ...styles.headerBase,
                ...Platform.select({
                    ios: styles.headerIOS,
                    android: styles.headerAndroid,
                }),
            }}
        >
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS: {
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
    },
    title: {
        color: Platform.OS === 'ios' ? Colors.primary : '#fff',
    },
});

export default Header;
```
## `SafeAreaView`:
Sometimes the notch and other things cover the app. So solve this problem this is used. **With this widget, always wrap the top most Widget or component with it.** And the top most component is `app.js` file.

```js
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font'; // expo install expo-font
import AppLoading from 'expo-app-loading'; // expo install expo-app-loading

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError = {(error) => console.log(error)}
            />
        );
    }

    const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
    };

    const gameOverHandler = (numOfRounds) => {
        setGuessRounds(numOfRounds);
    };

    let content = <StartGameScreen onStartGame={startGameHandler} />;

    if (userNumber && guessRounds <= 0) {
        content = (
            <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
        );
    } else if (guessRounds > 0) {
        content = (
            <GameOverScreen
                roundsNumber={guessRounds}
                userNumber={userNumber}
                onRestart={configureNewGameHandler}
            />
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Header title="Guess a Number" />
            {content}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
```

## Grid Display:

```js
const CategoriesScreen = (props) => {
    const renderGridItem = (itemData) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate({ routeName: 'CategoryMeals', params: {
                        categoryId: itemData.item.id,
                    }, });
                }}
                style={styles.gridItem}
            >
                <View>
                    <Text>{itemData.item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        {/* Create Grid */}
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />
    );
};
```

## Add Background Image:
Which content will be covered with the background image, wrap that contents with `ImageBackground`.
```js
<View style = {{...styles.mealRow, ...styles.mealHeader}}>
    <ImageBackground source = {{uri: props.image}} style = {styles.bgImage}>
        <View style = {styles.titleContainer}>
            <Text style = {styles.title} numberOfLines = {1}>{props.title}</Text>
        </View>
    </ImageBackground>
</View>

const styles = StyleSheet.create({
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    mealRow: {
        flexDirection: 'row',
    },
    titleContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
});
```

## Toggle Switch Button:

```js
import { Switch } from 'react-native';

<Switch
    value={props.state}
    onValueChange={props.onChange}
    trackColor={{ true: Colors.primaryColor }}
    thumbColor={Platform.OS === 'android' ? Colors.accentColor : ''}
/>
```