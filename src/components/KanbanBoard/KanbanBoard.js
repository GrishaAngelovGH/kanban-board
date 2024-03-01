import { useState, useEffect, useRef, useCallback } from "react"
import { DndContext } from "@dnd-kit/core"

import EditableText from "components/EditableText"

import ButtonPanel from "./ButtonPanel"
import Column from "./Column"
import EmptyBoard from "./EmptyBoard"
import NavigationButtons from "./NavigationButtons"

import ClearBoardModal from "./modals/ClearBoardModal"
import ColumnModal from "./modals/ColumnModal"

import AssignUserModal from "./modals/AssignUserModal"
import EditTaskModal from "./modals/TaskModals/EditTaskModal"
import NewTaskModal from "./modals/TaskModals/NewTaskModal"
import UploadBoardModal from "./modals/UploadBoardModal"

import boardGenerator from "persistent/persistentKanbanBoardGenerator"
import boardRepository from "persistent/persistentKanbanBoardRepository"
import settingsRepository from "persistent/persistentSettingsRepository"

import useBackgroundImage from "hooks/useBackgroundImage"

import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

import "./KanbanBoard.css"

import configureHotkeys from "./hotkeys"

const KanbanBoard = ({
  showCalendar, showUploadBoardModal, onUpdate, onToggleUploadKanbanBoardModal,
  showToastWithMessage
}) => {
  const [showColumnModal, setShowColumnModal] = useState(false)
  const [showClearBoardModal, setShowClearBoardModal] = useState(false)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showEditTaskModal, setShowEditTaskModal] = useState(false)
  const [showAssignUserModal, setShowAssignUserModal] = useState(false)

  const [columnId, setColumnId] = useState("")
  const [task, setTask] = useState(null)

  const scrollRef = useRef()

  const toggleColumnModal = useCallback(() => {
    setShowColumnModal(!showColumnModal)
  }, [showColumnModal])

  const toggleClearBoardModal = useCallback(() => {
    setShowClearBoardModal(!showClearBoardModal)
  }, [showClearBoardModal])

  const handleGenerateBoardButtonClick = useCallback(() => {
    boardGenerator.generate()
    onUpdate()

    showToastWithMessage("Kanban Board is successfully generated")
  }, [onUpdate, showToastWithMessage])

  const handleUpdateBoardTitle = title => {
    boardRepository.updateBoardTitle(title)
    onUpdate()

    showToastWithMessage("Board title is successfully changed")
  }

  const handleConfirmCreateColumn = (title, description) => {
    boardRepository.createColumn(title, description)
    setShowColumnModal(!showColumnModal)
    onUpdate()

    showToastWithMessage("New column is successfully created")
  }

  const handleConfirmClearBoard = () => {
    boardRepository.clearBoard()
    setShowClearBoardModal(!showClearBoardModal)
    onUpdate()

    showToastWithMessage("Kanban Board is successfully cleared")
  }

  const handleConfirmCreateTask = (title, description, priority, isTemplate) => {
    boardRepository.createTask(columnId, title, description, priority, isTemplate)
    setShowAddTaskModal(!showAddTaskModal)
    onUpdate()

    showToastWithMessage("New task is successfully created")
  }

  const handleConfirmEditTask = task => {
    boardRepository.updateTask(task, columnId)
    setShowEditTaskModal(!showEditTaskModal)
    onUpdate()

    showToastWithMessage("Task is successfully edited")
  }

  const handleConfirmAssignUsers = (taskId, assignedIds) => {
    boardRepository.assignUsersToTask(taskId, columnId, assignedIds)
    setShowAssignUserModal(!showAssignUserModal)
    onUpdate()

    showToastWithMessage("Users are successfully assigned")
  }

  const handleConfirmKanbanBoardImport = ({ title, columns }) => {
    boardRepository.updateBoardTitle(title)
    boardRepository.setColumnsJSON(columns)
    onToggleUploadKanbanBoardModal()
    onUpdate()

    showToastWithMessage("Kanban Board is successfully imported")
  }

  const handleDragEnd = ({ active: { id, data: { current: { columnId } } }, over }) => {
    if (over) {
      const fromColumnId = columnId
      const toColumnId = over.id
      const taskId = id

      boardRepository.moveTask(fromColumnId, toColumnId, taskId)
      onUpdate()

      showToastWithMessage("Task is successfully moved")
    } else {
      showToastWithMessage("The task could not be moved because the column has reached its limit")
    }
  }

  const backgroundImage = useBackgroundImage()

  const isSingleRowView = settingsRepository.isSingleRowView()

  const boardTitle = boardRepository.getBoardTitle()
  const boardTitleClassName = settingsRepository.hasNatureBackground() ? "text-white" : "text-secondary"

  const columnHandlers = {
    onDeleteColumn: columnId => {
      boardRepository.deleteColumn(columnId)
      onUpdate()

      showToastWithMessage("Column is successfully deleted")
    },
    onAddTask: columnId => {
      setColumnId(columnId)
      setShowAddTaskModal(!showAddTaskModal)
    },
    onEditTask: (task, columnId) => {
      setColumnId(columnId)
      setTask(task)
      setShowEditTaskModal(!showEditTaskModal)
    },
    onDeleteTask: (taskId, columnId) => {
      boardRepository.deleteTask(taskId, columnId)
      onUpdate()

      showToastWithMessage("Task is successfully deleted")
    },
    onDeleteAllTasks: columnId => {
      boardRepository.deleteAllTasksForColumn(columnId)
      onUpdate()

      showToastWithMessage("All tasks for the given column are successfully deleted")
    },
    onAssignUser: (task, columnId) => {
      setTask(task)
      setColumnId(columnId)
      setShowAssignUserModal(!showAssignUserModal)
    },
    onToggleTaskLock: (taskId, columnId, isLocked) => {
      boardRepository.updateTaskLockStatus(taskId, columnId, isLocked)
      onUpdate()

      showToastWithMessage("Task's lock status is successfully changed")
    },
    onMarkColumnAsDone: columnId => {
      boardRepository.toggleMarkAsDoneColumn(columnId)
      onUpdate()

      showToastWithMessage("Column status is successfully changed")
    },
    onSetColumnLimit: (columnId, limit) => {
      boardRepository.setColumnLimit(columnId, limit)
      onUpdate()

      showToastWithMessage("Column limit is successfully updated")
    },
    onColumnUpdate: (id, value, isTextArea) => {
      isTextArea ?
        boardRepository.updateColumnDescription(id, value) :
        boardRepository.updateColumnTitle(id, value)

      onUpdate()

      showToastWithMessage("Column is successfully updated")
    }
  }

  useEffect(() => {
    configureHotkeys({
      ctrlPlusG: handleGenerateBoardButtonClick,
      ctrlPlusI: toggleColumnModal,
      ctrlPlusL: toggleClearBoardModal
    })
  }, [handleGenerateBoardButtonClick, toggleColumnModal, toggleClearBoardModal])

  const columns = boardRepository.getColumns()

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="row kanban-board" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none" }}>
        <div className="col-md-12">
          {showCalendar && <Calendar />}

          {
            !columns.length && (<EmptyBoard />)
          }

          {
            columns.length > 0 && (
              <div className="row align-items-center p-1">
                {
                  isSingleRowView && (
                    <div className="col-2">
                      <NavigationButtons ref={scrollRef} />
                    </div>
                  )
                }
                <div className={isSingleRowView ? "col-10" : "col-12"}>
                  <EditableText onBlur={handleUpdateBoardTitle}>
                    <h1 className={`m-0 text-center ${boardTitleClassName}`}>{boardTitle}</h1>
                  </EditableText>
                </div>
              </div>
            )
          }

          <div ref={scrollRef} className={`row ${isSingleRowView ? "flex-nowrap overflow-x-hidden pt-3 p-5" : "p-5"}`}>
            {
              columns.map(v => (
                <Column
                  key={v.id}
                  id={v.id}
                  title={v.title}
                  description={v.description}
                  tasks={v.items}
                  limit={v.limit}
                  markedAsDone={v.markedAsDone}
                  showToastWithMessage={showToastWithMessage}
                  columnHandlers={columnHandlers}
                />
              ))
            }
          </div>

          <ColumnModal
            show={showColumnModal}
            onClose={toggleColumnModal}
            onConfirm={handleConfirmCreateColumn}
          />

          <ClearBoardModal
            show={showClearBoardModal}
            onClose={toggleClearBoardModal}
            onConfirm={handleConfirmClearBoard}
          />

          <NewTaskModal
            show={showAddTaskModal}
            onClose={() => { setShowAddTaskModal(!showAddTaskModal) }}
            onConfirm={handleConfirmCreateTask}
          />

          <EditTaskModal
            show={showEditTaskModal}
            task={task}
            onClose={() => { setShowEditTaskModal(!showEditTaskModal) }}
            onConfirm={handleConfirmEditTask}
          />

          <AssignUserModal
            show={showAssignUserModal}
            task={task}
            onClose={() => { setShowAssignUserModal(!showAssignUserModal) }}
            onConfirm={handleConfirmAssignUsers}
          />

          <UploadBoardModal
            show={showUploadBoardModal}
            onClose={onToggleUploadKanbanBoardModal}
            onConfirm={handleConfirmKanbanBoardImport}
          />

          <ButtonPanel
            onColumnButtonClick={toggleColumnModal}
            onClearBoardButtonClick={toggleClearBoardModal}
            onGenerateBoardButtonClick={handleGenerateBoardButtonClick}
          />
        </div>
      </div>
    </DndContext>
  )
}

export default KanbanBoard