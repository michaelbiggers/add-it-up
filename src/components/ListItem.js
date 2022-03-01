import React from "react"

function ListItem(props) {
    return (
        <form className={props.completed ? "list__item completed" : "list__item"} id={props.id} >

            <input type="checkbox" className="item__completed" checked={props.completed} onChange={props.onChange} name="completed" />
            <div className="title-cost-container">
                
                <span className="quantity-wrapper">x<input type="number" className="item__quantity" name="itemQuantity" onChange={props.onChange} value={props.quantity} min="1" /></span>
                <input type="text" className="item__title" value={props.title} onChange={props.onChange} name="itemTitle" />
            </div>

            <span className="price-wrapper">$<input type="number" className="item__price" name="itemPrice" onChange={props.onChange} value={props.price} min="0" step="0.01" /> </span>




        </form>
    )
}

export default ListItem