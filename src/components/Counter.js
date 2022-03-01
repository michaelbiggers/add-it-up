import React from "react"

function Counter(props){
    return (
        <div className="current-cost">${props.currentTotal}</div>
    )
}

export default Counter