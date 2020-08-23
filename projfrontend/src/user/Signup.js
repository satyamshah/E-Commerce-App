import React, {useState} from "react"
import Base from "../core/Base"
import Link from "react-router-dom"

const Signup = () => {

    const [values, setvalues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success: false

    })

const {name,email,password,error,success}=values

const handlechange = name => event =>{
    setvalues
}
    return(
      
    )
}

export default signup