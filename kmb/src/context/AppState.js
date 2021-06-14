import { useReducer } from 'react';

import AppContext from './AppContext';
import AppReducer from './AppReducer';
import { ADD_TASK, DELETE_TASK, NEW_CURRENT_TASK, SET_USER } from './types';

const AppState = (props) => {
  let initialState = {
    currentTask: null,
    user: null,
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

  const setUser = (task) => {
    dispatch({ type: SET_USER, payload: task })
  }

  return (
    <AppContext.Provider
      value={{
        currentTask: state.currentTask,
        user: state.user,
        tasks: state.tasks,
        addTask,
        deleteTask,
        newCurrentTask,
        setUser
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;