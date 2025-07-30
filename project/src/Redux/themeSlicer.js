import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    bgColor : 'bg-white',
    cardColor : 'bg-gray-100',
    primaryTextColor : 'text-gray-900',
    secondaryTextColor : 'text-gray-600',
    borderColor : 'border-gray-300',
    hoverColor : 'hover:bg-gray-200',

}

const themeSlicer = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        lightTheme: (state) => {
            state.bgColor = 'bg-white';
            state.cardColor = 'bg-gray-100';
            state.primaryTextColor = 'text-gray-900';
            state.secondaryTextColor = 'text-gray-600';
            state.borderColor = 'border-gray-300';
            state.hoverColor = 'hover:bg-gray-200';
        },
        darkTheme: (state) => {
            state.bgColor = 'bg-gray-950';
            state.cardColor = 'bg-gray-900';
            state.primaryTextColor = 'text-white';
            state.secondaryTextColor = 'text-gray-300';
            state.borderColor = 'border-gray-800';
            state.hoverColor = 'hover:bg-gray-800';
        }
    }
})

export const { lightTheme, darkTheme } = themeSlicer.actions

export default themeSlicer.reducer