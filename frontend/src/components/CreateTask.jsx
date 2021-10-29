import React, { useState, useContext } from 'react';
import TasksContext from '../context/TasksContext';

import { postTask } from '../services/tasksAPI';

const handleChange = (e, callback) => {
  const { value } = e.target;
  callback(value);
};

const postNewTask = async (obj, callback, objCallbacks) => {
  const { name, status, createdAt } = obj;
  const date = new Date(createdAt).toLocaleDateString('br');
  const response = await postTask({ name, status, createdAt: date });
  if (response.statusText === 'Created') {
    callback(true);
    const { setName, setStatus, setCreatedAt } = objCallbacks;
    setName('');
    setStatus('pendente');
    setCreatedAt(new Date().toISOString().split('T')[0]);
  }
};

const CreateTask = () => {
  const today = new Date().toISOString().split('T')[0];
  const [name, setName] = useState('');
  const [status, setStatus] = useState('pendente');
  const [createdAt, setCreatedAt] = useState(today);
  const { setReload } = useContext(TasksContext);

  return (
    <section className="create-new-task">
      <label htmlFor="task-name" className="three-row">
        <p>Nome</p>
        <input
          name="name"
          id="task-name"
          type="text"
          placeholder="Nome da tarefa"
          className="complete-space"
          onChange={ ((e) => handleChange(e, setName)) }
          value={ name }
        />
      </label>

      <label htmlFor="task-status" className="three-row">
        <p>Status</p>
        <select
          name="status"
          id="task-status"
          placeholder="status"
          defaultValue="pendente"
          onChange={ ((e) => handleChange(e, setStatus)) }
          value={ status }
        >
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em andamento</option>
          <option value="pronto">Pronto</option>
        </select>
      </label>

      <label htmlFor="task-date" className="three-row">
        <p>Data da criação</p>
        <input
          name="date"
          id="task-date"
          type="date"
          defaultValue={ today }
          onChange={ ((e) => handleChange(e, setCreatedAt)) }
          value={ createdAt }
        />
      </label>

      <button
        type="button"
        className="green-button"
        onClick={ (() => postNewTask(
          { name, status, createdAt },
          setReload, { setName, setStatus, setCreatedAt },
        )) }
      >
        Salvar nova tarefa
      </button>
    </section>
  );
};

export default CreateTask;
