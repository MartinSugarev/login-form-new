
const initialState = {
    login: false
}

const isLoggedIn = (state = initialState, action) => {
    switch(action.type){
        
        case 'logged in':
            return {
                ...initialState,
                login: true
            };

        case 'not logged in':
            return {
                ...initialState,
                login: false
            };
            
        default:
            return state;    
    }
       
}

export default isLoggedIn