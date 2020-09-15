import { HANDLE_TODO_TASK } from "../actions/todoAction"



export function reducer(state = {bucket:'', task:'', bucketName:"", bucketList:[],taskList:[],bucketData:{"bucket_name": "","todos": []}} , actions){
    switch(actions.type){
        case HANDLE_TODO_TASK:
            state[actions.key] = actions.value
            return Object.assign({}, state)
        default:
            return state
    }
}