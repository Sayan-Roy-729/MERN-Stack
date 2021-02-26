import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MealDetailScreen = props => {
  return (
    <View style = {styles.screen}>
      <Text>The Meal Detail Screen</Text>
      <Button title = 'Go Back to Categories' onPress = {() => {
        // pop goes to last stack page. But popToTop goes back to the root screen
        props.navigation.popToTop();
      }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MealDetailScreen;