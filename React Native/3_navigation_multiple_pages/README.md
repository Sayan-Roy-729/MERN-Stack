# Navigation Between Multiple Pages

## `npm install --save react-navigation` and other dependencies from the official page

## `npm install --save react-navigation-stack`

>## `Turn On Navigation`:

- Step 1: Create Pages or lets say register different components into different pages.

```js
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoryMealsScreen from '../Screens/CategoryMealsScreen';
import MealDetailScreen from '../Screens/MealDetailScreen';

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealDetailScreen,
});

export default createAppContainer(MealsNavigator);
```

- Step 2: Add the navation into main parent/root component. In this code, the first page will be `Categories` streen and it will be automatically rendered.

```js
import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import MealsNavigator from './navigation/MealsNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return <MealsNavigator />;
}
```

- Step 3: Register Other pages; routeName will be that is registered in the main navigator component. And should convert to the sring.

```js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CategoriesScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Categories Screen</Text>
      <Button
        title="Go to Meals!"
        onPress={() => {
          props.navigation.navigate({ routeName: `CategoryMeals` });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesScreen;
```

>## **`navigation.navigate()`**:

- To go from one page to another page.
- The last page is stored into stack. So back button is available.

```js
const App = (props) => {
  return (
    <View>
      <Button
        title="Goto MealDetail Screen"
        onPress={() => {
          props.navigation.navigate({
            routeName: 'MealDetail',
          });
        }}
      />
    </View>
  );
};

export default App;
```

>## **`navigation.push()`**:

- To go from one page to another page.
- The last page is stored into stack. So, back button is available.
- Difference between .navigate & .push is that --> In .navigator, can specify different properties but in push can't. Another difference is that, from one page .navigator is used to go the current page, then it does nothing though .push loads another same page on the stack.

```js
const App = (props) => {
  return (
    <View>
      <Button
        title="Go to CategoryMeals Screen"
        onPress={() => {
          props.navigation.push('CategoryMeals');
        }}
      />
    </View>
  );
};

export default App;
```

>## **`navigation.replace()`**:

- To go from one page to another page.
- The last is not storted into the stack what's why can't go back. That's why, back button also is not available.

```js
const App = (props) => {
  return (
    <View>
      <Button
        title="Go to CategoryMeals Screen"
        onPress={() => {
          props.navigation.replace({ routeName: `CategoryMeals` });
        }}
      />
    </View>
  );
};

export default App;
```

>## **`navigation.goBack()`**:

- To go back to the last stack page.
- Though come from one page to the next page, back button is automatically available in the header, it is for customly to go to back.

```js
const App = (props) => {
  return (
    <View>
      <Button
        title="Go to CategoryMeals Screen"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
    </View>
  );
};

export default App;
```

>## **`navigation.pop()`**:

- To go back to the last stack page.
- Difference between .goBack and .pop is that, .pop is only available in stackNavigator but .goBack always available.

```js
const App = (props) => {
  return (
    <View>
      <Button
        title="Go to CategoryMeals Screen"
        onPress={() => {
          props.navigation.pop();
        }}
      />
    </View>
  );
};

export default App;
```

>## **`navigation.popToTop()`**:

- To go back to the main root page.
- Don't go to the last page, directly go to the main root page.

```js
const App = (props) => {
  return (
    <View>
      <Button
        title="Go to CategoryMeals Screen"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

export default App;
```
