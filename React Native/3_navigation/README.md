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
>## Add Buttons in Header AppBar:
- **STEP-1:** Create a custom header button inside the `HeaderButton.js` file.

```js
import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons'; // npm install --save react-navigation-header-buttons
import { Ionicons } from '@expo/vector-icons';

import Colors from '../Constants/Colors';

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color={Platform.OS === 'android' ? '#fff' : Colors.primaryColor}
        />
    );
};

export default CustomHeaderButton;
```

- **STEP-2:** Define the header buttons where or in which page is required.

```js
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MEALS } from '../data/dummy-data';
// Import the our custom header button
import CustomHeaderButton from '../components/HeaderButton';

const MealDetailsScreen = props => {
    return (
        <View>
            <Text>Add Header Button</Text>
        </View>
    );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam('mealId');
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    return {
        headerTitle: selectedMeal.title,
        // Define header buttons
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Favorite"
                    iconName="ios-star"
                    onPress={() => {
                        console.log('Mark as favorite!');
                    }}
                />
                <Item
                    title="Favorite-outline"
                    iconName="ios-star-outline"
                    onPress={() => {
                        console.log('Mark as favorite!');
                    }}
                />
            </HeaderButtons>
        ),
    };
};
```

>## Tab Based Navigation:
>### IOS Like Tabs
```js
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'; // npm install --save react-navigation-tabs
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../Constants/Colors';

// The forward backward screen navigation
const MealNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
            navigationOptions: {
                headerTitle: 'Meal Categories',
            },
        },
        CategoryMeals: {
            screen: CategoryMealsScreen,
        },
        MealDetail: MealDetailScreen,
    },
    {
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
);

// Configure Bottom tabs navigation
const MealsFavNavigator = createBottomTabNavigator(
    {
        Meals: {
            screen: MealNavigator,
            navigationOptions: {
                // Add Icon
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons
                            name="ios-restaurant"
                            size={25}
                            color={tabInfo.tintColor}
                        />
                    );
                },
            },
        },
        Favorites: {
            screen: FavoritesScreen,
            navigationOptions: {
                tabBarLabel: 'Favorites!',
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons
                            name="ios-star"
                            size={25}
                            color={tabInfo.tintColor}
                        />
                    );
                },
            },
        },
    },
    {
        // Select color when the tab is open
        tabBarOptions: {
            activeTintColor: Colors.accentColor,
        },
    }
);

export default createAppContainer(MealsFavNavigator);

```

>### Android Like Tabs (MaterialBottomTabs):

```js
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../Constants/Colors';

// npm install --save react-navigation-material-bottom-tabs
// npm install --save react-native-paper

const MealNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
            navigationOptions: {
                headerTitle: 'Meal Categories',
            },
        },
        CategoryMeals: {
            screen: CategoryMealsScreen,
        },
        MealDetail: MealDetailScreen,
    },
    {
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
);

const tabScreenConfig = {
    Meals: {
        screen: MealNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name="ios-restaurant"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.primaryColor,
        },
    },
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
            tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name="ios-star"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.primaryColor,
        },
    },
};

// Configure Bottom tabs
const MealsFavNavigator =
    Platform.OS === 'android'
        // Define MaterialBottomTabs
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
              activeColor: '#fff',
              shifting: true,
              barStyle: {
                  backgroundColor: Colors.primaryColor,
              },
          })
          // This is ios look bottom tab bars
        : createBottomTabNavigator(tabScreenConfig, {
              tabBarOptions: {
                  activeTintColor: Colors.accentColor,
              },
          });

export default createAppContainer(MealsFavNavigator);
```

## Menu Button & Side Drawer Navigation:
- **STEP-1:** Define the drawer navigation. 

```js
import { createDrawerNavigator } from 'react-navigation-drawer'; // npm install --save react-navigation-drawer

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen,
    },
    {
        navigationOptions: {
            drawerLabel: 'Filters!!',
        },
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
            headerTitle: 'A Screen',
        },
    }
);

// Create Side Drawer
const MainNavigator = createDrawerNavigator({
    MealsFavs: { screen: MealsFavTabNavigator, navigationOptions: {
        drawerLabel: 'Meals',
    } },
    Filters: FiltersNavigator,
}, {
    // Style the drawer
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold',
        },
    },
});

export default createAppContainer(MainNavigator);
```

- **STEP-2:** For activating the drawer, have to define by ourselves. Add the below code in that page files where drawer is required. For the `HeaderButton` see the above codes (`Add Buttons in Header AppBar`).

```js
CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: <HeaderButtons HeaderButtonComponent = {HeaderButton}>
            <Item title = 'Menu' iconName = 'ios-menu' onPress = {() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>
    };
};
```

>## Passing Data Between Component & Navigation Option (Header) (setParams & getParams):

```js
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Colors from '../Constants/Colors';

const FilterSwitch = (props) => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                value={props.state}
                onValueChange={props.onChange}
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Platform.OS === 'android' ? Colors.accentColor : ''}
            />
        </View>
    );
};

const FiltersScreen = (props) => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian,
        };

        console.log(appliedFilters);
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch
                label="Gluten-free"
                state={isGlutenFree}
                onChange={(newValue) => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                label="Lactose-free"
                state={isLactoseFree}
                onChange={(newValue) => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                label="Vegan"
                state={isVegan}
                onChange={(newValue) => setIsVegan(newValue)}
            />
            <FilterSwitch
                label="Vegetarian"
                state={isVegetarian}
                onChange={(newValue) => setIsVegetarian(newValue)}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName="ios-save"
                    onPress={() => {
                        navData.navigation.getParam('save')();
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
    },
});

export default FiltersScreen;

```