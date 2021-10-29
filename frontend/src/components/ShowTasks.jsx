import React, { useContext } from 'react';
import TasksContext from '../context/TasksContext';
import { deleteTask } from '../services/tasksAPI';

const deleteThisTask = async (taskId, callback) => {
  const response = await deleteTask(taskId);
  if (response.statusText === 'No Content') {
    callback(true);
  }
};

const ShowTasks = () => {
  const { tasks, isFetching, setReload } = useContext(TasksContext);

  return (
    isFetching
      ? <section>Carregando as tarefas...</section>
      : (
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
              <button type="button" className="edit-button">Editar</button>
              <button
                type="button"
                className="edit-button"
                onClick={ (() => deleteThisTask(_id, setReload)) }
              >
                Apagar
              </button>
            </div>
          ))}
        </section>
      )
  );
};

export default ShowTasks;
