import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text } from 'react-native';

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [courseGoals, setGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setGoals(updatedGoals => [
      ...courseGoals,
      { key: Math.random().toString(), value: goalTitle }
    ]);
    cancelModal();
  };

  const removeGoalHandler = goalKey => {
    setGoals(updatedGoals => {
      return updatedGoals.filter(goal => goal.key !== goalKey);
    });
  };

  const cancelModal = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>TODOEY APP</Text>
      <View style={styles.viewContainer}>
        <Button title="Add a To-Do" onPress={() => setIsAddMode(true)} />
      </View>
      <GoalInput
        visible={isAddMode}
        addGoal={addGoalHandler}
        onCancel={cancelModal}
      />
      <FlatList
        style={{ width: '100%' }}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            keyToDelete={itemData.item.key}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 80,
    backgroundColor: '#391F3E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewContainer: {
    marginVertical: 50,
    width: '80%'
  },
  titleText: {
    fontSize: 40,
    color: 'white'
  }
});
