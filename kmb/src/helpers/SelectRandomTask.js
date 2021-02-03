const _ = require('lodash');

/**
 * This needs to return a list of tasks actually, but random order, and still following the selection process of duration/tod and
 * all that. Final item of List would be a 'closer' object to signify no more items are left.
 * 
 * @param {List of tasks} tasks 
 * @param {Time for task} duration 
 * @param {Time of day} timeOfDay 
 */

export function RandomTask(tasks, duration, timeOfDay) {
  let dTasks = tasks.filter(task => task.minutes <= duration);
  let todTasks = dTasks.filter(task => _.intersection(task.timeOfDay, timeOfDay));

  return _.shuffle(todTasks);
}