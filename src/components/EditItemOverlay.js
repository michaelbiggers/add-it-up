import React from "react"

function EditItemOverlay(props) {
    

    return (
        <div className="itemOverlay">
            <div className="itemOverlay__container">
                <form>

                    {/* <input type="checkbox" className="item__completed" checked={props.completed} onChange={props.onChange} name="completed" /> */}
                    
                    <input 
                        type="text" 
                        className="item__title"  
                        name="itemTitle" 
                        placeholder="E.g., Laundry detergent" 
                        onChange={props.storeText}
                        value={props.storedTitle}
                        autoFocus
                        />
                     <input 
                        type="text"
                        className="item__category"
                        name="category"
                        placeholder="Category (dairy, meat, etc)"
                        onChange={props.storeText}
                        value={props.storedCategory}

                    />
                    <input 
                        type="number" 
                        className="item__quantity" 
                        name="itemQuantity" 
                        min="1" 
                        placeholder="How many do you need?" 
                        onChange={props.storeText}
                        value={props.storedQuantity}
                        />
                   


                    {/* <span className="price-wrapper">$<input type="number" className="item__price" name="itemPrice" onChange={props.onChange} value={props.price} min="0" step="0.01" /> </span> */}
                </form>
                
                {/* <button className="btn btn--update" onClick={props.saveItem}>Save</button> */}
                <button className="btn btn--update">Update</button>
                <button className="btn btn--cancel" onClick={props.closeOverlay}>Cancel</button>
                <button className="btn btn--delete" onClick={props.deleteItem}>Delete</button>
                {/* {props.editMode && <button className="btn btn--delete" onClick={props.deleteItem}>Delete</button>} */}
                
            </div>
        </div>

    )
}

export default EditItemOverlay