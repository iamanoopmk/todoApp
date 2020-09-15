import { HOST } from "./host.js"

export async function apiAction(url, method, data) 
{  
    console.log("JSON.stringify(data)",JSON.stringify(data))
    let options = {
        method : method,
        body : JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    }
    if(method.toLowerCase()==="get"){
        delete options["body"]
    }
    
    let response = await fetch(HOST + url,options)
    console.log("response",response)
    if(response.status === 204){
        return {"success":true}
    }else{
        let apiResponse = await response.json()
        return apiResponse
    }
    
}


