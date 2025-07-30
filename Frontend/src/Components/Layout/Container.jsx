import React from 'react'
import { useSelector } from 'react-redux'

function Container({children}) {

  const theme = useSelector((state) => state?.theme)

  return (
    <div className={`flex ${theme?.bgColor} flex-col w-full px-10  gap-y-15 overflow-y-auto`}>
        {children}
    </div>
  )
}

export default Container