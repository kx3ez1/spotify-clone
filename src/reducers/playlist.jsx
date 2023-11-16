import {createSlice} from '@reduxjs/toolkit'

const playListSlice = createSlice({
    name: 'playList',
    initialState: {}, 
    reducers: {},
    extraReducers: {
        'playlist/setPlayList': (state, action) => {
            return action.payload
        }
    }
})

export default playListSlice.reducer