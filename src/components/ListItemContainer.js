import React from "react"
import ListItem from "./ListItem"


function ListItemContainer(props) {
    // Performance issues:
    // this is sorting every time text is entered into NewItemOverlay, when editing or creating new list item
    const sortedList = props.listData.sort(function(a, b) {
        const comparisonA=a.category.toUpperCase()
        const comparisonB=b.category.toUpperCase()
        
        if(comparisonA<comparisonB) {
            return -1
        }
        if(comparisonA>comparisonB) {
            return 1
        }
        return 0
    })
    console.log(sortedList)
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
            {allListItems.length > 0 ? allListItems : <button className="btn btn--empty-list" onClick={props.openEditPane}>
                <em>Let's make that list</em>
            </button>}
        </div>
    )
}

export default ListItemContainer