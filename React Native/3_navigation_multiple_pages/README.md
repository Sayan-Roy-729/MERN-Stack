# Navigation Between Multiple Pages

## Important of this Page:

| SL. NO. |                      Topic                      |   Link    |
| :-----: | :---------------------------------------------: | :-------: |
|    1    |            Navigate Different Pages             | [Click]() |
|    2    |              navigation.navigate()              | [Click]() |
|    3    |                navigation.push()                | [Click]() |
|    4    |              navigation.replace()               | [Click]() |
|    5    |               navigation.goBack()               | [Click]() |
|    6    |                navigation.pop()                 | [Click]() |
|    7    |              navigation.popToTop()              | [Click]() |
|    8    | Pass Data from one page to another page (param) | [Click]() |
|    9    | Change/Set Header & Styles (Navigation Options) | [Click]() |
|   10    |           Dynamic Navigation Options            | [Click]() |
|   11    |       Default Navigation Options & Config       | [Click]() |
|   12    |      Increase Performance (enableScreens)       | [Click]() |
|   13    |               Add Icon On Header                | [Click]() |
|   14    |              Tabs-Based Navigation              | [Click]() |
|   15    |      MaterialBottomTabs (Android Specific)      | [Click]() |
|   16    |                   Side Drawer                   | [Click]() |
|   17    |                                                 | [Click]() |
|   18    |                                                 | [Click]() |
|   19    |                                                 | [Click]() |
|   20    |                                                 | [Click]() |

## `npm install --save react-navigation` and other dependencies from the official page

## `npm install --save react-navigation-stack`

> ## `Turn On Navigation`:

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

> ## **`navigation.navigate()`**:

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

> ## **`navigation.push()`**:

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

> ## **`navigation.replace()`**:

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

> ## **`navigation.goBack()`**:

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

> ## **`navigation.pop()`**:

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

> ## **`navigation.popToTop()`**:

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

## Passing Data from One Navigation Page to Another By `Params`:

- Pass Data to another page

```js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const App = props => {
  return (
    <TouchableOpacity
      style = {styles.gridItem}
      onPress = {() => {
        props.navigation.navigate({routeName: 'CategoryMeals', params: {
          categoryId: ItemData.item.id
        }});
      }}>
    </TouchableOpacity>
  );
};

styles = StyleSheet.create({
  ...
});

export default App;
```

- Extract that data:

```js
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const AnotherAppPage = props => {
  const categoryId = props.navigation.getParam('categoryId');

  return (
    <View>
      <Text>Some code here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ...
});

export default AnotherAppPage;
```

## Change **`Header Title`** and Styles in Every Navigation Page:

### Way - 1:

```js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App = props => {
  return (
    <View>
      <Text>Some Code Here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  {...}
});

// Set Header
App.navigationOptions = {
  headerTitle: 'Meal Categories',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  // geaderTintColor is for header title style
  headerTintColor: Platform.OS === 'android' : 'white' : Colors.primaryColor
};

export default App;
```

### Way - 2: Dynamic Navigation Options (`Dynamic Heading`)

```js
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const App = props => {
  const categoryId = props.navigation.getParam('categoryId');

  return (
    <View>
      <Text>Some code here</Text>
    </View>
  );
};

// As a function
App.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParams('categoryId');
  const selectedCategory = CATEGORIES.find(category => category.id === catId);

  return {
    headerTitle: selectedCategory.title,
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    // geaderTintColor is for header title style
    headerTintColor: Platform.OS === 'android' : 'white' : Colors.primaryColor
  };
};

const styles = StyleSheet.create({
  ...
});

export default App;
```

### Way - 3: Dynamic Navigation Options & Config:

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
    navigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      // geaderTintColor is for header title style
      headerTintColor: Platform.OS === 'android' : 'white' : Colors.primaryColor
    }
  },
  MealDetail: MealDetailScreen,
}, {
  // default is card
  mode: 'modal',
  initialRouteName: 'CategoryMeals',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTinColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  }
});

export default createAppContainer(MealsNavigator);
```

## Performance Increase in Navigation App:

- `npm install --save react-native-screens`
- Add to the main root component (here app.js)

```js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { enableScreens } from 'react-native-screens';

// Add before anything next and next to the imports
enableScreens();

const App = props => {
  return (
    <View>
      <Text>Root/Parent Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ...
});

export default App;
```

## Add Icon in Header:

- `npm install --save react-navigation-header-buttons`
- Step 1: Create Helper Component (HeaderButton.js) for creating that button

```js
import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {,,,props}
      IconComponent = {Ionicons}
      iconSize = {23}
      color = {Platform.OS === 'android' : 'white' : Colors.primaryColor}/>
  );
};

export default CustomHeaderButton;
```

- Step 2: Use the headerButton component where required

```js
import React from 'react';
import {View, Button} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const MealDetailsScreen = props => {
  return (
    <View>
      <Text>This is meal details screen </Text>
    </View>
  );
};

MealDetailsScreen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParams('mealId');
  const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent = {HeaderButton}>
        <Item title = 'Favourite' iconName = 'ios-star' onPress = {() => {
          console.log('Mark as favourite');
        }}/>
        <Item title = 'title' iconName = 'ios-star-outline' omPress = {() => {}}/>
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  ...
});

export default MealDetailsScreen;
```

## Adding Tabs-Based Navigation:

`npm install --save react-navigation-tabs`

```js
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoryMealsScreen from '../Screens/CategoryMealsScreen';
import MealDetailScreen from '../Screens/MealDetailScreen';
import FavouriteScreen from '../screens/FavouriteScreen';

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      // geaderTintColor is for header title style
      headerTintColor: Platform.OS === 'android' : 'white' : Colors.primaryColor
    }
  },
  MealDetail: MealDetailScreen,
}, {
  // default is card
  mode: 'modal',
  initialRouteName: 'CategoryMeals',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTinColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  }
});

const FavNavigator = createStackNavigator({
  Favourite: FovouriteScreen,
  MealFetail: MealDetailScreen
}, {
  // default is card
  mode: 'modal',
  initialRouteName: 'CategoryMeals',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTinColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  }
});

// define the tab navigator
const MealsFavTabNavigator = createBottomTabNavigator({
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name = 'ios-restaurant' size = {25} color = {tabInfo.tintColor}/>
    }
    }
  },
  Favourites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: 'Favourites',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name = 'ios-star' size = {25} color = {tabInfo.tintColor}/>
      }
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: Colors.accentColor,
  }
});

export default createAppContainer(MealsFavTabNavigator);
```

## **`MaterialBottomTabs`** (Tabs-Based Navigation):

`npm install --save react-navigation-material-bottom-tabs`
`npm install --save react-native-paper`

```js
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigation } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoryMealsScreen from '../Screens/CategoryMealsScreen';
import MealDetailScreen from '../Screens/MealDetailScreen';
import FavouriteScreen from '../screens/FavouriteScreen';

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      // geaderTintColor is for header title style
      headerTintColor: Platform.OS === 'android' : 'white' : Colors.primaryColor
    }
  },
  MealDetail: MealDetailScreen,
}, {
  // default is card
  mode: 'modal',
  initialRouteName: 'CategoryMeals',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTinColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  }
});

// define the tab navigator
const MealsFavTabNavigator = createMaterialBottomTabNavigation({
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name = 'ios-restaurant' size = {25} color = {tabInfo.tintColor}/>
      },
      tabBarColor: Colors.primaryColor,
    }
  },
  Favourites: {
    screen: FavouriteScreen,
    navigationOptions: {
      tabBarLabel: 'Favourites',
      tabBarIcon: (tabInfo) => {
        return (<Ionicons name = 'ios-star' size = {25} color = {tabInfo.tintColor}/>)
      },
      tabBarColor: Colors.primaryColor,
    }
  }
}, {
  activeColor: Colors.accentColor,
  shifting: true,
  // if shifting is false
  barStyle: {
    backgroundColor: Colors.primaryColor
  }
});

export default createAppContainer(MealsFavTabNavigator);
```

## **`Side Drawer`**:

`npm install --save react-navigation-drawer`

```js
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoryMealsScreen from '../Screens/CategoryMealsScreen';
import MealDetailScreen from '../Screens/MealDetailScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import FiltersScreen from '../screens/FiltersScreen';

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      // geaderTintColor is for header title style
      headerTintColor: Platform.OS === 'android' : 'white' : Colors.primaryColor
    }
  },
  MealDetail: MealDetailScreen,
}, {
  // default is card
  mode: 'modal',
  initialRouteName: 'CategoryMeals',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTinColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  }
});

const FavNavigator = createStackNavigator({
  Favourite: FavoriteScreen,
  MealDetail: MealDetailScreen
}, {
  // default is card
  mode: 'modal',
  initialRouteName: 'CategoryMeals',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTinColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  }
});

// define the tab navigator
const MealsFavTabNavigator = createBottomTabNavigator({
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name = 'ios-restaurant' size = {25} color = {tabInfo.tintColor}/>
    }
    }
  },
  Favourites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: 'Favourites',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name = 'ios-star' size = {25} color = {tabInfo.tintColor}/>
      }
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: Colors.accentColor,
  }
});

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
});

// Drawer fine here, to change the configuration, like header title styles, add these in the stack
// Navigator (here, FiltersNavigator)
const MainNavigator = createDrawerNavigator({
  MealsFavs: MealsFavTabNavigator,
  Filters: FiltersNavigator
});


export default createAppContainer(MainNavigator);
```

- In that container which component will be in drawer

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FilterScreen = (props) => {
  return (
    <View>
      <Text>Some Filter code here</Text>
    </View>
  );
};

FilterScreen.navigationOptions = (navData) => {
  return (
    headerTitle: 'Filter Meals',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="menu" iconName="ios-menu" onPress={() => {
          navData.navigation.toggleDrawer();
          // also have another drawer functionality
          // navData.navigation.openDrawer()
        }} />
      </HeaderButtons>
    ),
  );
};

const styles = StyleSheet.create({});

export default FilterScreen;
```

- Configure that screen where the drawer button should show like CategoriesScreen and other

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const CategoriesScreen = (props) => {
  return (
    <View>
      <Text>Some Filter code here</Text>
    </View>
  );
};

// Configure header
CategoriesScreen.navigationOptions = (navData) => {
  return (
    headerTitle: 'Filter Meals',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="menu" iconName="ios-menu" onPress={() => {
          navData.navigation.toggleDrawer();
          // also have another drawer functionality
          // navData.navigation.openDrawer()
        }} />
      </HeaderButtons>
    ),
  );
};

const styles = StyleSheet.create({});

export default CategoriesScreen;
```
