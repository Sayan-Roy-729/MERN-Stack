import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
    const [courseGoals, setCourseGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false); 

    const addGoalHandler = (goalTitle) => {
        setCourseGoals((currentGoals) => [
            ...currentGoals,
            { id: Math.random().toString(), value: goalTitle },
        ]);
        setIsAddMode(false);
    };

    const removeGoalHandler = goalId => {
        setCourseGoals(currentGoals => {
            return currentGoals.filter((goal) => goal.id !== goalId);
        });
    };

    const cancelGoalAdditionHandler = () => {
        setIsAddMode(false);
    };

    return (
        <View style={styles.screen}>
            <Button title = 'Add New Goal' onPress = {() => setIsAddMode(true)}/>
            <GoalInput onAddGoal = {addGoalHandler} visible = {isAddMode} onCancel = {cancelGoalAdditionHandler}/>

            {/* <ScrollView>
                {courseGoals.map((goal, index) => (
                    <View key={index} style={styles.listItem}>
                        <Text>{goal}</Text>
                    </View>
                ))}
            </ScrollView> */}

            <FlatList
                keyExtractor={(item, index) => item.id}
                data={courseGoals}
                renderItem={(itemData) => (
                    <GoalItem title={itemData.item.value} onDelete = {() => removeGoalHandler(itemData.item.id)}/>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 50,
    },
});
