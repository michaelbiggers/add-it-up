import React from 'react'

function PriceUpdater(props){
    return(
        <div className = "overlay overlay--price">
            <div className = "overlay__container">
                <form>
                    <input
                         type="number" 
                        className="item__price"  
                        name="itemPrice" 
                        placeholder="Add price" 
                        onChange={props.storeText}
                        value={props.storedPrice}/>
                </form> 
                <div className="btnContainer">
                <button className="btn btn--update" onClick={props.saveItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#006600">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </button>
                <button className="btn btn--cancel" onClick={props.togglePriceOverlay}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#660000">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </button>
                </div>
                
            </div>
        </div>
    )
}
export default PriceUpdater