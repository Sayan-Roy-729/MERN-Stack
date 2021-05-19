# Navigation:

> npm install --save react-navigation and install dependencies from the official docs.</br>
> expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view</br>
> npm install --save react-navigation-stack react-navigation-tabs react-navigation-drawer</br>
> npm install --save react-navigation-stack</br>

> ## Activate Navigation:
>
> In this app, it has 3 screens/pages - CategoriesScreen, CategoryMealsScreen & MealDetailScreen and the steps will be CategoriesScreen => CategoryMealsScreen => MealDetailScreen.</br> >**STEPS:**</br>

-   First create the files for every pages in a separate screens folder.
-   Then create a folder named `navigation` and create a file named `MealsNavigator.js` in which the navigation registration related code will be.

```js
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation'; // npm install --save react-navigation
// This is for creating stack navigation
import { createStackNavigator } from 'react-navigation-stack'; // npm install --save react-navigation-stack

// Import all the screen files
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';

// Register the pages, key will be page name and the value will be the imported files.
// createStackNavigator returns NavigationContainer.
const MealNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        screen: CategoryMealsScreen,
        // The AppBar style can also be styled from here
        navigationOptions: {
            headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '#fff',
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primaryColor,
        },
    },
    MealDetail: MealDetailScreen,
}, {
    // Configure default AppBar/Navigation Bar Style which will be applied to all pages
    {
        // The animation of pages like modal, that's open page from bottom. Default is card.
        mode: 'modal',
        initialRouteName: 'Categories',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor:
                    Platform.OS === 'android' ? Colors.primaryColor : '#fff',
            },
            headerTintColor:
                Platform.OS === 'android' ? '#fff' : Colors.primaryColor,
        },
    }
});

// But have to wrap with createAppContainer which also returns NavigationContainer and it creates smooth navigation
export default createAppContainer(MealNavigator);
```

-   Now use this NavigationContainer into `app.js` file to register the navigation.

```js
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'; 
import { enableScreens } from 'react-native-screens'; // npm install --save react-native-screens

import MealsNavigator from './navigation/MealsNavigator';

// Increase the performance of the navigation through out the app
enableScreens();

export default function App() {
    return <MealsNavigator />;
}

const styles = StyleSheet.create({});
```

-   According to the above codes, the home or first page will be `CategoriesScreen`. _Inside the props of the screen files, there are the navigation related properties. But this navigation is not go down to the child components._ The code of this file:

```js
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const CategoriesScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>The Categories Screen</Text>
            {/* Register a button to go to the CategoryMeals Screen. Then user will click the button,
            user will go to the next page */}
            <Button
                title="Go to Meals!"
                onPress={() => {
                    // Identifier should be same as registered
                    props.navigation.navigate({ routeName: 'CategoryMeals' });
                    // Alternative syntax of the above line
                    // props.navigation.navigate('CategoryMeals');
                }}
            />
        </View>
    );
};

// Configure the app Header
CategoriesScreen.navigationOptions = {
    // Header Title
    headerTitle: 'Meal Categories',
    // Header Style
    headerStyle: {
        backgroundColor:
            Platform.OS === 'android' ? Colors.primaryColor : '#fff',
    },
    // Header Title Color
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primaryColor,
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

> ## `props.navigation.push('SomeIdentifier')`:

Alternative of the `props.navigation.navigate('someIdentifier')`. But have to render same screen where currently user is, then this `push` method is used.

```js
<Button
    title="Go To"
    onPress={() => {
        props.navigation.push('someIdentifier');
    }}
/>
```

> ## `props.navigation.goBack()`:

In the navigation stack, there is by-default back button in app bar (that is given by default by the `react-navigation`). But sometimes, have to go back to the previous page. For that, this method is used.

```js
<Button
    title="Go To"
    onPress={() => {
        props.navigation.goBack();
    }}
/>
```

> ## `props.navigation.pop()`:

Alternative to the `props.navigation.goBack()`.

```js
<Button
    title="Go To"
    onPress={() => {
        props.navigation.pop();
    }}
/>
```

> ## `props.navigation.popToTop()`:

Sometimes have to go to the home or first page of the stack. Then to avoid new stack page, this method is used.

```js
<Button
    title="Go To"
    onPress={() => {
        props.navigation.popToTop();
    }}
/>
```

> ## `props.navigation.replace('someIdentifier')`:

Sometimes have to replace the page when go to the next page, like user sign in from one page and then go to the another page. Then user is not allowed to go back to the sign in page.

```js
<Button
    title="Go To"
    onPress={() => {
        props.navigation.replace('someIdentifier');
    }}
/>
```

> ## Configure the Header:
>
> To configure the AppBar header of every page, add `navigationOptions` as property of the function and configure it as requirement. e.g. The below code is `CategoryScreen.js` page.

```js
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const CategoriesScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>The Categories Screen</Text>
            {/* Register a button to go to the CategoryMeals Screen. Then user will click the button,
            user will go to the next page */}
            <Button
                title="Go to Meals!"
                onPress={() => {
                    // Identifier should be same as registered
                    props.navigation.navigate({ routeName: 'CategoryMeals' });
                    // Alternative syntax of the above line
                    // props.navigation.navigate('CategoryMeals');
                }}
            />
        </View>
    );
};

// Configure the app Header
CategoriesScreen.navigationOptions = {
    // Header Title
    headerTitle: 'Meal Categories',
    // Header Style
    headerStyle: {
        backgroundColor:
            Platform.OS === 'android' ? Colors.primaryColor : '#fff',
    },
    // Header Title Color
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primaryColor,
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

> ## Passing & Reading Params Upon Navigation:

-   From the screen, where have to send the data

```js
<TouchableOpacity
    onPress={() => {
        props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
                categoryId: itemData.item.id,
            },
        });
    }}
    style={styles.gridItem}
>
    <View>
        <Text>{itemData.item.title}</Text>
    </View>
</TouchableOpacity>
```

-   Where have to collect the data

```js
const catId = props.navigation.getParam('categoryId');
```

## Dynamic Navigation Options:

-   The screen, from where have to send the data

```js
<TouchableOpacity
    onPress={() => {
        props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
                categoryId: itemData.item.id,
            },
        });
    }}
    style={styles.gridItem}
>
    <View>
        <Text>{itemData.item.title}</Text>
    </View>
</TouchableOpacity>
```

-   The screen, where the data is required. In this screen receive this into the `navigationOptions` from where the header or appBar is defined.

```js
CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
        headerStyle: {
            backgroundColor:
                Platform.OS === 'android' ? Colors.primaryColor : '#fff',
        },
        headerTintColor:
            Platform.OS === 'android' ? '#fff' : Colors.primaryColor,
    };
};
```
