# Native Device Features

## Accessing the Device Camera:

```js
import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // expo install expo-image-picker
import * as Permissions from 'expo-permissions'; // expo install expo-permissions

import Colors from '../constants/Colors';

const ImgPicker = (props) => {
    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(
            Permissions.CAMERA,
            Permissions.CAMERA_ROLL
        );

        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        setPickedImage(image.uri);
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (
                    <Text>No image picked yet.</Text>
                ) : (
                    <Image source={{ uri: pickedImage }} style={styles.image} />
                )}
            </View>

            <Button
                title="Take Image"
                color={Colors.primary}
                onPress={takeImageHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default ImgPicker;
```

## Store Something (image) (`FileSystem`):

Best place to add this method to store into redux action file.

```js
import * as FileSystem from 'expo-file-system'; // expo install expo-file-system
export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
    return async (dispatch) => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }

        dispatch({
            type: ADD_PLACE,
            placeData: { title: title, image: newPath },
        });
    };
};
```
## BuildIn Device Database (SQLite):
### Initialize the database:

```js
import * as SQlite from 'expo-sqlite'; // expo install expo-sqlite

const db = SQlite.openDatabase('places.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });

    return promise;
};
```
After defining the database, then have to call the `init` function to create a database into the device. The best place to call it into `app.js` file before rendering any component and even calling the `App component` into `app.js` file.

```js
import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigation';
import placeReducers from './store/places-reducer';
import { init } from './helpers/db';

init()
    .then(() => {
        console.log('Initialized database');
    })
    .catch((err) => {
        console.log('Initializing db failed!');
        console.log(err);
    });

const rootReducer = combineReducers({
    places: placeReducers,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default function App() {
    return (
        <Provider store={store}>
            <PlacesNavigator />
        </Provider>
    );
}
```

### Storing Data into the Database:
First define the method to store the data into the database.

```js
import * as SQlite from 'expo-sqlite';

const db = SQlite.openDatabase('places.db');

// Define the database
export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });

    return promise;
};

// Define the method to store data into the database
export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
                [title, imageUri, address, lat, lng],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });

    return promise;
};
```

Call or execute the above `insertPlace` method to store the data into the database.

```js
import * as FileSystem from 'expo-file-system';

import { insertPlace } from '../helpers/db';
export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
    return async (dispatch) => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath,
            });

            const dbResult = await insertPlace(
                title,
                newPath,
                'Dummy address',
                15.6,
                12.3
            );

            console.log(dbResult);

            dispatch({
                type: ADD_PLACE,
                placeData: { id: dbResult.insertId, title: title, image: newPath },
            });
        } catch (err) {
            console.log(err);
            throw err;
        }

        
    };
};
```

### Fetching Data from the Local Database:

Define the method
```js
import * as SQlite from 'expo-sqlite';

const db = SQlite.openDatabase('places.db');

// create new database
export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });

    return promise;
};

// insert into the database
export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
                [title, imageUri, address, lat, lng],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });

    return promise;
};

// Fetch from the database
export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });

    return promise;
};
```
Execute the method

```js
import { fetchPlaces } from '../helpers/db';

export const loadPlaces = () => {
    return async (dispatch) => {
        try {
            const dbResult = await fetchPlaces();
            console.log(dbResult);

            dispatch({ type: SET_PLACES, places: dbResult.rows._array });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};
```

## User Location:

```js
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
} from 'react-native';
import * as Location from 'expo-location'; // expo install expo-location
import * as Permissions from 'expo-permissions'; // expo install expo-permissions

import Colors from '../constants/Colors';

const LocationPicker = (props) => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);

        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });

            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
        } catch (err) {
            Alert.alert(
                'Could not fetch location!',
                'please try again later or pick a location on the map.',
                [{ text: 'Okay' }]
            );
        }

        setIsFetching(false);
    };

    return (
        <View style={styles.locationPicker}>
            <View style={styles.mapPreview}>
                {
                    isFetching ? <ActivityIndicator size = 'large' color = {Colors.primary}/> : <Text>No location chosen yet!</Text>
                }
            </View>
            <Button
                title="Get Location"
                color={Colors.primary}
                onPress={getLocationHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LocationPicker;
```

https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
&markers=color:red%7Clabel:C%7C40.718217,-73.998284
&key=YOUR_API_KEY