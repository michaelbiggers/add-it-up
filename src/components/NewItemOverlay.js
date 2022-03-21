import React from "react"
import { nanoid } from 'nanoid'

function NewItemOverlay(props) {
    return (
        <div className="overlay overlay--item itemOverlay">
            <div className="overlay__container itemOverlay__container">
                <form>

                    {/* <input type="checkbox" className="item__completed" checked={props.completed} onChange={props.onChange} name="completed" /> */}
                    <label htmlFor="itemTitle">Item Title</label>
                    <input
                        type="text"
                        className="item__title"
                        name="itemTitle"
                        placeholder="E.g., Laundry detergent"
                        onChange={props.storeText}
                        value={props.storedTitle}
                        autoFocus
                    />
                    <label htmlFor="category">Store Section</label>
                    <select name="category" id="category" className="item__category" value={props.storedCategory} onChange={props.storeText}>
                    <option value="">Select (optional)</option>
                        {props.categoryOptions.map(item=><option value={item} key={nanoid()}>{item}</option>)}
                    </select>
                    <label htmlFor="itemQuantity">Quantity</label>
                    <input
                        type="number"
                        className="item__quantity"
                        name="itemQuantity"
                        min="1"
                        placeholder="How many do you need?"
                        onChange={props.storeText}
                        value={props.storedQuantity}
                    />
                </form>
                <div className="btnContainer">
                    {!props.currentItemId &&
                        <button className="btn btn--save" onClick={props.saveItem}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#006600">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </button>
                    }
                    {props.currentItemId &&
                        <button className="btn btn--update" onClick={props.saveItemUpdate}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#006600">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </button>
                    }

                    <button className="btn btn--cancel" onClick={props.closeEditOverlay}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#660000">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {props.currentItemId &&
                        <button className="btn btn--delete" onClick={props.deleteItem}>Delete</button>
                    }

                </div>

                {/* {props.editMode && <button className="btn btn--delete" onClick={props.deleteItem}>Delete</button>} */}

            </div>
        </div>

    )
}

export default NewItemOverlay