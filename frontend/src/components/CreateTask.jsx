import React, { useContext } from 'react';
import TasksContext from '../context/TasksContext';

import { postTask, putTask } from '../services/tasksAPI';

const handleChange = (e, callback) => {
  const { value } = e.target;
  callback(value);
};

const putThisTask = async (obj, reload, taskId, objCallbacks) => {
  const { name, status, createdAt } = obj;
  const arrDate = createdAt.split('-');
  const date = `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`;

  const response = await putTask({ name, status, createdAt: date }, taskId);
  // if (response.code) alert(response.message);

  if (response.statusText === 'OK') {
    reload(true);
    const { setName, setStatus, setCreatedAt, setIsEdit } = objCallbacks;
    setName('');
    setStatus('pendente');
    const arrDateSlash = new Date().toLocaleDateString().split('/');
    const dateSlash = `${arrDateSlash[2]}-${arrDateSlash[1]}-${arrDateSlash[0]}`;
    setCreatedAt(dateSlash);
    setIsEdit(false);
  }
};

const postNewTask = async (obj, callback, objCallbacks) => {
  const { name, status, createdAt } = obj;
  const arrDate = createdAt.split('-');
  const date = `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`;

  const response = await postTask({ name, status, createdAt: date });
  // if (response.code) alert(response.message);

  if (response.statusText === 'Created') {
    callback(true);
    const { setName, setStatus, setCreatedAt, setIsEdit } = objCallbacks;
    setName('');
    setStatus('pendente');
    const arrDateSlash = new Date().toLocaleDateString().split('/');
    const dateSlash = `${arrDateSlash[2]}-${arrDateSlash[1]}-${arrDateSlash[0]}`;
    setCreatedAt(dateSlash);
    setIsEdit(false);
  }
};

const CreateTask = () => {
  const {
    setReload,
    name,
    setName,
    status,
    setStatus,
    createdAt,
    setCreatedAt,
    isEdit,
    setIsEdit,
  } = useContext(TasksContext);

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
          onChange={ ((e) => handleChange(e, setCreatedAt)) }
          value={ createdAt }
        />
      </label>

      <button
        type="button"
        className="yellow-button"
        hidden={ !isEdit }
        onClick={ (() => putThisTask(
          { name, status, createdAt },
          setReload,
          isEdit,
          { setName, setStatus, setCreatedAt, setIsEdit },
        )) }
      >
        Editar tarefa
      </button>

      <button
        type="button"
        className="green-button"
        hidden={ isEdit }
        onClick={ (() => postNewTask(
          { name, status, createdAt },
          setReload, { setName, setStatus, setCreatedAt, setIsEdit },
        )) }
      >
        Salvar nova tarefa
      </button>
    </section>
  );
};

export default CreateTask;
