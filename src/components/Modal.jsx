import React from "react";

export default function Modal({ showModal, setShowModal, elements, myRef }) {

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div
              ref={myRef}
              style={{ maxWidth: '960px' }} className="relative w-full my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="pt-3 pb-6 border-b border-solid border-slate-200 rounded-t relative">
                  <h3 style={{ fontSize: '20px', letterSpacing: '13px' }} className="text-3xl text-center">
                    {elements.title}
                  </h3>
                  <button
                    className="p-1 border-0 text-black text-3xl leading-none font-semibold outline-none opacity-60 focus:outline-none absolute right-3 top-3"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl outline-none focus:outline-none block">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative px-12 py-10 flex items-start justify-center">
                  <div className="w-1/2 mr-1 pr-5">
                    <h4 style={{ fontSize: '12px', letterSpacing: '13px' }} className="text-3xl text-center">
                      {elements.content.right.title}
                    </h4>
                    <h5 style={{ fontSize: '12px', fontWeight: 'bold' }} className="mt-4">
                      {
                        elements.content.left.subTitle
                      }
                    </h5>
                    <ul style={{ fontSize: '15px', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                      {
                        elements.content.left.p.map((el, i) => (
                          <li key={i} className="before:content-[''] before:mr-2 before:block before:w-3 before:h-3 before:bg-cyan-500 before:rounded-full flex items-center" >{el}</li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="w-1/2 ml-1 pl-5">
                    <h4 style={{ fontSize: '12px', letterSpacing: '13px' }} className="text-3xl text-center">
                      {elements.content.left.title}
                    </h4>
                    <h5 style={{ fontSize: '12px', fontWeight: 'bold' }} className="mt-4">
                      {
                        elements.content.right.subTitle
                      }
                    </h5>
                    <ul style={{ fontSize: '15px', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                      {
                        elements.content.right.p.map((el, i) => (
                          <li key={i} className="before:content-[''] before:mr-2 before:block before:w-3 before:h-3 before:bg-cyan-500 before:rounded-full flex items-center" >{el}</li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <div className="flex py-8 items-center justify-center border-t border-solid border-slate-200">
                  <div className="w-1/2">
                    <div className="flex items-center justify-center">
                      {
                        elements.content.left.button
                      }
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex items-center justify-center">
                      {
                        elements.content.right.button
                      }
                    </div>
                  </div>
                </div>
                {
                  elements.content.text
                    ? <div className="w-full flex items-center justify-center pt-4 pb-10">
                      <h5 style={{ fontSize: '12px' }} className="text-red-600 text-center">
                        {elements.content.text}
                      </h5>
                    </div>
                    : null
                }
              </div>
            </div>
          </div>
          <div
            className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}