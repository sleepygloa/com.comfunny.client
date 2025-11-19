import { useContext } from "react";
import { ModalsStateContext } from "../../context/ModalContext";

export default function useModals() {
  const { open, close } = useContext(ModalsStateContext);

  const openModal = (Component, props) => {
    open(Component, props);
  };
  const closeModal = (Component) => {
    close(Component);
  };
  return { openModal, closeModal };
}