import { createPortal } from "react-dom";

const Setting = ({ children }) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">{children}</div>
    </div>,
    document.body
  );
};

export default Setting;