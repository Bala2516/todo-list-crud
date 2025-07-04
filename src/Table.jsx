import { useContext } from "react";
import "./App.css";
import Edit from "./asserts/Edit.png";
import Delete from "./asserts/Delete.png";
import { useNavigate } from "react-router-dom";
import { context } from "./App";
import EditTaskModal from "./EditTask";
import DeleteTaskModal from "./DeleteTask";

export function Table({
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
  setIndex,
  setDeleteId,
}) {
  const navigate = useNavigate();
  const { allTaskDetails } = useContext(context);

  return (
    <>
      <div className="table-box">
        <table
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Task Name</th>
              <th>Status</th>
              <th className="edit-column">Edit</th>
              <th className="delete-column">Delete</th>
            </tr>
          </thead>
          {allTaskDetails.map(({ id, TaskName, Status }, index) => (
            <tbody key={id}>
              <tr
                onClick={() => {
                  navigate(`/task/${id}`);
                  setIndex(index);
                }}
              >
                <td>{index + 1}</td>
                <td>
                  <div
                    style={{
                      width: "70px",
                      overflow: "hidden",
                      textAlign: "center",
                      margin: "0 auto",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {TaskName}
                  </div>
                </td>
                <td>
                  {Status === "Todo" ? (
                    <div className="badge bg-warning p-2">{Status}</div>
                  ) : Status === "In-Progress" ? (
                    <div className="badge bg-primary p-2">{Status}</div>
                  ) : (
                    <div className="badge bg-success p-2">{Status}</div>
                  )}
                </td>
                <td className="edit-column">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(index, id);
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: "0px",
                    }}
                  >
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src={Edit}
                      alt=""
                    ></img>
                  </button>
                </td>
                <td className="delete-column">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(id);
                      setShowDelete(true);
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: "0px",
                    }}
                  >
                    <img
                      style={{ width: "26px", height: "26px" }}
                      src={Delete}
                      alt=""
                    ></img>
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
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
          setDeleteId={setDeleteId}
        />
      </div>
    </>
  );
}
