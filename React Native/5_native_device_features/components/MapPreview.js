import React from 'react';
import { Image, StyleSheet } from 'react-native';

import ENV from '../env';

const MapPreview = props => {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}
    &key=${ENV.googleApiKey}`;

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

const styles = StyleSheet.create({});

export default MapPreview;