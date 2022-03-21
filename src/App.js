import React from 'react'
import './App.css';
import { nanoid } from 'nanoid'
import ListItemContainer from './components/ListItemContainer';
import ListItem from './components/ListItem';
import NewItemOverlay from './components/NewItemOverlay'
import PriceUpdater from './components/PriceUpdater'


import Header from './components/Header'
import ActionBar from './components/ActionBar';

function App() {

  const [listData, setListData] = React.useState(
    () => JSON.parse(localStorage.getItem("list")) || []
  )
  const [categoryOptions, setCategoryOptions] = React.useState([
    "Bakery",
    "Beer/Wine",
    "Dairy",
    "Frozen",
    "General",
    "Health/Beauty",
    "Meats",
    "Produce"
  ])
  const [overlay, setOverlay] = React.useState(false)
  const [priceOverlay, setPriceOverlay] = React.useState(false)

  // const initialTempItem = [{
  //   itemTitle: "",
  //   itemQuantity: "1",
  //   itemPrice: null,
  //   category: "Uncategorized"
  // }]
  const [tempItem, setTempItem] = React.useState({})
  let totalCost = 0

  React.useEffect(() => {
    localStorage.setItem("list", JSON.stringify(listData))
  }, [listData])

  const [currentItemId, setCurrentItemId] = React.useState("")
  updateTotal()

  function toggleNewItemOverlay(event) {
    setOverlay(prevState => !prevState)
  }
  function closeEditOverlay() {
    setOverlay(false)
    setCurrentItemId("")
  }
  function togglePriceOverlay(event) {
    setPriceOverlay(!priceOverlay)
  }
  function openNewItem() {
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
      itemQuantity: tempItem.itemQuantity || "1",
      completed: false,
      itemPrice: null,
      category: tempItem.category || "Uncategorized"
    }
    setListData(prevState => [...prevState, newDetails])
    setTempItem({})
    setOverlay(false)
  }
  function savePrice() {
    setListData(prevState => prevState.map(item => item.key === currentItemId ? { ...item, itemPrice: tempItem.itemPrice } : item))
    setPriceOverlay(false)
  }
  function saveItemUpdate(event) {
    setListData(prevState => prevState.map(item => item.key === currentItemId ? { ...tempItem } : item))
    setOverlay(false)
  }
  function cancelCreationOrEdit() {
    setOverlay(false)
    setPriceOverlay(false)
    setCurrentItemId("")
    setTempItem({})
  }
  function toggleComplete(event) {
    const { name, value, type, checked } = event.target
    setListData(prevState => prevState.map(item => item.key == event.target.parentNode.id ? { ...item, [name]: checked } : item))
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
          price = parseFloat(item.itemPrice)
        }
        if (!item.itemQuantity) {
          quantity = 1
        } else {
          quantity = parseInt(item.itemQuantity)
        }
        return totalCost += (price * quantity)
      })
    totalCost = totalCost.toFixed(2)
  }

  return (
    <div className="App">
      <Header currentTotal={totalCost} />

      <ListItemContainer
        listData={listData}
        toggleComplete={toggleComplete}
        setCurrentItemId={setCurrentItemId}
        openEditPane={toggleNewItemOverlay}
        setTempItem={setTempItem}
        togglePriceOverlay={togglePriceOverlay}
        openNewItem={openNewItem}
        cancelCreationOrEdit={cancelCreationOrEdit}
      />
      <ActionBar handleClick={openNewItem} />

      {overlay &&
        <NewItemOverlay
          closeOverlay={toggleNewItemOverlay}
          closeEditOverlay={closeEditOverlay}
          cancelCreationOrEdit={cancelCreationOrEdit}
          saveItem={createItem}
          storeText={storeTextInput}
          storedTitle={tempItem.itemTitle}
          storedCategory={tempItem.category}
          storedQuantity={tempItem.itemQuantity}
          saveItemUpdate={saveItemUpdate}
          deleteItem={deleteItem}
          currentItemId={currentItemId}
          categoryOptions={categoryOptions}
        />}
      {priceOverlay &&
        <PriceUpdater
          togglePriceOverlay={togglePriceOverlay}
          storedPrice={tempItem.itemPrice}
          storeText={storeTextInput}
          savePrice={savePrice}
          setCurrentItemId={setCurrentItemId}
          cancelCreationOrEdit={cancelCreationOrEdit}
        />
      }

    </div>
  );
}

export default App;
