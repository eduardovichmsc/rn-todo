import styled from "styled-components";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { coffee, teal } from "../colors";

const TodoView = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-end;
  background: #ffffff10;
  padding: 20px 30px;
`;
const TodoDetails = styled.View`
  flex: 1;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;
const TodoTitle = styled.Text`
  margin-top: 4px;
  font-size: 18px;
  font-weight: 600;
`;
const TodoDate = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: #1e1e1e;
`;
const TodoButton = styled.TouchableOpacity`
  flex-shrink: 0;
  flex-direction: column;
`;
const Divider = styled.View`
  height: 1px;
  background: #00000020;
`;

const UTC = 5;
const getDate = (createdAt) => {
  const date = new Date(createdAt);
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} - ${date.getHours(
    date.setHours(date.getHours() + UTC) // тут даже я ахерел
  )}:${date.getMinutes()}`;
};

export const TodoItem = ({
  id,
  title,
  createdAt,
  completed,
  onPress,
  toggleCompleted,
}) => {
  return (
    <>
      <TodoView>
        <TouchableOpacity onPress={() => toggleCompleted(id)}>
          {completed ? (
            <MaterialIcons selectable name="check-box" size={24} />
          ) : (
            <MaterialIcons
              selectable
              name="check-box-outline-blank"
              size={24}
            />
          )}
        </TouchableOpacity>
        <TodoDetails>
          <TodoDate>{getDate(createdAt)}</TodoDate>
          <TodoTitle>{title}</TodoTitle>
        </TodoDetails>
        <TouchableOpacity onPress={() => onPress(id)}>
          <MaterialIcons name="delete" size={24} color={coffee} />
        </TouchableOpacity>
      </TodoView>
      <Divider></Divider>
    </>
  );
};
