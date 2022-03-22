import React from "react"
import ListItem from "./ListItem"
import _ from 'lodash'

function ListItemContainer(props) {

    // console.log the sortedList to see the performance issue
    let sortedList = _.groupBy(props.listData, "category")
    const sortedElements = Object.keys(sortedList).map(cat => (
        <div className="item-container__section">
            <h3 className="item-container__heading">{cat}</h3>
            {sortedList[cat].map(item => (
                <ListItem 
                    key={item.key}
                id={item.key}
                title={item.itemTitle}
                completed={item.completed}
                price={item.itemPrice}
                quantity={item.itemQuantity}
                category={item.category}
                listData={props.listData}
                toggleComplete={props.toggleComplete}
                setCurrentItemId={props.setCurrentItemId}
                openEditPane={props.openEditPane}
                setTempItem={props.setTempItem}
                togglePriceOverlay={props.togglePriceOverlay}
                openNewItem={props.openNewItem}
                cancelCreationOrEdit={props.cancelCreationOrEdit}
                />
            ))}
        </div>
    ))

    console.log(sortedElements)
    const allListItems = props.listData.map((item) => {
        return (
            <ListItem
                key={item.key}
                id={item.key}
                title={item.itemTitle}
                completed={item.completed}
                price={item.itemPrice}
                quantity={item.itemQuantity}
                category={item.category}
                listData={props.listData}
                toggleComplete={props.toggleComplete}
                setCurrentItemId={props.setCurrentItemId}
                openEditPane={props.openEditPane}
                setTempItem={props.setTempItem}
                togglePriceOverlay={props.togglePriceOverlay}
                openNewItem={props.openNewItem}
                cancelCreationOrEdit={props.cancelCreationOrEdit}
            />
        )
    })

    return (
        <div className="item-container">
             {sortedElements.length > 0 ? sortedElements : <button className="btn btn--empty-list" onClick={props.openEditPane}>
                <em>Let's make that list</em>
            </button>}
            {/* {allListItems.length > 0 ? allListItems : <button className="btn btn--empty-list" onClick={props.openEditPane}>
                <em>Let's make that list</em>
            </button>} */}
        </div>
    )
}

export default ListItemContainer