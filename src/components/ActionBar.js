import React from "react"
import Counter from "./Counter"

function ActionBar(props) {

    
    return(
        <div className="action-bar">
            <Counter currentTotal={props.currentTotal}/>
            <div className="btn btn--new-item">+</div>
        </div>
    )
}

export default ActionBar