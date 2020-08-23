import {API} from "../../backend"

//here ,user is coming from frontend in json format
export const signup = user => {

    return fetch('${API}/signup',{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        {
        body: JSON.stringify
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}


export const signin = user => {

    return fetch('${API}/signin',{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        {
        body: JSON.stringify
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

export const authenticate = (data,next) => {
    if (typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next();
    }  
}


export const signout = next => {

    if (typeof window !== "undefined"){
       localStorage.removeItem("jwt")
        next();
        return fetch({API})
    }  
}
