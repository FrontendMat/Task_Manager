import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

export const Modal = (props: ModalProps) => {
  const { children } = props;

  return (
    <div className="fixed p-4 inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-4">
        {children}
      </div>
    </div>
  );
};
