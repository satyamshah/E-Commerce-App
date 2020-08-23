import React from 'react'
import {Link,withRouter} from 'react-router-dom'

const currentTab = (history,path) =>{
  if(history.location.pathname === path)
  {
    return {color: "#FFFFFF"}
  }
  else
  {
    return {color: "#d1d1d1"}
  }
}

 const Menu = ({history}) => {
    return (
        <div>
       <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" >T-Shirt Store</a>
    </div>
    <ul class="nav navbar-nav">
     
      <li><Link style={currentTab(history,"/")}>Home</li>
      
    </ul>


    <ul class="nav navbar-nav">
  

      <li><a href="#">Cart</a></li>
    </ul>
    
    <ul class="nav navbar-nav">
  

      <li><a href="#">Dashboard</a></li>
    </ul>

    <ul class="nav navbar-nav navbar-right">
      <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
    </ul>
    
    <ul class="nav navbar-nav navbar-right">
      
      <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
      
    <ul class="nav navbar-nav navbar-right">
      <li><a href="#"><span class="glyphicon glyphicon-user"></span> Logout</a></li>
    </ul>

  </div>
</nav>

        </div>
    )
}

export default withRouter(Menu);