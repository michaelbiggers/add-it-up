import React from "react"
import Counter from "./Counter"
import plus from "../assets/plus.png"

function ActionBar(props) {

    
    return(
        <div className="action-bar">
            <Counter currentTotal={props.currentTotal}/>
            <img src={plus} className="btn btn--new-item" onClick={props.handleClick} />
        </div>
    )
}

export default ActionBar