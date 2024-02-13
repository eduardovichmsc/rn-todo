import { FlatList, RefreshControl, Text, View } from "react-native";
import { TodoItem } from "./TodoItem";
import { useState } from "react";
import { coffee, teal } from "../colors";

export const TodoList = ({
  todoList,
  fetchTodoList,
  removeTodoItem,
  toggleCompleted,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      {todoList.length === 0 ? (
        <Text style={{ textAlign: "center" }}>no no no no no</Text>
      ) : (
        <FlatList
          data={todoList}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchTodoList} />
          }
          renderItem={({ item }) => (
            <TodoItem
              id={item.id}
              createdAt={item.createdAt}
              title={item.title}
              completed={item.completed}
              onPress={removeTodoItem}
              toggleCompleted={toggleCompleted}
            />
          )}
        />
      )}
    </View>
  );
};
