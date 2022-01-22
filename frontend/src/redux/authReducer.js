import * as ACTION from "./constant"

const defaultState={
    isLoggedIn:false,
    userEmail:undefined,
    userFirstName:undefined,
    userLastName:undefined,
    userId:undefined,
    userRoleId:undefined,
    userPassword:undefined
}

const authReducer=(state={...defaultState},action)=>{
    if(action.type===ACTION.LOGOUT_SUCCESS){
      return defaultState;
    }else if(action.type===ACTION.LOGIN_SUCCESS){
   
        return{
            ...action.payload,
            isLoggedIn:true
            
        }
    }
   return state;
   }

   export default authReducer;