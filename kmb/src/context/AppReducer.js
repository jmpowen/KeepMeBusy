import { ADD_TASK, DELETE_TASK, NEW_CURRENT_TASK, SET_USER } from './types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch(type) {
    case ADD_TASK:
      // Adding task to the task array (might be passing an array here)
      let addT = state.tasks;
      addT.push(payload);

      return {
        ...state,
        tasks: addT,
      };
    case DELETE_TASK:
      let delT = state.tasks;
      delT.filter(task => task.name === payload.name);
      return {
        ...state,
        tasks: delT
      };
    case NEW_CURRENT_TASK:
      return {
        ...state,
        currentTask: payload
      }
    case SET_USER:
      return {
        ...state,
        user: payload
      }
    default:
      return state;
  }
}