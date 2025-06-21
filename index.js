// 1. Mengimpor pustaka yang sudah diinstall
const express = require('express');
const cors = require('cors');

// 2. Membuat instance dari aplikasi express
const app = express();

// 3. Menentukan port. Menggunakan process.env.PORT untuk kompatibilitas dengan layanan cloud seperti Cloud Run
const port = process.env.PORT || 8080;


// 4. Menerapkan Middleware
app.use(cors()); // Mengizinkan semua permintaan cross-origin
app.use(express.json()); // Agar server bisa membaca data JSON yang dikirim di body request

// 5. Variabel untuk menyimpan data To-Do (sebagai pengganti database)
// Data ini akan reset setiap kali server dimulai ulang.
let todos = [
  {
    "id": 1,
    "title": "Belajar Cloud Computing",
    "description": "Mengerjakan tugas besar komputasi awan",
    "completed": false,
    "dueDate": "2025-06-25",
    "createdAt": "2025-06-16T13:00:00Z"
  }
];

// Variabel untuk membuat ID unik secara otomatis
let currentId = 2; 

// 6. Rute atau Endpoint untuk API

// GET /api/todos - Mengambil seluruh data
app.get('/api/todos', (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Data retrieved successfully",
    data: todos
  });
});

// POST /api/todos - Menambahkan to-do baru
app.post('/api/todos', (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTodo = {
    id: currentId++,
    title,
    description,
    completed: false,
    dueDate,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  res.status(201).json({
    status: "success",
    message: "To-do added successfully",
    data: newTodo
  });
});

// GET /api/todos/:id - Mengambil detail to-do
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    res.status(200).json({
      status: "success",
      message: "Data retrieved successfully",
      data: todo
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found" // Pesan sesuai format response gagal 
    });
  }
});

// PUT /api/todos/:id - Memperbarui to-do
app.put('/api/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex !== -1) {
    const { title, description, completed, dueDate } = req.body;
    todos[todoIndex] = { ...todos[todoIndex], title, description, completed, dueDate };
    res.status(200).json({
      status: "success",
      message: "To-do updated successfully",
      data: todos[todoIndex]
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }
});

// DELETE /api/todos/:id - Menghapus to-do
app.delete('/api/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.status(200).json({
      status: "success",
      message: "To-do deleted successfully",
      data: null // Data bisa null untuk operasi delete
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }
});

// 7. Menjalankan server
app.listen(port, () => {
  console.log(`Backend server berjalan di http://localhost:${port}`);
});