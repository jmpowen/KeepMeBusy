import { ADD_TASK, DELETE_TASK } from './types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch(type) {
    case ADD_TASK:
      let addT = state.tasks;
      addT.push(payload);
      return {
        ...state,
        tasks: addT
      };
    case DELETE_TASK:
      let delT = state.tasks;
      delT.filter(task => task.name === payload.name);
      return {
        ...state,
        tasks: delT
      };
    default:
      return state;
  }
}