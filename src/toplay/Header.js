import React from 'react'

function Header(props){
  return(
<header>
    <nav>
     {props.displayLinks}
      <button onClick={()=>props.isLoggedIn()}>Login or Logout</button>
    </nav>
  </header>
  );
}

export default Header