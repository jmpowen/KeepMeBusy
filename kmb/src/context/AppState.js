import { useEffect, useReducer } from 'react';

import AppContext from './AppContext';
import AppReducer from './AppReducer';
import { ADD_TASK, DELETE_TASK, NEW_CURRENT_TASK, SET_GEN_DATA, SET_USER, SET_USER_DATA } from './types';

const API_URL = process.env.REACT_APP_API_URL;

const AppState = (props) => {
  let initialState = {
    currentTask: null,
    genData: null,
    user: null,
    userData: null,
    tasks: [],
  };

  // No reason to use the dispatch yet,
  // Refer to this article as a resource: https://medium.com/javascript-in-plain-english/how-to-use-react-context-api-with-functional-component-472f1d5e0851

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const addTask = (task) => {
    dispatch({ type: ADD_TASK, payload: task })
  }

  const deleteTask = (task) => {
    dispatch({ type: DELETE_TASK, payload: task })
  }

  const newCurrentTask = (task) => {
    dispatch({ type: NEW_CURRENT_TASK, payload: task })
  }
  
  const setGenData = (task) => {
    dispatch({ type: SET_GEN_DATA, payload: task })
  }

  const setUser = (task) => {
    dispatch({ type: SET_USER, payload: task })
  }
  
  const setUserData = (task) => {
    dispatch({ type: SET_USER_DATA, payload: task })
  }

  useEffect(() => {
    const genFetches = async () => {
      let [resGenData] = await Promise.all([
        fetch(API_URL + '/GenData').then(res => res.json())
      ]).catch(err => console.log(err))

      setGenData(resGenData);
    }
    genFetches();
  }, [])

  useEffect(() => {
    if (state.user === null || state.user === undefined) {
      return;
    }
    const userFetches = async () => {
      let [resUserData, resTasks] = await Promise.all([
        fetch(API_URL + '/UserData').then(res => res.json()),
        fetch(API_URL + '/Tasks').then(res => res.json())
      ]).catch(err => console.log(err))

      setUserData(resUserData);
      setTasks(resTasks);
    }
    userFetches();
  }, [state.user])

  return (
    <AppContext.Provider
      value={{
        currentTask: state.currentTask,
        genData: state.genData,
        user: state.user,
        userData: state.userData,
        tasks: state.tasks,
        addTask,
        deleteTask,
        newCurrentTask,
        setGenData,
        setUser,
        setUserData
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;