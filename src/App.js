import React from 'react'
import './App.css';
import { nanoid } from 'nanoid'
import ListItem from './components/ListItem';
import NewItemOverlay from './components/NewItemOverlay'
import PriceUpdater from './components/PriceUpdater'
import EditItemOverlay from './components/EditItemOverlay'

import Header from './components/Header'
import ActionBar from './components/ActionBar';

function App() {
  const [listData, setListData] = React.useState([
    {
      key: "QHG0_lWJJNSJ_ZGaqM2GH",
      itemTitle: "milk",
      completed: false,
      itemPrice: null,
      itemQuantity: 1,
      category: "Dairy"
    },
    {
      key: "fYoq6EpxlXyZzh-Uy-Q0X",
      itemTitle: "cheese",
      completed: false,
      itemPrice: 2,
      itemQuantity: 2,
      category: "Dairy"
    },
    {
      key: "edE-pRTkStlE1tYlo-yEQ",
      itemTitle: "yogurt",
      completed: false,
      itemPrice: null,
      itemQuantity: 1,
      category: "Dairy"
    },
    {
      key: "PauwA2Tny5jVWcYOnGREp",
      itemTitle: "ground beef",
      completed: true,
      itemPrice: 3.50,
      itemQuantity: 1,
      category: "Meat"
    }
  ]
  )
  const [overlay, setOverlay] = React.useState(false)
  const [priceOverlay, setPriceOverlay] = React.useState(false)
  const initialTempItem = [{
    itemTitle: "",
    itemQuantity: "",
    itemPrice: null,
    category: ""
  }]
  const [tempItem, setTempItem] = React.useState(initialTempItem)
  let totalCost = 0


  const [currentItemId, setCurrentItemId] = React.useState("")
  // console.log(`Current top ID is ${currentItemId}`)
  updateTotal()

  const allListItems = listData.map(item => {
    return (
      <ListItem
        key={item.key}
        id={item.key}
        title={item.itemTitle}
        completed={item.completed}
        price={item.itemPrice}
        quantity={item.itemQuantity}
        listData={listData}
        toggleComplete={toggleComplete}
        setCurrentItemId={setCurrentItemId}
        handleEditPane={updateItem}
        setTempItem={setTempItem}
        togglePriceOverlay={togglePriceOverlay}
        
      />
    )
  })

  function toggleNewItemOverlay(event) {
    setOverlay(prevState => !prevState)
  }
  function togglePriceOverlay(event){
    setPriceOverlay(!priceOverlay)
  }
  function openNewItem(){
    setTempItem(initialTempItem)
    setOverlay(true)
  }
  function storeTextInput(event) {
    const { name, value } = event.target
    setTempItem(prevState => ({ ...prevState, [name]: value }))
  }

  function createItem() {
    const newID = nanoid()
    const newDetails = {
      key: newID,
      itemTitle: tempItem.itemTitle,
      itemQuantity: tempItem.itemQuantity,
      completed: false,
      itemPrice: null,
      category: tempItem.category
    }
    setListData(prevState => [...prevState, newDetails])
    setTempItem(initialTempItem)
  }

  function updateItem(event) {
    setOverlay(!overlay)
  }

  function toggleComplete(event) {

    const { name, value, type, checked } = event.target
    setListData(prevState => prevState.map(item => item.key == event.target.parentNode.id ? { ...item, [name]: checked } : item))
  }
  function handleChange(event) {
    const { name, value, type, checked } = event.target
    if (type === "checkbox") {
      setListData(prevState => ({
        listItems: prevState.listItems.map(
          item => item.key == event.target.form.id ? { ...item, [name]: checked } : item
        )
      }))
    }
    else {
      setListData(prevState => ({
        listItems: prevState.listItems.map(
          item => item.key == event.target.form.id ? { ...item, [name]: value } : item
        )
      }))
    }
    updateTotal()
  }

  function deleteItem(event) {
    const { name, value, type, checked, parentNode } = event.target
    setListData(prevState => prevState.filter(item => item.key != currentItemId))
    setOverlay(false)
  }

  function updateTotal() {
    listData.map(
      item => {
        let price
        let quantity
        if (item.itemPrice === null) {
          price = 0
        } else {
          price = parseFloat(item.itemPrice).toFixed(2)
        }
        if (!item.itemQuantity) {
          quantity = 1
        } else {
          quantity = parseInt(item.itemQuantity)
        }

        return totalCost += (price * quantity)

      })
  }

  return (
    <div className="App">
      <Header />

      <h2 className="list-header"></h2>
      <div className="item-container">
        {allListItems.length > 0 ? allListItems : <p className="empty-list">Add your first item </p>}
      </div>
      <ActionBar currentTotal={totalCost} handleClick={openNewItem} />

      {overlay &&
        <NewItemOverlay
          closeOverlay={toggleNewItemOverlay}
          saveItem={createItem}
          storeText={storeTextInput}
          storedTitle={tempItem.itemTitle}
          storedCategory={tempItem.category}
          storedQuantity={tempItem.itemQuantity}
          deleteItem={deleteItem}
        />}
      {priceOverlay &&
        <PriceUpdater 
          togglePriceOverlay={togglePriceOverlay}
          storeText={storeTextInput}
          storedPrice={tempItem.itemPrice}
        />
      }

    </div>
  );
}

export default App;
