import { useConfirmModalStore } from "./useConfirmModal";

type ConfirmDeleteOptions = {
  entityName?: string; // VD: "project", "bài viết"
  itemName?: string; // VD: "Website Admin"
  onConfirm: () => Promise<void> | void;
};

export function confirmDelete({
  entityName = "dữ liệu",
  itemName,
  onConfirm,
}: ConfirmDeleteOptions) {
  const title = `Xóa ${entityName}`;
  const description = itemName
    ? `Bạn có chắc chắn muốn xóa ${entityName} "${itemName}"? \n Hành động này không thể hoàn tác.`
    : `Bạn có chắc chắn muốn xóa ${entityName}? Hành động này không thể hoàn tác.`;

  useConfirmModalStore.getState().openModal({
    title,
    description,
    confirmText: "Xóa",
    cancelText: "Hủy",
    variant: "danger",
    requireTyping: "DELETE",
    onConfirm,
  });
}
