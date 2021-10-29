import React from 'react';
import './App.css';
import CreateTask from './components/CreateTask';
import ShowTasks from './components/ShowTasks';
import TasksProvider from './context/TasksProvider';

const App = () => (
  <TasksProvider>
    <div className="App">
      <header className="App-header">
        <h1>Ebtyr - Tarefas</h1>
      </header>
      <CreateTask />
      <ShowTasks />
    </div>
  </TasksProvider>
);
export default App;
