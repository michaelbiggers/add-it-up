import React from "react"

function ListItem(props) {
    return (
        <div
            className={props.completed ? "list__item completed" : "list__item"}
            id={props.id}
            onClick={() => {
                props.setCurrentItemId(props.id)
                let currentItem = props.listData.filter(item => item.key == props.id)
                currentItem = currentItem[0]
                props.setTempItem(currentItem)
            }}
        >

            <input
                type="checkbox"
                className="item__completed"
                checked={props.completed}
                onChange={props.toggleComplete}
                name="completed"
            />
            <div
                className="title-cost-container"
                onClick={props.handleEditPane}
            >
                <span
                    className="item__title">{props.title}
                    <span className="item__quantity"> x{props.quantity}</span>
                </span>
            </div>
            <span
                className="item__price"
                onClick={() => {
                            props.setCurrentItemId(props.id)
                            let currentItem = props.listData.filter(item => item.key == props.id)
                            currentItem = currentItem[0]
                            props.togglePriceOverlay()
                            props.setTempItem(currentItem)                            
                        }}
                >
                {props.price===null ? <span className="addPrice">Add price</span> : <>${props.price}</> }
            </span>

        </div>
    )
}

export default ListItem