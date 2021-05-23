# User Input:

## Configuring TextInput:
- For user input validation, can use 3rd party packages like `validate.js`.

```js
<TextInput
    style={styles.input}
    value={title}
    onChangeText={(text) => setTitle(text)}
    keyboardType='default'
    autoCapitalize='sentences'
    autoCorrect
    returnKeyType='next'
    onEndEditing = {() => console.log('onEndEdition')}
    onSubmitEditing={() => console.log('onSubmitEdition')}
/>
```

## Show Loading Spinner:
```js
import { ActivityIndicator } from 'react-native';

if (isLoading) {
    return (
        <View style = {styles.centered}>
            <ActivityIndicator size = 'large' color = {Colors.primary}/>
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