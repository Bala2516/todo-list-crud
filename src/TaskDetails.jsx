import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Edit from "./asserts/Edit.png";
import Delete from "./asserts/Delete.png";
import EditTaskModal from "./EditTask";
import DeleteTaskModal from "./DeleteTask";

function TaskDetails({
  inputTask,
  setInputTask,
  show,
  handleClose,
  handleUpdate,
  statusList,
  showDelete,
  setShowDelete,
  handleDelete,
  handleEdit,
  setDeleteId,
  index,
}) {
  const { id } = useParams();
  const [taskDetails, setTaskDetails] = useState([]);

  useEffect(() => {
    const taskData = JSON.parse(localStorage.getItem("TaskName"));
    const selectedTask = taskData.filter((task) => {
      return task.id === Number(id);
    });
    setTaskDetails(selectedTask);
  }, [id]);

  return (
    <>
      <div className="task-description">
        <div className="task-description-in">
          <div
            style={{
              fontWeight: "600",
              fontSize: "30px",
              textAlign: "center",
              backgroundColor: "#00275a",
              padding: "6px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              color: "#5eadce",
            }}
          >
            Task Summary
          </div>
          {taskDetails.map(({ TaskName, Description, Status, Created_at }) => (
            <div className="task-details" key={id}>
              <label className="field">Task Name :</label>
              <div>{TaskName}</div>
              <label className="field">Description :</label>
              <div>{Description}</div>
              <label className="field">Status :</label>
              <div>
                {Status === "Todo" ? (
                  <div style={{ color: "yellow" }}>{Status}</div>
                ) : Status === "In-Progress" ? (
                  <div style={{ color: "blue" }}>{Status}</div>
                ) : (
                  <div style={{ color: "green" }}>{Status}</div>
                )}
              </div>
              <label className="field">Created At :</label>
              <div>{Created_at}</div>
            </div>
          ))}
          <div
            style={{
              display: window.innerWidth <= 700 ? "flex" : "block",
              justifyContent:
                window.innerWidth <= 700 ? "space-between" : "none",
              textAlign: "end",
            }}
          >
            {window.innerWidth <= 700 && (
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(index, id);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "0px 0px 0px 22px",
                  }}
                >
                  <img
                    style={{ width: "28px", height: "28px" }}
                    src={Edit}
                    alt=""
                  ></img>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(id);
                    setShowDelete(true);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "0px 0px 0px 22px",
                  }}
                >
                  <img
                    style={{ width: "28px", height: "28px" }}
                    src={Delete}
                    alt=""
                  ></img>
                </button>
              </div>
            )}
            <button
              style={{
                backgroundColor: "#dc3545",
                margin: "0px 20px 20px 10px",
                border: "none",
                padding: "4px 6px",
                borderRadius: "4px",
              }}
            >
              <Link style={{ textDecoration: "none", color: "black" }} to="/">
                Go Back
              </Link>
            </button>
          </div>
        </div>
      </div>
      <EditTaskModal
        show={show}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        inputTask={inputTask}
        setInputTask={setInputTask}
        statusList={statusList}
      />

      <DeleteTaskModal
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default TaskDetails;
