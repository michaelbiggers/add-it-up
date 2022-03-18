import React from "react"
import Counter from "./Counter"
function Header(props) {
    return (
        <header>
            {/* <h1 className="app-name">add it up</h1> */}
            <Counter currentTotal={props.currentTotal} />
            <div className = "label label--total">Current Total</div>
        </header>
    )
}

export default Header