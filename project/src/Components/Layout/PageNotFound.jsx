import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {

    const navigate = useNavigate()

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
    <div class="flex flex-col items-center justify-center text-sm max-md:px-4">
    <h1 class="text-8xl md:text-9xl font-bold text-indigo-500">404</h1>
    <div class="h-1 w-16 rounded bg-indigo-500 my-5 md:my-7"></div>
    <p class="text-2xl md:text-3xl font-bold text-gray-800">Page Not Found</p>
    <p class="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
    <div class="flex items-center gap-4 mt-6">
        <button onClick={() => navigate(-1)} class="bg-gray-800 hover:bg-black px-7 py-2.5 text-white rounded-md active:scale-95 transition-all">
            Return Home
        </button>
        <button onClick={() => navigate('/')} class="border border-gray-300 px-7 py-2.5 text-gray-800 rounded-md active:scale-95 transition-all">
            Contact support
        </button>
    </div>
</div>
</div>
  )
}

export default PageNotFound