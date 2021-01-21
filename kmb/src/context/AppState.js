import React, { useReducer } from 'react';

import AppContext from './AppContext';
import AppReducer from './AppReducer';
import { ADD_TASK, DELETE_TASK } from './types';

const AppState = (props) => {
  let initialState = {
    tasks: [],
    currentTask: null
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

  return (
    <AppContext.Provider
      value={{
        tasks: state.tasks,
        currentTask: state.currentTask,
        addTask,
        deleteTask
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;