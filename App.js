import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import styled from "styled-components";
import axios from "axios";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { coffee, teal } from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: teal,
    paddingTop: 60,
  },
});

const Input = styled.TextInput`
  border: 1px solid #000;
  border-radius: 20px;
  margin: 0 20px;
  padding: 4px 20px;
  margin-bottom: 10px;
`;
const Submit = styled.TouchableOpacity`
  background: ${coffee};
  border-radius: 20px;
  margin: 4px 20px;
  width: max-content;
  padding: 10px 20px;
  margin-bottom: 20px;
`;

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todoText, setTodoText] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      fetchTodoList();
      setIsFirstLoad(false);
    }
  }, []);

  const fetchTodoList = () => {
    axios
      .get(URL)
      .then(({ data }) => {
        setTodoList(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const addTodoItem = async (text) => {
    if (text.length === 0) {
      Alert.alert("Ошибка", "Введите текст");
      return;
    }

    try {
      await axios.post(URL, {
        id: Date.now(),
        title: text,
        createdAt: Date.now(),
        completed: false,
      });
      // setTodoText("");
      fetchTodoList();
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodoItem = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      const updatedTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedTodoList);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const updatedTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodoList(updatedTodoList);
      await axios.put(`${URL}/${id}`, {
        completed: !todoList.find((todo) => todo.id === id).completed,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <>
          <Input
            placeholder="Новая задача"
            value={todoText}
            onChangeText={setTodoText}
          />
          <Submit onPress={() => addTodoItem(todoText)}>
            <Text>Добавить</Text>
          </Submit>

          <TodoList
            fetchTodoList={fetchTodoList}
            todoList={todoList}
            removeTodoItem={removeTodoItem}
            toggleCompleted={toggleCompleted}
          />
        </>
      )}
    </View>
  );
}
