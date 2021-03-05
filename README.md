# KeepMeBusy
This is going to be a react web app that simply keeps track of things I'd like to do. When I'm bored I can go on here and click a button and a random item will be chosen.

Features:
- Items will be preset by user, also a general list will be created for users to pick from on initial setup.
- Timer for each item on the list. (e.g. 1 hour of reading, 3 hours <project name here>, ...)
- Notes for each item on the list. This can keep track of progress or revisions for how to do a task.
- Should have some animation of spinning down to a single task.
- Look at Material-ui transitions(specifically zoom) for growing the tasks in the task list in footer.
- Stats kept on each task item for complete, incomplete, number of times done, etc.
- Need to come up with algorithm to not reselect same item or recently done item.
- I want users to be able to select tasks according to the current time (morning/afternooon/night/anytime), as well as choose tasks that are within their current range of free time(like if the user only has 2 hours free they can choose 2 hour tasks to get done or under 2 hour tasks to do)

Far Future Features:
- This should be a react-native application for phones. 

BLOCKED Features:
- See FFF. Reason for being blocked: issue with development environment. Need to do more research on running react-native run-android with an android device plugged in on a Windows PC. For the sake of time, this application will be first developed as a React application.
