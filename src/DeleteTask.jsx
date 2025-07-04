import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DeleteConfirmModal({
  showDelete,
  setShowDelete,
  handleDelete,
}) {
  const navigate = useNavigate();
  return (
    <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure ?</Modal.Body>
      <Modal.Footer>
        <Button
          className="bg-success border-0"
          onClick={() => {
            handleDelete();
            setShowDelete(false);
            navigate("/");
          }}
        >
          Yes
        </Button>
        <Button
          className="bg-danger border-0"
          onClick={() => {
            setShowDelete(false);
          }}
        >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
