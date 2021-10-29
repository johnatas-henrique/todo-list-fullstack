import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TasksContext from './TasksContext';
import { getAllTasks } from '../services/tasksAPI';

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [reload, setReload] = useState(false);

  const fetchApi = async () => {
    const response = await getAllTasks();

    if (response.statusText === 'OK') {
      setTasks(response.data);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    if (reload) {
      fetchApi();
      setReload(false);
    }
  }, [reload]);

  const allStates = { tasks, setTasks, isFetching, setIsFetching, reload, setReload };

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
