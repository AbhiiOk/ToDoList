import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];
    setTasks(savedTasks);
    setCompletedTasks(savedCompletedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  const addTask = () => {
    if (task.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = task;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setTask("");
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditingIndex(index);
  };

  const deleteTask = (index) => {
    const taskToDelete = tasks[index];
    alert(`${taskToDelete} Task is Completed`);
    setCompletedTasks([...completedTasks, taskToDelete]);
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Todo List
        </h1>

        <div style={{ display: "flex", marginBottom: "20px", gap: "10px" }}>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            style={{
              flexGrow: 1,
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={addTask}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {editingIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
          {tasks.map((t, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              <span style={{ color: "#333" }}>{t}</span>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => editTask(index)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#888",
              marginTop: "20px",
            }}
          >
            No tasks yet. Add one!
          </p>
        )}
      </div>

      {showHistory && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "300px",
            width: "90%",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            Completed Tasks
          </h2>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            {completedTasks.map((ct, index) => (
              <li
                key={index}
                style={{
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                {ct}
              </li>
            ))}
          </ul>
          {completedTasks.length === 0 && (
            <p style={{ textAlign: "center", color: "#888" }}>
              No completed tasks yet.
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => setShowHistory(!showHistory)}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          backgroundColor: "#6c757d",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {showHistory ? "Hide History" : "Show History"}
      </button>
    </div>
  );
};

export default TodoApp;
