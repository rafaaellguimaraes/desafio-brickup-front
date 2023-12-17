interface IConfirmModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  content: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

const DeleteTaskModal: React.FC<IConfirmModalProps> = ({
  show,
  onHide,
  title,
  content,
  onConfirm,
  confirmLabel,
  cancelLabel,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 ${show ? "block" : "hidden"}`}
    >
      <div className="bg-white rounded-lg shadow-md px-4 py-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700">{content}</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md text-gray-500 hover:bg-gray-100"
            onClick={onHide}
          >
            {cancelLabel || "Cancelar"}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            onClick={onConfirm}
          >
            {confirmLabel || "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;