import React from 'react'

const BottomNav = () => {
    return (
        <>
            <div className=" bottom-0 flex py-6 px-6 justify-center items-center fixed w-full md:px-10 lg:px-14 xl:px-16 xl:py-10 shadow-top z-50 bg-white gap-7">
                <div className="cursor-pointer p-3 hover:bg-slate-50 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-indigo-600 hover:transition-all">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
                <input
                    type="text"
                    name="text"
                    id="text"
                    className="block w-3/4 xl:w-2/4 rounded-md border-0 py-3 pl-5 xl:pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                    placeholder="Type here..."
                />
                <div className="cursor-pointer p-3 hover:bg-slate-50 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h- hover:text-indigo-600 hover:transition-all">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </div>
            </div>
        </>
    )
}

export default BottomNav