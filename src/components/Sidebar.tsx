import React from 'react'

const Sidebar = () => {
  return (
    <div className="w-[18%] flex flex-col items-center shadow-2xl text-lg font-bold">
        <a href="/" className="mt-4">Contacts</a>
        <a href="/chartsandmaps" className="mt-5">Charts & Maps</a>
    </div>
  )
}

export default Sidebar