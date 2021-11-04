import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TasksContext from './TasksContext';
import { getAllTasks } from '../services/tasksAPI';
import { getTodayWithDashes } from '../date';

const TasksProvider = ({ children }) => {
  const today = getTodayWithDashes();

  const [tasks, setTasks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [reload, setReload] = useState(true);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('pendente');
  const [createdAt, setCreatedAt] = useState(today);
  const [isEdit, setIsEdit] = useState(false);
  const [sort, setSort] = useState('sem ordenação');

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllTasks();
      let fetchedTasks = [];
      if (response && response.statusText === 'OK') {
        fetchedTasks = response.data;
      }
      if (sort !== 'sem ordenação') {
        fetchedTasks = fetchedTasks.sort(
          (a, b) => a[sort].toLowerCase().localeCompare(b[sort].toLowerCase()),
        );
      }
      setTasks(fetchedTasks);
      setIsFetching(false);
    };
    if (reload) {
      fetchApi();
      setReload(false);
    }
  }, [reload, sort]);

  const allStates = {
    tasks,
    setTasks,
    isFetching,
    setIsFetching,
    reload,
    setReload,
    name,
    setName,
    status,
    setStatus,
    createdAt,
    setCreatedAt,
    isEdit,
    setIsEdit,
    sort,
    setSort,
  };

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
