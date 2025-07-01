import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Note {
  id: number;
  text: string;
}

const NOTE_COLOURS = [
  "bg-green-200",
  "bg-yellow-200",
  "bg-pink-200",
  "bg-blue-200",
  "bg-purple-200",
] as const;


const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("todos") || "[]") as Todo[];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("notes") || "[]") as Note[];
    } catch {
      return [];
    }
  });

  const [todoInput, setTodoInput] = useState<string>("");
  const [noteInput, setNoteInput] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [timeString, setTimeString] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString());
      const h = now.getHours();
      setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => localStorage.setItem("todos", JSON.stringify(todos)), [todos]);
  useEffect(() => localStorage.setItem("notes", JSON.stringify(notes)), [notes]);
  useEffect(() => localStorage.setItem("darkMode", String(darkMode)), [darkMode]);


  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", darkMode);
  }, [darkMode]);


  const filteredTodos = todos.filter((t) =>
    filter === "all" ? true : filter === "completed" ? t.completed : !t.completed
  );

  const addTodo = (): void => {
    const text = todoInput.trim();
    if (!text) return alert("Task cannot be empty");
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
    setTodoInput("");
  };

  const toggleTodo = (id: number): void => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const addNote = (): void => {
    const text = noteInput.trim();
    if (!text) return alert("Note cannot be empty");
    setNotes((prev) => [...prev, { id: Date.now(), text }]);
    setNoteInput("");
  };

  const deleteNote = (id: number): void => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 p-6 flex justify-center">
      <div className="w-full max-w-2xl space-y-8">

        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="font-mono text-sm">{timeString}</span>
            <span className="font-semibold hidden sm:inline-block">{greeting}</span>
            <button
              className="text-2xl focus:outline-none"
              aria-label="Toggle Dark Mode"
              onClick={() => setDarkMode((prev) => !prev)}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </header>


        <section>
          <h2 className="text-lg font-semibold mb-2">To‑Do List</h2>
          <div className="flex gap-2 mb-2">
            <input
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              placeholder="Enter a task"
              className="flex-1 px-3 py-2 border rounded text-gray-900"
            />
            <button onClick={addTodo} className="bg-black text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
          <div className="space-x-2 mb-2 text-sm">
            {[
              { key: "all", label: "All" },
              { key: "completed", label: "Completed" },
              { key: "incomplete", label: "Incomplete" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-2 py-1 border rounded ${filter === key ? "bg-gray-200 dark:bg-gray-700" : ""
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
          <ul className="space-y-2">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`flex justify-between items-center px-3 py-2 border rounded ${todo.completed
                  ? "bg-green-100 dark:bg-green-800/30 line-through"
                  : "bg-gray-100 dark:bg-gray-800/50"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                </div>
                <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>


        <section>
          <h2 className="text-lg font-semibold mb-2">Sticky Notes</h2>
          <div className="flex gap-2 mb-3">
            <input
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Write a note..."
              className="flex-1 px-3 py-2 border rounded text-gray-900"
            />
            <button onClick={addNote} className="bg-black text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {notes.map((note, idx) => (
              <div
                key={note.id}
                className={`relative p-4 rounded shadow ${NOTE_COLOURS[idx % NOTE_COLOURS.length]} dark:bg-opacity-20`}
                style={{ minWidth: 150, maxWidth: 200 }}
              >
                <button
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-1 right-2 text-red-600 font-bold"
                >
                  ×
                </button>
                {note.text}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
