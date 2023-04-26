import React, { PropsWithChildren } from "react";

interface IProps {
  showModal: boolean;
  onClickPrimary: () => void;
  onClickCancel: () => void;
  key?: string;
  title: string;
  primaryButtonLabel?: string;
  cancelButtonLabel?: string;
  children: any;
}

const Modal = (props: PropsWithChildren<IProps>) => {
  const {
    showModal,
    key,
    onClickPrimary,
    onClickCancel,
    title,
    primaryButtonLabel,
    cancelButtonLabel,
    children,
  } = props;

  return (
    <>
      {showModal ? (
        <div key={key}>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClickCancel}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  {children}
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClickPrimary}
                  >
                    {primaryButtonLabel? primaryButtonLabel : "Submit"}
                  </button>
                  <button
                    className="bg-gray-500 text-white active:bg-gray-600 text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClickCancel}
                  >
                    {cancelButtonLabel? cancelButtonLabel : "Cancel"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Modal;
