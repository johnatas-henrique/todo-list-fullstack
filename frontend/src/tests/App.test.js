import React from 'react';
import { act, wait, cleanup, render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import { axiosGet, axiosPost, axiosPut } from './testData';
import { getTodayWithDashes } from '../date';

const createdAtLabel = 'Data da criação';
const buttonSaveTaskLabel = 'Salvar nova tarefa';
const orderByDataTest = 'task-order';
const statusRunning = 'em andamento';
const axiosPostGet = [...axiosGet, axiosPost];

const mockAxiosGet = () => {
  jest.spyOn(axios, 'get').mockImplementation(() => Promise
    .resolve({ status: 200, statusText: 'OK', data: axiosGet }));
};
const mockAxiosPut = () => {
  const { name, status, createdAt } = axiosPut;
  jest.spyOn(axios, 'put').mockImplementation(() => Promise
    .resolve({ status: 200, statusText: 'OK', data: { name, status, createdAt } }));
};
const mockAxiosPost = () => {
  const { name, status, createdAt } = axiosPost;
  jest.spyOn(axios, 'post').mockImplementation(() => Promise
    .resolve({ status: 200, statusText: 'Created', data: { name, status, createdAt } }));
};
const mockAxiosDelete = () => {
  jest.spyOn(axios, 'delete').mockImplementation(() => Promise
    .resolve({ status: 204, statusText: 'No Content', data: '' }));
};
const mockAxiosGetParam = (param) => {
  jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise
    .resolve({ status: 200, statusText: 'OK', data: param }));
};
describe('Teste da aplicação inteira', () => {
  beforeAll(mockAxiosDelete);
  beforeEach(cleanup);
  it('renderiza o título', async () => {
    mockAxiosGetParam(axiosGet);
    await act(async () => { render(<App />); });

    const title = screen.getByText(/Ebtyr - Tarefas/i);
    expect(title).toBeInTheDocument();
  });

  it('renderiza o componente CreateTask, com seus inputs e botões', async () => {
    mockAxiosGetParam(axiosGet);
    await act(async () => { render(<App />); });

    const inputName = screen.getByLabelText('Nome');
    expect(inputName).toBeInTheDocument();
    const selectStatus = screen.getByLabelText('Status');
    expect(selectStatus).toBeInTheDocument();
    const inputDate = screen.getByLabelText(createdAtLabel);
    expect(inputDate).toBeInTheDocument();
    const buttonSaveTask = screen.getByText(buttonSaveTaskLabel);
    expect(buttonSaveTask).toBeInTheDocument();
  });

  it('renderiza o componente ShowTasks, antes da requisição finalizada', async () => {
    mockAxiosGetParam(axiosGet);
    render(<App />);

    const fetchingInfo = screen.queryByText('Carregando as tarefas...');
    expect(fetchingInfo).toBeInTheDocument();
    await wait(() => {
      expect(fetchingInfo).not.toBeInTheDocument();
    });
  });

  it('Realize uma requisição do tipo GET para a API', async () => {
    mockAxiosGetParam(axiosGet);
    await act(async () => { render(<App />); });

    expect(axios.get).toHaveBeenCalled();
  });

  it('renderiza o elemento select do componente ShowTasks', async () => {
    mockAxiosGetParam(axiosGet);
    await act(async () => { render(<App />); });

    const selectOrderBy = screen.getByTestId(orderByDataTest);
    expect(selectOrderBy).toBeInTheDocument();
  });

  it('renderiza os cards com as tarefas do componente ShowTasks', async () => {
    mockAxiosGetParam(axiosGet);
    await act(async () => { render(<App />); });

    for (let i = 0; i < axiosGet.length; i += 1) {
      const nameTask = screen.getByTestId(`name-task-${i}`);
      expect(nameTask).toBeInTheDocument();
      expect(nameTask.innerHTML).toBe(axiosGet[i].name);
      const statusTask = screen.getByTestId(`status-task-${i}`);
      expect(statusTask).toBeInTheDocument();
      const status = axiosGet[i].status[0].toUpperCase() + axiosGet[i].status.slice(1);
      expect(statusTask.innerHTML).toBe(status);
      const createdAtTask = screen.getByTestId(`created-at-task-${i}`);
      expect(createdAtTask).toBeInTheDocument();
      expect(createdAtTask.innerHTML).toBe(axiosGet[i].createdAt);
      const editBtnTask = screen.getByTestId(`edit-button-task-${i}`);
      expect(editBtnTask).toBeInTheDocument();
      const deleteBtnTask = screen.getByTestId(`delete-button-task-${i}`);
      expect(deleteBtnTask).toBeInTheDocument();
    }
  });

  it('ao clicar no botão editar da primeira tarefa, verificar alterações', async () => {
    mockAxiosPut();
    mockAxiosGetParam(axiosGet);
    await act(async () => { render(<App />); });

    await wait(() => {
      const inputName = screen.getByLabelText('Nome');
      expect(inputName).toBeInTheDocument();
      expect(inputName.value).toBe('');
      const selectStatus = screen.getByLabelText('Status');
      expect(selectStatus).toBeInTheDocument();
      expect(selectStatus.value).toBe('pendente');
      const inputDate = screen.getByLabelText(createdAtLabel);
      expect(inputDate).toBeInTheDocument();
      const date1 = getTodayWithDashes();
      expect(inputDate.value).toBe(date1);
      expect(screen.getByText(buttonSaveTaskLabel)).toBeInTheDocument();
      const editBtnTask = screen.getByTestId('edit-button-task-0');
      fireEvent.click(editBtnTask);
      const arrDate2 = axiosGet[0].createdAt.split('/');
      const date2 = `${arrDate2[2]}-${arrDate2[1]}-${arrDate2[0]}`;
      expect(inputName.value).toBe(axiosGet[0].name);
      expect(selectStatus.value).toBe(axiosGet[0].status);
      expect(inputDate.value).toBe(date2);
      expect(screen.getByText('Editar tarefa')).toBeInTheDocument();
    });
  });

  it('ao clicar no botão deletar da primeira tarefa, verificar alterações', async () => {
    mockAxiosDelete();
    mockAxiosGet();
    await act(async () => { render(<App />); });

    await wait(() => {
      const nameTask0 = screen.getByTestId('name-task-0');
      expect(nameTask0).toBeInTheDocument();
      expect(nameTask0.innerHTML).toBe(axiosGet[0].name);
      const nameTask1 = screen.getByTestId('name-task-1');
      expect(nameTask1).toBeInTheDocument();
      expect(nameTask1.innerHTML).toBe(axiosGet[1].name);
      fireEvent.click(screen.getByTestId('delete-button-task-0'));
      expect(screen.getByText(nameTask1.innerHTML)).toBeInTheDocument();
    });
  });

  it('ao escolher uma opção de ordenação, verificar alterações', async () => {
    mockAxiosGetParam(axiosGet);
    await act(async () => { render(<App />); });

    for (let i = 0; i < axiosGet.length; i += 1) {
      expect(screen.getByTestId(`name-task-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`name-task-${i}`).innerHTML).toBe(axiosGet[i].name);
      const createdAt = screen.getByTestId(`created-at-task-${i}`);
      expect(createdAt).toBeInTheDocument();
      expect(createdAt.innerHTML).toBe(axiosGet[i].createdAt);
    }
    const sorted = axiosGet.sort(
      (a, b) => a.createdAt.toLowerCase().localeCompare(b.createdAt.toLowerCase()),
    );
    const selectOrderBy = screen.getByTestId(orderByDataTest);
    expect(selectOrderBy).toBeInTheDocument();
    fireEvent.change(selectOrderBy, { target: { value: 'createdAt' } });
    for (let i = 0; i < sorted.length; i += 1) {
      expect(screen.getByTestId(`name-task-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`name-task-${i}`).innerHTML).toBe(sorted[i].name);
      const createdAt = screen.getByTestId(`created-at-task-${i}`);
      expect(createdAt).toBeInTheDocument();
      expect(createdAt.innerHTML).toBe(sorted[i].createdAt);
    }
  });

  it('ao escolher para não ordenar, verificar alterações', async () => {
    mockAxiosGetParam(axiosPostGet);
    await act(async () => { render(<App />); });

    const selectOrderBy = screen.getByTestId(orderByDataTest);
    expect(selectOrderBy).toBeInTheDocument();
    fireEvent.change(selectOrderBy, { target: { value: 'createdAt' } });
    fireEvent.change(selectOrderBy, { target: { value: 'sem ordenação' } });
    await wait(() => {
      for (let i = 0; i < axiosGet.length; i += 1) {
        expect(screen.getByTestId(`name-task-${i}`)).toBeInTheDocument();
        expect(screen.getByTestId(`name-task-${i}`).innerHTML).toBe(axiosGet[i].name);
        const createdAt = screen.getByTestId(`created-at-task-${i}`);
        expect(createdAt).toBeInTheDocument();
        expect(createdAt.innerHTML).toBe(axiosGet[i].createdAt);
      }
    });
  });

  it('adicionando nova tarefa', async () => {
    mockAxiosPost();
    mockAxiosGetParam(axiosPostGet);
    await act(async () => { render(<App />); });

    const inputName = screen.getByLabelText('Nome');
    const selectStatus = screen.getByLabelText('Status');
    const inputDate = screen.getByLabelText(createdAtLabel);
    const buttonSaveTask = screen.getByText(buttonSaveTaskLabel);
    fireEvent.change(inputName, { target: { value: 'Escrever mais testes de front' } });
    fireEvent.change(selectStatus, { target: { value: 'pronto' } });
    fireEvent.change(inputDate, { target: { value: '2021-10-30' } });
    fireEvent.click(buttonSaveTask);
    await wait(() => {
      expect(inputName.value).toBe('');
      expect(selectStatus.value).toBe('pendente');
      expect(inputDate.value).toBe(getTodayWithDashes());
    });
  });

  it('alterando tarefa existente', async () => {
    mockAxiosPut();
    mockAxiosGetParam(axiosGet);
    await act(async () => { render(<App />); });

    const editBtnTask = screen.getByTestId('edit-button-task-0');
    fireEvent.click(editBtnTask);
    const inputName = screen.getByLabelText('Nome');
    const selectStatus = screen.getByLabelText('Status');
    await wait(() => {
      fireEvent.change(inputName, { target: { value: 'Testando o botão edit' } });
      expect(inputName.value).toBe('Testando o botão edit');
      fireEvent.change(selectStatus, { target: { value: statusRunning } });
      expect(selectStatus.value).toBe(statusRunning);
      const putBtnTask = screen.getByText('Editar tarefa');
      fireEvent.click(putBtnTask);
    });
    const statusTask = screen.getByTestId('status-task-0');
    expect(statusTask).toBeInTheDocument();
  });
});
