import React from 'react'
import './App.css';
import { nanoid } from 'nanoid'
import ListItem from './components/ListItem';
import NewItemOverlay from './components/NewItemOverlay'
import Header from './components/Header'
import ActionBar from './components/ActionBar';

function App() {
  const [listData, setListData] = React.useState([
    {
      key: "QHG0_lWJJNSJ_ZGaqM2GH",
      itemTitle: "milk",
      completed: false,
      itemPrice: 2,
      itemQuantity: 1,
      category: "Dairy"
    },
    {
      key: "fYoq6EpxlXyZzh-Uy-Q0X",
      itemTitle: "cheese",
      completed: false,
      itemPrice: 1,
      itemQuantity: 2,
      category: "Dairy"
    },
    {
      key: "edE-pRTkStlE1tYlo-yEQ",
      itemTitle: "yogurt",
      completed: false,
      itemPrice: 1,
      itemQuantity: 1,
      category: "Dairy"
    },
    {
      key: "PauwA2Tny5jVWcYOnGREp",
      itemTitle: "ground beef",
      completed: true,
      itemPrice: 5,
      itemQuantity: 1,
      category: "Meat"
    }
  ]
  )
  const [overlay, setOverlay] = React.useState(false)
  // const [createMode, setCreateMode] = React.useState(false)
  // const [editMode, setEditMode] = React.useState(false)
  const [currentItemId, setCurrentItemId] = React.useState("")

  const initialTempItem = [{
    itemTitle: "",
    itemQuantity: "",
    category: ""
  }]
  const [tempItem, setTempItem] = React.useState(initialTempItem)
  let totalCost = 0

  // updateTotal()

  const allListItems = listData.map(item => {
    return (
      <ListItem
        key={item.key}
        id={item.key}
        title={item.itemTitle}
        completed={item.completed}
        price={item.itemPrice}
        quantity={item.itemQuantity}
        onChange={toggleComplete}
        deleteItem={deleteItem}
        // openEditPane={toggleNewItemOverlay}
        handleEditPane={updateItem}
      />
    )
  })
  function toggleNewItemOverlay(event) {
    // if(event.target.className == "item__title") {
    //   setCurrentItemId(event.target.closest(".list__item").id)
    //   console.log(currentItemId)
    //   const currentItem = listData.filter(item => item.key == currentItemId)
    //   console.log(currentItem)
    //   // setNewItem(currentItem[0])
    // }
    setOverlay(prevState => !prevState)
  }

  function storeTextInput(event) {
    const { name, value } = event.target
    setTempItem(prevState => ({ ...prevState, [name]: value }))
  }
  function getCurrentItemId(event) {
    setCurrentItemId(event.target.closest(".list__item").id)
  }

  function createItem() {
    const newID = nanoid()
    const newDetails = {
      key: newID,
      itemTitle: tempItem.itemTitle,
      itemQuantity: tempItem.itemQuantity,
      completed: false,
      itemPrice: 0,
      category: tempItem.category
    }
    setListData(prevState => [...prevState, newDetails])
    setTempItem(initialTempItem)
    // setCreateMode(false)
  }
  function updateItem(event){
    getCurrentItemId(event)
    console.log(currentItemId)
    setTempItem(listData.filter(item => item.key == currentItemId))
    console.log(tempItem)
    
    toggleNewItemOverlay()
    
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
    const currentId = parentNode.id

    setListData(prevState => prevState.filter(item => item.key != currentId))
  }

  function updateTotal() {
    listData.map(
      item => {
        let price
        let quantity
        if (!item.itemPrice) {
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
      <ActionBar currentTotal={totalCost} handleClick={toggleNewItemOverlay} />

      {overlay &&
        <NewItemOverlay
          closeOverlay={toggleNewItemOverlay}
          saveItem={createItem}
          deleteItem={deleteItem}
          storeText={storeTextInput}
          storedTitle={tempItem.itemTitle}
          storedCategory={tempItem.category}
          storedQuantity={tempItem.itemQuantity}

        // editMode={editMode}
        // createMode={createMode}
        />}

    </div>
  );
}

export default App;
