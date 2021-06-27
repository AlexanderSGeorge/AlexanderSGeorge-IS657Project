const intialState = {
    currentUser: null
}

export const user = (state = intialState, action) => {
    return{
        ...state,
        currentUser: action.currentUser
    }
}