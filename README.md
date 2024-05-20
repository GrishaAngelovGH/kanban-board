# Kanban Board

Kanban board visually depict work at various stages of a process using cards to represent work items and columns to represent each stage of the process. Cards are moved between the columns to show progress and to help coordinate teams performing the work.

Implemented features: 

* Auto-generate sample board
* Create new column with title and optional description
* Clear board
* Provide board title
* Edit column's title and description based on editable text feature
* Reorder columns
* Create new task for a given column
  - provide title
  - provide rich text description i.e. bold, italic, underlined text, numbered/bullet lists, etc
  - provide priority i.e. low, medium or high
* Filter tasks by priority
* Create predefined templates that could be used as descriptions for given tasks
* Manage dependency tasks
* Activate/deactivate a given task
* Group all templates in a dedicated column
* Visualize number of tasks for a given column
* Visualize progress (active tasks) for a given column
* Mark/unmark column as "done" i.e. all tasks in the column will be visualized as completed
* Delete column
* Delete all tasks for a given column
* Clear all columns without a tasks
* Provide optional limit of tasks for a given column
* Delete task
* Assign users to a given task
* Auto-assign users to a given task
* Remove all assigned users to a given task
* Visualize all assigned tasks to a given user
  - Visualize all collaborators
  - "Unassign Me" feature
  - "Leave Only Me" feature
* Edit task
* Move tasks between columns with drag & drop
* Change the position of a task in a given column
* Toggle fullscreen view
* Visualize calendar
* Export/import board as json
* Manage users
* Visualize history that stores deleted data when performing column/task deletion
  - restore/delete columns and tasks
* Customize settings
  - Choose background - nature, geometric or no background
  - Choose layout - grid view, single column view or single row view
  - Choose column style - solid or blurred
* Keyboard shortcuts
  - Press ```Ctrl```+```G``` to auto-generate board
  - Press ```Ctrl```+```I``` to create new column
  - Press ```Ctrl```+```L``` to clear board


## The front-end project is using the following technologies:

<img src="https://img.shields.io/badge/create--react--app-%23563D7C.svg?style=flat&logo=create-react-app&color=white" height="30"> <img src="https://img.shields.io/badge/React.JS-%23563D7C.svg?style=flat&logo=react&color=white" height="30"> <img src="https://img.shields.io/badge/react--router--dom-%23563D7C.svg?style=flat&logo=react-router&color=white" height="30"> <img src="https://img.shields.io/badge/react--bootstrap-blue.svg?style=flat&logo=react&color=white&logoColor=blue" height="30"> <img src="https://img.shields.io/badge/Bootstrap-%23563D7C.svg?style=flat&logo=bootstrap&color=white&logoColor=purple" height="30"> <img src="https://img.shields.io/badge/bootstrap--icons-%23563D7C.svg?style=flat&logo=bootstrap&color=white&logoColor=purple" height="30"> <img src="https://img.shields.io/badge/dnd--kit/core-%23563D7C.svg?style=flat&color=white" height="30"> <img src="https://img.shields.io/badge/html--react--parser-%23563D7C.svg?style=flat&color=white" height="30"> <img src="https://img.shields.io/badge/react--calendar-%23563D7C.svg?style=flat&color=white" height="30"> <img src="https://img.shields.io/badge/react--simple--wysiwyg-%23563D7C.svg?style=flat&color=white" height="30"> <img src="https://img.shields.io/badge/hotkeys.js-%23563D7C.svg?style=flat&color=white" height="30"> <img src="https://img.shields.io/badge/react--highlight--words-%23563D7C.svg?style=flat&color=white" height="30">