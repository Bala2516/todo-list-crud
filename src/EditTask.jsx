import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function EditTaskModal({
  show,
  handleClose,
  handleUpdate,
  inputTask,
  setInputTask,
  statusList,
}) {
  const navigate = useNavigate();
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="field">Task Name</label>
        <input
          className="input"
          value={inputTask.TaskName}
          onChange={(e) =>
            setInputTask({
              ...inputTask,
              TaskName: e.target.value,
            })
          }
          type="text"
        />

        <label className="field">Description</label>
        <textarea
          className="input"
          value={inputTask.Description}
          onChange={(e) =>
            setInputTask({
              ...inputTask,
              Description: e.target.value,
            })
          }
          style={{ height: "200px" }}
        ></textarea>

        <label className="field">Status</label>
        <select
          className="input"
          value={inputTask.Status}
          onChange={(e) =>
            setInputTask({
              ...inputTask,
              Status: e.target.value,
            })
          }
        >
          <option>Status</option>
          {statusList.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary opacity-75"
          onClick={() => {
            handleClose();
            handleUpdate();
            navigate("/");
          }}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
