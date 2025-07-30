import React from 'react'
import { ClockLoader } from 'react-spinners'

function Spinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <ClockLoader color="#3b82f6" size={60} />
      </div>
    </div>
  )
}

export default Spinner