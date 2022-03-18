import React from "react"
import Counter from "./Counter"
import plus from "../assets/plus.png"

function ActionBar(props) {


    return (
        <div className="action-bar">
            {/* <Counter currentTotal={props.currentTotal} /> */}
            <button className="btn btn--new-item" onClick={props.handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#214F4B" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </button>
        </div>
    )
}

export default ActionBar