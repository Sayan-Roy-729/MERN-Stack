# Basic Layout and Widgets

- [View](https://reactnative.dev/docs/view)
- [Text](https://reactnative.dev/docs/text)
- [Button](https://reactnative.dev/docs/button)
- [StyleScreen](https://reactnative.dev/docs/stylesheet)
- [TextInput](https://reactnative.dev/docs/textinput)

## 1. **[Alert](https://reactnative.dev/docs/alert)**

```js
import { Alert } from 'react-native';

Alert.alert('Alert Title', 'Alert Message...', [
  { text: 'Sorry!', style: 'cancel' },
]);
```

## 2. **[Image](https://reactnative.dev/docs/image)**

### Local Image -

```js
import { Image } from 'react-native';

// Use Image
<Image
  fadeDuration={1000}
  source={require('../assets/success.png')}
  style={styles.image}
  resizeMode="cover"
/>;
```

### Network Image -

```js
import { Image } from 'react-native';

<Image
  fadeDuration={1000}
  source={{
    uri:
      'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  }}
  style={styles.image}
  resizeMode="cover"
/>;
```

## 3. **Add Fonts**:

- Step 1: Download fonts and save in a folder
- STep 2: For taking a little bit of time to load the fonts when running first time, following code have to insert into main file(app.js)

```js
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

// Add fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const App = (props) => {
  return (
    <View style={styles.screen}>
      <Text>React Native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    fontFamily: 'open-sans',
  },
});

export default App;
```

> ## 4. Different Types of Touch Effect:

- TouchableOpacity
- TouchableWithoutFeedback
- TouchableNativeFeedback
- TouchableHighlight

> Example:

```js
import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Colors from '../constants/colors';

const MainButton = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress} activeOpacity={0.7}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

export default MainButton;
```

> ## 5. Add **Icon**:

- [Expo Documentation](https://docs.expo.io/guides/icons/)
- [Icon List](https://icons.expo.fyi/)

```js
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Component = (props) => {
  return <Ionicons name="md-add" size={24} color="white" />;
};

export default Component;
```

> ## 6. ScrollView & FlatList:

- ByDefault, the screen is not scrollable. To enable this, `SrollView` is used.

```js
import { ScrollView } from 'react-native';

<ScrollView contentContainerStylew={styles.list}>
  {pastGuesses.map((guess) => (
    <View key={guess}>
      <Text>{guess}</Text>
    </View>
  ))}
</ScrollView>;
```

- For performance, Flatlist is good.
- Key will be string. By-default, it checks key or id inside the every object (By-Default, object means it is javascript object).
- With renderItem, can't pass more information but only single Item. To solve this problem, bind with that item(actually function).
- When passing the every item, it has `item.index` and `item.item`.

```js
import { FlatList } from 'react-native';

<FlatList
  contentContainerStyle={styles.list}
  keyExtractor={(item) => item}
  data={pastGuesses}
  renderItem={renderListItem.bind(this, pastGuesses.length)}
  numColumns={2}
/>;
```
- numColumns create grids, by-default it is 1. 2 means it creates 2 column grid.

> ## 7. Flex & FlexGrow:
>
> Have to come again (Video Number - 36)

> ## 8. 3rd Party UI Libraries

- [Expo Documentation](https://docs.expo.io/guides/userinterface/)
- ***
- [React Native Paper](https://github.com/callstack/react-native-paper), and their [docs](https://callstack.github.io/react-native-paper/index.html)
- [React Native UI Lib](https://github.com/wix/react-native-ui-lib), and their [docs](https://wix.github.io/react-native-ui-lib/)
- [React Native Elements](https://react-native-training.github.io/react-native-elements/), and their [docs](https://reactnativeelements.com/docs/getting_started.html)
- [Native Base](https://nativebase.io/), and their [docs](https://docs.nativebase.io/)
- [React Native Material UI](https://github.com/xotahal/react-native-material-ui), and their [docs](https://github.com/xotahal/react-native-material-ui/blob/master/docs/GettingStarted.md)
- [React Native UI Kitten](https://akveo.github.io/react-native-ui-kitten/#/home), and their [docs](https://akveo.github.io/react-native-ui-kitten/#/docs/quick-start/getting-started)
- [React Native iOS Kit](https://github.com/callstack/react-native-ios-kit), and their [docs](https://callstack.github.io/react-native-ios-kit/docs/installation.html)

---

---

---

> # Responsiveness:

## **`Dimensions API`:**

```js
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width / 4,
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
  },
});
```

- For android, `window` will be better instead using `screen` because in window, statusbar is included, but in screen, that's not.
- Some other features also available, like `height`, `Scale`, `fontSacel`.

## **Orientation:**

- In `app.json` file, `landscape`

```json
"orientation": "portrait" or "landscape" or "default",
```

## **`KeyboardAvoidingView:`**

- When landscape, the input field will go behind when soft - keyboard will be opend. To fixed this issue, this is used.
- To solve this issue, first wrap the whole component with `ScrollView` and then wrap with `KeyboardAvoidingView`.

```js
import { KeyboardAvoidingView } from 'react-native';

const App = (props) => {
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        Some code here
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
```

## **Listening to Orientation Changes:**

- When changes the orientation from landscape to portrait or vice-versa, then the style of old orientation is locked. Don't update automatically with changing the orientation.

```js
import { Dimensions } from 'react-native';

const App = (props) => {
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  );

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
    <View style={{ width: buttonWidth }}>
      <button title="Click Me!" />
    </View>
  );
};

export default App;
```

- For `Expo` has also its own orientation chacker
```js
import * as ScreenOrientation from 'expo-screen-orientation';

const App = props => {
  // CUstomly locking orientation
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  // CHeck orientation
  ScreenOrientation.addOrientationChangeListener...

  return (
    Some code here
  );
};

export default App;
```

## `Platform API`:
- Change style according to `ios` or `android` platform.
```js
import { Platform } from 'react-native';

const Header = props => {
  return (
    <View>
      <Text style = {styles.title}>Some Text</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
  }
}); 

export default Header;
```
- To check every styles, it's not recommended.
```js
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import TitleText from './TitleText';
import Colors from '../constants/colors';

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
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  title: {
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
  },
});

export default Header;
```
- Another use case example:
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
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
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
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

export default MainButton;
```
- Another recommended system is that, divide the component into two device spefic file e.g. One component, `mainButton.js` has to split in two different files like `mainButton.android.js` and` mainButton.ios.js` where platform basic code will be. And when importing that files, **don't have to import** as `mainButton.android.js` or `mainButton.ios.js`. Just import, `mainButton.js`. React-Native will detect automatically.

## SafeAreaView:
Sometime in landscape mode, because of notch or home screen back buttons(ios), these creates disturbing in the app content. It hides the contents. For that `SafeAreaView` takes the role.
```js
import { SafeAreaView } from 'react-native';

const App = props => {
  return (
    <SafeAreaView>
      <Text>Wrap the top most Views with SafeAreaView. Not the component top most views. Whole app top most views should wrap.</Text>
    <SafeAreaView>
  );
};
```

