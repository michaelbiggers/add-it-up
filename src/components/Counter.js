import React from "react"

function Counter(props){
    return (
        <div className="current-cost">
            ${props.currentTotal !== "0.00" ? <>{props.currentTotal}</> : <>___</>}
        </div>
    )
}

export default Counter