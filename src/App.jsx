import { createContext, useState } from "react";
import "./App.css";
import { Table } from "./Table";
import { Todo } from "./Todo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskDetails from "./TaskDetails";
import backImage from "./asserts/back.jpg";

export const context = createContext();

function App() {
  const [inputTask, setInputTask] = useState({
    id: "",
    TaskName: "",
    Description: "",
    Status: "Todo",
    Created_at: "",
  });
  const [allTaskDetails, setAllTaskDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(null);

  const statusList = ["Todo", "In-Progress", "Completed"];

  const handleClose = () => {
    setShow(false);
    setInputTask({ TaskName: "", Description: "", Status: "Todo" });
  };

  const handleEdit = (index, id) => {
    const selectedDetails = allTaskDetails[index];
    setInputTask({
      TaskName: selectedDetails.TaskName,
      Description: selectedDetails.Description,
      Status: selectedDetails.Status,
    });
    setSelectedId(id);
    setShow(true);
  };

  const handleUpdate = () => {
    if (selectedId !== null) {
      if (
        inputTask.TaskName &&
        inputTask.Description &&
        inputTask.Status !== "Status"
      ) {
        const taskData = JSON.parse(localStorage.getItem("TaskName")) || [];

        const updatedTasks = taskData.map((task) => {
          return task.id === selectedId ? { ...task, ...inputTask } : task;
        });

        localStorage.setItem("TaskName", JSON.stringify(updatedTasks));
        setAllTaskDetails(updatedTasks);
        setInputTask({ TaskName: "", Description: "", Status: "Todo" });
        setSelectedId(null);
      } else {
        alert("Field can't be empty");
        setShow(true);
        setInputTask({
          ...inputTask,
        });
      }
    }
  };

  const handleDelete = () => {
    console.log(deleteId, "Delete ID");
    if (deleteId) {
      const taskData = JSON.parse(localStorage.getItem("TaskName")) || [];

      const updatedTasks = taskData.filter((task) => task.id !== deleteId);

      localStorage.setItem("TaskName", JSON.stringify(updatedTasks));
      setAllTaskDetails(updatedTasks);
      setInputTask({ TaskName: "", Description: "", Status: "Todo" });
    }
  };

  return (
    <>
      <context.Provider value={{ allTaskDetails }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div
                  className="containers"
                  style={{
                    backgroundImage: `url(${backImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="constainers-in">
                    <Todo
                      inputTask={inputTask}
                      setInputTask={setInputTask}
                      allTaskDetails={allTaskDetails}
                      setAllTaskDetails={setAllTaskDetails}
                    />
                    <Table
                      inputTask={inputTask}
                      setInputTask={setInputTask}
                      show={show}
                      handleClose={handleClose}
                      handleUpdate={handleUpdate}
                      statusList={statusList}
                      showDelete={showDelete}
                      setShowDelete={setShowDelete}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      setIndex={setIndex}
                      setDeleteId={setDeleteId}
                      index={index}
                    />
                  </div>
                </div>
              }
            />
            <Route
              path="/task/:id"
              element={
                <TaskDetails
                  inputTask={inputTask}
                  setInputTask={setInputTask}
                  show={show}
                  handleClose={handleClose}
                  handleUpdate={handleUpdate}
                  statusList={statusList}
                  showDelete={showDelete}
                  setShowDelete={setShowDelete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  setDeleteId={setDeleteId}
                  index={index}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </context.Provider>
    </>
  );
}

export default App;
