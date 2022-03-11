import React from "react"

function ListItem(props) {
    return (
        <div className={props.completed ? "list__item completed" : "list__item"} id={props.id} >

            <input type="checkbox" className="item__completed" checked={props.completed} onChange={props.onChange} name="completed" />
            <div className="title-cost-container" onClick={props.handleEditPane}>
                <span className="item__title">{props.title}<span className="item__quantity"> x{props.quantity}</span></span>
                {/* <span style={{fontSize:10}}>ID: {props.id}</span> */}
            </div>
            <span className="item__price">${props.price}</span>
            
            {/* <button className="item__delete" onClick={props.deleteItem}>Delete item</button> */}

        </div>
    )
}

export default ListItem