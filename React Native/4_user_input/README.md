# Handling User Input:

## Configuring Text Inputs [TextInput](https://reactnative.dev/docs/textinput):

- For more validation, package like [Validate.js](https://validatejs.org/), [Formik](https://formik.org/)

```jsx
import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

const Component = props => {
  const [title, setTitle] = useState('');
  const [titleIsValid, setTitleIsValid] = useState(false);
  
  const titleChangeHandler = text => {
    if (text.trim().length === 0) {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
    }
    setTitle(text);
  }; 

  return (
    <View>
      <TextInput
        style = {styles.input}
        value = {title}
        onChangeText = {titleChangeHandler}
        keyboardType = 'decimal-pad'
        autoCapitalize = 'sentences'
        autoCorrect = {false}
        returnKeyType = 'next'
        onEndEditing = {() => console.log('onEndEditing')}
        onSubmitEditing = {() => console.log('onSubmitEditing')}
      />
      <View>
        {

        }
      </View>
    </View>
  );
};

styles = StyleSheet.create({
  input: {
    ...
  }
});

export default Component;
```

And Also **`KeyboardAvoidingView`**

For auto adjust when soft-keyboard is opened.

# Authentication:

## Basic Logic Screen

```js
import React from 'react';
import {ScrollView, StyleSheet, View, KeyboardAvoidingView} from 'react-native';

import Input from '../../components/UI/Input';

const AuthScreen = props => {};

const styles = StyleSheet.create({});

export default AuthScreen;
```