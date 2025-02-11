import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, DollarSign, Book, CheckSquare, FileText, PlusCircle, ChevronRight, Trash2 } from 'lucide-react';
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

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Journal</h2>
          <p className="mt-1 text-sm text-gray-500">Capture your thoughts, ideas, and reflections</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-xl p-4"
      >
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Entry Title"
              className="input text-lg font-medium"
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
            />
          </div>
          <div>
            <textarea
              placeholder="Write your thoughts..."
              className="input h-32 resize-none"
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addEntry}
              className="btn btn-primary"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Entry
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <AnimatePresence>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="card hover:border-primary-100"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <time dateTime={entry.date}>
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-gray-600 whitespace-pre-line">{entry.content}</p>
              <div className="mt-4 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => deleteEntry(entry.id)}
                  className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
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

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
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

  const columnIcons = {
    todo: <CheckSquare className="w-5 h-5 text-primary-500" />,
    inProgress: <Clock className="w-5 h-5 text-accent-500" />,
    done: <CheckSquare className="w-5 h-5 text-green-500" />
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Tasks</h2>
          <p className="mt-1 text-sm text-gray-500">Organize and track your work</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-xl p-4 flex gap-4"
      >
        <input
          type="text"
          placeholder="Add a new task..."
          className="input flex-grow"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addTask}
          className="btn btn-primary whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Task
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(status => (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-soft p-4"
          >
            <div className="flex items-center gap-2 mb-4">
              {columnIcons[status]}
              <h3 className="font-semibold text-gray-900">{columnTitles[status]}</h3>
              <span className="ml-auto bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                {tasks.filter(task => task.status === status).length}
              </span>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence>
                {tasks
                  .filter(task => task.status === status)
                  .map(task => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => deleteTask(task.id)}
                          className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {status !== 'todo' && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => moveTask(task.id, 'todo')}
                            className="text-sm px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            ← To Do
                          </motion.button>
                        )}
                        {status !== 'inProgress' && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => moveTask(task.id, 'inProgress')}
                            className="text-sm px-2 py-1 rounded bg-accent-100 text-accent-700 hover:bg-accent-200 transition-colors"
                          >
                            In Progress
                          </motion.button>
                        )}
                        {status !== 'done' && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => moveTask(task.id, 'done')}
                            className="text-sm px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                          >
                            Done →
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </motion.div>
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

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Notes</h2>
          <p className="mt-1 text-sm text-gray-500">Quick notes and reminders</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-xl p-4"
      >
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Note Title"
              className="input text-lg font-medium"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
          </div>
          <div>
            <textarea
              placeholder="Write your note..."
              className="input h-32 resize-none"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addNote}
              className="btn btn-primary"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Note
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card group hover:border-primary-100"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {note.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>Note</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-gray-600">{note.content}</p>
              <div className="mt-4 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
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

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Expenses</h2>
          <p className="mt-1 text-sm text-gray-500">Track your spending and budget</p>
        </div>
        <div className="bg-primary-50 px-4 py-2 rounded-lg">
          <p className="text-sm text-primary-600 font-medium">Total Expenses</p>
          <p className="text-2xl font-bold text-primary-700">${total.toFixed(2)}</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-xl p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Description"
              className="input"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Amount"
              className="input"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
          </div>
          <div>
            <select
              className="input"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addExpense}
            className="btn btn-primary"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Expense
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {expenses.map((expense) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card group hover:border-primary-100"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {expense.description}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <DollarSign className="w-4 h-4" />
                    <span>{expense.category || 'Uncategorized'}</span>
                  </div>
                </div>
                <div className="bg-primary-50 px-3 py-1 rounded-full">
                  <p className="text-lg font-bold text-primary-700">${parseFloat(expense.amount).toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-500">
                <time dateTime={expense.date}>
                  {new Date(expense.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
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
    <div className="min-h-screen bg-[#FAFBFF]">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-shrink-0 flex items-center"
              >
                <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Founder's Friend
                </h1>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {tabs.map((tab) => {
            const Icon = {
              journal: Book,
              tasks: CheckSquare,
              notes: FileText,
              expenses: DollarSign
            }[tab.id];

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div 
          layout
          className="bg-white rounded-2xl shadow-xl shadow-blue-50/50 border border-gray-100"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'journal' && <Journal entries={journal} setEntries={setJournal} />}
              {activeTab === 'tasks' && <Tasks tasks={tasks} setTasks={setTasks} />}
              {activeTab === 'notes' && <Notes notes={notes} setNotes={setNotes} />}
              {activeTab === 'expenses' && <Expenses expenses={expenses} setExpenses={setExpenses} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default App;