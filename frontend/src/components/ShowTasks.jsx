import React, { useContext } from 'react';
import TasksContext from '../context/TasksContext';

const ShowTasks = () => {
  const { tasks, isFetching } = useContext(TasksContext);

  return (
    isFetching
      ? <section>Carregando as tarefas...</section>
      : (
        <section className="show-tasks">
          {tasks.map(({ _id, name, status, createdAt }) => (
            <div key={ _id } className="task-item">
              <h2>{name}</h2>
              <p>{status}</p>
              <p>
                Criada em:
                <br />
                {createdAt}
              </p>
              <button type="button" className="edit-button">Editar tarefa</button>
            </div>
          ))}
        </section>
      )
  );
};

export default ShowTasks;
