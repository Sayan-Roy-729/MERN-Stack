# User Input:

## Configuring TextInput:

-   For user input validation, can use 3rd party packages like `validate.js`.

```js
<TextInput
    style={styles.input}
    value={title}
    onChangeText={(text) => setTitle(text)}
    keyboardType="default"
    autoCapitalize="sentences"
    autoCorrect
    returnKeyType="next"
    onEndEditing={() => console.log('onEndEdition')}
    onSubmitEditing={() => console.log('onSubmitEdition')}
/>
```

## Show Loading Spinner:

```js
import { ActivityIndicator } from 'react-native';

if (isLoading) {
    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
}
```

## Navigation Listener:

In the navigation, if user goes from one page to another page through drawer then the pages will render only for 1st time. Next times, these pages are kept as catch in memory and display that again. Don't re-render again. But if sometime api call is required to re-render, then it will not run. Then the updated changes will not available in the app. To avoid this, there are the methods when have to listen and re-render the components.

```js
useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', () => {
        loadProducts();
    });
    // props.navigation.addListener('didFocus');
    // props.navigation.addListener('willBlur');
    // props.navigation.addListener('didBlur');

    return () => {
        willFocusSub.remove();
    };
}, [loadProducts]);
```

## Pull to Refresh:

```js
// Set State
const [isRefreshing, SetIsRefreshing] = useState(false);

// The function
const loadProducts = useCallback(async () => {
    setError(null);
    SetIsRefreshing(true);
    try {
        await dispatch(productActions.fetchProducts());
    } catch (err) {
        setError(err.message);
    }

    SetIsRefreshing(false);
}, [dispatch, setIsLoading, setError]);

<FlatList
    // The function will run when refreshing
    onRefresh={loadProducts}
    refreshing={isRefreshing}
    data={products}
    keyExtractor={(item) => item.id}
    renderItem={(itemData) => ()
/>
```

# Authentication:

## `createSwitchNavigator`:

```js
import { createSwitchNavigator } from 'react-navigation';

const AuthNavigator = createSwitchNavigator(
    {
        Auth: AuthScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    }
);

// It always display one screen and can't go back to another screen if you navigate to a different one.
// Going back is not allowed.
const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Shop: ShopNavigator,
});
```

## Gradient Background:

```js
import { LinearGradient } from 'expo-linear-gradient'; // npm install --save expo-linear-gradient

<LinearGradient colors={['#ffedff', '#ffe3ff']} style = {styles.gradient}>
    <View>
        <Text>Other Contents</Text>
    </View>
</LinearGradient>
```

## Auto Login (`AsyncStorage`):

### Create methods to store the token into user device (Auth.js Action redux file):

```js
import AsyncStorage from '@react-native-async-storage/async-storage';
// expo install @react-native-async-storage/async-storage

// For when the app will restart, this action will be called
export const authenticate = (userId, token) => {
    return { type: AUTHENTICATE, userId: userId, token: token };
};

export const signUp = (requiredData) => {
    return async dispatch => {
        // ... some sign up code
        dispatch(...);

        // Call the func to store the data
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        saveDataToStorage(resData.idToken, resData, localId, expirationDate);
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString(),
        })
    );
};
```

### Auto Login Code or Screen:

```js
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import { Colors } from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);

            // Return to the authentication screen
            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }

            props.navigation.navigate('Shop');
            // The code defined the above code section
            dispatch(authActions.authenticate(userId, token));
        };

        tryLogin();
    }, [dispatch]);

    return (
        <View style = {styles.screen}>
            <ActivityIndicator size='large' color = {Colors.primary}/>
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

export default StartupScreen;
```
