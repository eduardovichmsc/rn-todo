import React from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { TodoItem } from "./TodoItem";
import styled from "styled-components/native";

const ListView = styled(FlatList)`
  flex: 1;
`;

export const TodoList = ({
  todoList,
  fetchTodoList,
  removeTodoItem,
  toggleCompleted,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>
      {todoList.length === 0 ? (
        <Text style={{ textAlign: "center" }}>no no no no no</Text>
      ) : (
        <ListView
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
