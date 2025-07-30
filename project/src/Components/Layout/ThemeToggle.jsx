import { Moon, Sun } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { darkTheme, lightTheme } from '../../Redux/themeSlicer'

function ThemeToggle() {

    const [theme , setTheme] = useState(false)
     const themeInfo = useSelector((state) => state?.theme)
     const dispatch = useDispatch()

  return (
    <>
<div className={`${themeInfo?.primaryTextColor} pl-5`}>
    {theme ? (
        <Sun onClick={() => {
            setTheme(false)
            dispatch(lightTheme())
        }} />
    ) : (
        <Moon onClick={() => {
            setTheme(true)
            dispatch(darkTheme())
        }} />
    )}
</div>


    </>
  )
}

export default ThemeToggle