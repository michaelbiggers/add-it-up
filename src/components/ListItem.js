import React from "react"

function ListItem (props) {
    return (
        <form className = "list__item">
            <input type="checkbox" className="item__completed" checked={props.completed} onChange={props.onChange} name={props.title}/>
            <input type="text" className="item__title" value={props.title} onChange={props.onChange} name={props.title} />
            <span className="item__price">${props.price}</span>
            <span className="item__quantity">x {props.quantity}</span>
        </form>
    )
}

export default ListItem