const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем парсинг JSON и URL-encoded данных
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Простой маршрут для проверки работы сервера
app.get("/", (req, res) => {
  res.send("Привет, мир!");
});

let todoStore = []; // Предположим, что это наши данные

// Получение всех элементов
app.get("/todo", (req, res) => {
  res.json(todoStore);
});

// Получение элемента по id
app.get("/todo/:id", (req, res) => {
  const id = req.params.id;
  const item = todoStore.find((item) => item.id === parseInt(id));
  if (!item) {
    res.status(404).send("Элемент не найден");
  } else {
    res.json(item);
  }
});

// Добавление нового элемента
app.post("/todo", (req, res) => {
  const newItem = req.body;
  todoStore.push(newItem);
  res.status(201).json(newItem);
});

// Обновление элемента по id
app.put("/todo/:id", (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;
  const index = todoStore.findIndex((item) => item.id === parseInt(id));
  if (index === -1) {
    res.status(404).send("Элемент не найден");
  } else {
    // Обновляем только поле completed
    todoStore[index].completed = updatedItem.completed;
    res.json(todoStore[index]);
  }
});

// Удаление элемента по id
app.delete("/todo/:id", (req, res) => {
  const id = req.params.id;
  todoStore = todoStore.filter((item) => item.id !== parseInt(id));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
