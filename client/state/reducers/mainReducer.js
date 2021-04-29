// import actions
import * as types from '../actions/actionTypes.js';

const initialState = {
    user: null,
    login_state: null,
    signup_state: null,
    info: null,
    messages: {},
    view: 'userpage',
    user_info: null
}

const mainReducer = (state = initialState, action) => {
    // declare state constants
    let login_state;
    let user;
    let view;
    let messages;
    let user_info;

    switch (action.type) {

        case types.LOGIN_STATE:
            // user is logged in
            user = state.user;
            if (action.payload === null){
                if (user !== null){
                    console.log('before fetch')
                    fetch('/signout',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'Application/JSON',
                        },
                        body: JSON.stringify(user),
                    })
                        .then((resp) => {
                            console.log('reducer.then')
                            resp.json()
                        })
                        .then((data) => {
                            console.log('reducer fetch data:',data)
                        })
                        .catch((err) =>{
                            console.log('reducer fetch failed');
                            console.log(err);
                        })
                }
                user = null;
            } 
            login_state = action.payload;
            return {
                ...state,
                login_state,
                user
            }

        case types.LOGIN:
            // login user
            const { _id, username, language } = action.payload.user;
            const resMessages = action.payload.messages;
            messages = resMessages;
            login_state = 'true';
            user = { _id: _id, username: username, language: language };
            return {
                ...state,
                messages,
                login_state,
                user
            }

        case types.SIGNUP_STATE:
            // user wants to signup
            const signup_state = action.payload;
            // console.log('changing signup state to ', action.payload)
            return {
                ...state,
                signup_state
            }
        
        case types.SIGNUP:
            // sign up user
            login_state = true;
            return {
                ...state,
                login_state
            }
        
        case types.VIEW:
            view = action.payload;
            return {
                ...state,
                view
            }

        case types.USER_INFO:
        user_info = action.payload;
        return {
            ...state,
            user_info
        }

        case types.UPDATE_MESSAGES:
        messages = action.payload;
        return {
            ...state,
            messages
        }

        default:
            return state;
    }
}

export default mainReducer;