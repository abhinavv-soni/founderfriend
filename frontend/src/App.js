import React, { useState, useEffect } from 'react';
import './App.css';

// Components for different sections
const Journal = ({ entries, setEntries }) => {
  const [newEntry, setNewEntry] = useState({ title: '', content: '', date: '' });

  const addEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry = { ...newEntry, id: Date.now(), date: new Date().toISOString() };
      setEntries([entry, ...entries]);
      setNewEntry({ title: '', content: '', date: '' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Journal</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-2 border rounded"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
        />
        <textarea
          placeholder="Write your thoughts..."
          className="w-full p-2 mb-2 border rounded h-32"
          value={newEntry.content}
          onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
        />
        <button
          onClick={addEntry}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Entry
        </button>
      </div>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="border p-4 rounded">
            <h3 className="font-bold">{entry.title}</h3>
            <p className="text-gray-600 text-sm">{new Date(entry.date).toLocaleDateString()}</p>
            <p className="mt-2">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Tasks = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({ title: '', status: 'todo' });

  const addTask = () => {
    if (newTask.title) {
      const task = { ...newTask, id: Date.now() };
      setTasks([task, ...tasks]);
      setNewTask({ title: '', status: 'todo' });
    }
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const columns = ['todo', 'inProgress', 'done'];
  const columnTitles = {
    todo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done'
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="New task"
          className="p-2 border rounded mr-2"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {columns.map(status => (
          <div key={status} className="border rounded p-4">
            <h3 className="font-bold mb-2">{columnTitles[status]}</h3>
            {tasks
              .filter(task => task.status === status)
              .map(task => (
                <div key={task.id} className="bg-white p-2 rounded shadow mb-2">
                  <p>{task.title}</p>
                  <div className="flex gap-2 mt-2">
                    {status !== 'todo' && (
                      <button
                        onClick={() => moveTask(task.id, 'todo')}
                        className="text-sm text-blue-500"
                      >
                        ← To Do
                      </button>
                    )}
                    {status !== 'inProgress' && (
                      <button
                        onClick={() => moveTask(task.id, 'inProgress')}
                        className="text-sm text-blue-500"
                      >
                        In Progress
                      </button>
                    )}
                    {status !== 'done' && (
                      <button
                        onClick={() => moveTask(task.id, 'done')}
                        className="text-sm text-blue-500"
                      >
                        Done →
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Notes = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const addNote = () => {
    if (newNote.title && newNote.content) {
      const note = { ...newNote, id: Date.now() };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-2 border rounded"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Note content..."
          className="w-full p-2 mb-2 border rounded h-32"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="border p-4 rounded">
            <h3 className="font-bold">{note.title}</h3>
            <p className="mt-2">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Expenses = ({ expenses, setExpenses }) => {
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '' });

  const addExpense = () => {
    if (newExpense.description && newExpense.amount) {
      const expense = { ...newExpense, id: Date.now(), date: new Date().toISOString() };
      setExpenses([expense, ...expenses]);
      setNewExpense({ description: '', amount: '', category: '' });
    }
  };

  const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Expenses</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Description"
          className="p-2 border rounded mr-2"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          className="p-2 border rounded mr-2"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          className="p-2 border rounded mr-2"
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
        />
        <button
          onClick={addExpense}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Expense
        </button>
      </div>
      <div className="mb-4">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
      </div>
      <div className="space-y-2">
        {expenses.map((expense) => (
          <div key={expense.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{expense.description}</h3>
              <p className="text-sm text-gray-600">{expense.category}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">${parseFloat(expense.amount).toFixed(2)}</p>
              <p className="text-sm text-gray-600">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('journal');
  const [journal, setJournal] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedJournal = localStorage.getItem('journal');
    const loadedTasks = localStorage.getItem('tasks');
    const loadedNotes = localStorage.getItem('notes');
    const loadedExpenses = localStorage.getItem('expenses');

    if (loadedJournal) setJournal(JSON.parse(loadedJournal));
    if (loadedTasks) setTasks(JSON.parse(loadedTasks));
    if (loadedNotes) setNotes(JSON.parse(loadedNotes));
    if (loadedExpenses) setExpenses(JSON.parse(loadedExpenses));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('journal', JSON.stringify(journal));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [journal, tasks, notes, expenses]);

  const tabs = [
    { id: 'journal', label: 'Journal' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'notes', label: 'Notes' },
    { id: 'expenses', label: 'Expenses' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Founder's Friend</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow">
          {activeTab === 'journal' && <Journal entries={journal} setEntries={setJournal} />}
          {activeTab === 'tasks' && <Tasks tasks={tasks} setTasks={setTasks} />}
          {activeTab === 'notes' && <Notes notes={notes} setNotes={setNotes} />}
          {activeTab === 'expenses' && <Expenses expenses={expenses} setExpenses={setExpenses} />}
        </div>
      </div>
    </div>
  );
}

export default App;