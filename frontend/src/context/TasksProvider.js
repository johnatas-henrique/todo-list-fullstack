import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TasksContext from './TasksContext';
import { getAllTasks } from '../services/tasksAPI';

const TasksProvider = ({ children }) => {
  const arrDateSlash = new Date().toLocaleDateString().split('/');
  const today = `${arrDateSlash[2]}-${arrDateSlash[1]}-${arrDateSlash[0]}`;

  const [tasks, setTasks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [reload, setReload] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('pendente');
  const [createdAt, setCreatedAt] = useState(today);
  const [isEdit, setIsEdit] = useState(false);
  const [sort, setSort] = useState('sem ordenação');

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
