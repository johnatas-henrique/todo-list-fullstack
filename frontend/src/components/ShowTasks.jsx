import React, { useContext } from 'react';
import TasksContext from '../context/TasksContext';
import { deleteTask } from '../services/tasksAPI';

const handleChange = (e, callback) => {
  const { setSort, setReload, tasks, setTasks } = callback;
  const { value } = e.target;
  setSort(value);
  if (value === 'sem ordenação') {
    setReload(true);
  }
  if (value !== 'sem ordenação') {
    const sortedTasks = tasks.sort(
      (a, b) => a[value].toLowerCase().localeCompare(b[value].toLowerCase()),
    );
    setTasks(sortedTasks);
  }
};

const deleteThisTask = async (taskId, reload, edit) => {
  const response = await deleteTask(taskId);
  if (response.code) alert(response.message);

  if (response.statusText === 'No Content') {
    reload(true);
    edit(false);
  }
};

const editTask = (taskId, allTasks, callback, setFunctions) => {
  callback(taskId);
  const task = allTasks.find(({ _id }) => _id === taskId);
  const { setName, setStatus, setCreatedAt } = setFunctions;
  setName(task.name);
  setStatus(task.status);
  const arrDate = task.createdAt.split('/');
  const date = `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`;
  setCreatedAt(date);
};

const ShowTasks = () => {
  const {
    tasks,
    setTasks,
    isFetching,
    setReload,
    setIsEdit,
    setName,
    setStatus,
    setCreatedAt,
    sort,
    setSort,
  } = useContext(TasksContext);

  return (
    isFetching
      ? <section>Carregando as tarefas...</section>
      : (
        <>
          <div>
            <label htmlFor="task-status" className="three-row">
              <p>Ordenação</p>
              <select
                name="status"
                id="task-status"
                placeholder="status"
                onChange={ ((e) => handleChange(
                  e, { sort, setSort, setReload, tasks, setTasks },
                )) }
                value={ sort }
              >
                <option value="sem ordenação">Sem ordenação</option>
                <option value="name">Nome</option>
                <option value="status">Status</option>
                <option value="createdAt">Data</option>
              </select>
            </label>
          </div>

          <section className="show-tasks">
            {tasks.map(({ _id, name, status, createdAt }) => (
              <div key={ _id } className="task-item">
                <h2>{name}</h2>
                <p>{status.toString().charAt(0).toUpperCase() + status.slice(1)}</p>
                <p>
                  Criada em:
                  <br />
                  {createdAt}
                </p>
                <button
                  type="button"
                  className="edit-button"
                  onClick={ (() => editTask(
                    _id, tasks, setIsEdit, { setName, setStatus, setCreatedAt },
                  )) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="edit-button"
                  onClick={ (() => deleteThisTask(_id, setReload, setIsEdit)) }
                >
                  Apagar
                </button>
              </div>
            ))}
          </section>
        </>
      )
  );
};

export default ShowTasks;
