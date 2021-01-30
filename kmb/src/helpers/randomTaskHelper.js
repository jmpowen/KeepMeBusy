const _ = require('lodash');

function randomTask(tasks, duration, timeOfDay) {
  let dTasks = tasks.filter(task => task.minutes > duration);
  let todTasks = dTasks.filter(task => _.intersection(task.timeOfDay, timeOfDay));

  return _.sample(todTasks);
}