import isLoggedIn from './isLoggedIn'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    isLoggedIn: isLoggedIn
})

export default allReducers