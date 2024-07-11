import React from "react";

function ConfirmationModal({ modalData }) {
  return (
    <div className="pointer-events-auto fixed left-0 top-0 z-50 grid h-screen w-screen place-content-center bg-black bg-opacity-40">
      <div className="rounded-lg bg-richBlack-500 p-10">
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>
        <div className="mt-5 flex justify-between">
          <button
            className="rounded-md bg-richBlack-700 px-6 py-3 text-richBlack-5"
            onClick={modalData?.btn1Handler}
          >
            {modalData?.btn1Text}
          </button>
          <button
            className="rounded-md bg-yellow-100 px-6 py-2 text-richBlack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
