import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TasksContext from './TasksContext';
import { getAllTasks } from '../services/tasksAPI';

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState({ tasks: [], isLoading: true });

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllTasks();
      setTasks(response.data);
    };
    fetchApi();
  }, []);

  const allStates = { tasks, setTasks };

  return (
    <TasksContext.Provider value={ allStates }>
      {children}
    </TasksContext.Provider>
  );
};

TasksProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default TasksProvider;
