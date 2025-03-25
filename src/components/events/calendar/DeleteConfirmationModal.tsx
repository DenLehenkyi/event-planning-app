interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white-900 bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-montserrat font-semibold text-gray-800 mb-4">
          Підтвердження видалення
        </h2>
        <p className="font-montserrat text-sm text-gray-600 mb-4">
          Ви впевнені, що хочете видалити цю подію?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-montserrat text-sm font-medium"
          >
            Видалити
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-montserrat text-sm font-medium"
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
}
