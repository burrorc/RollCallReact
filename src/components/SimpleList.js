import React from "react";
import ItemText from "./ItemText";

function SimpleList(props) {
  return (
    <li>
          
          <ItemText text={props.lastName + ", " + props.firstName} />
        
    </li>
  );
}

export default SimpleList;
