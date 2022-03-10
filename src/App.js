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
      key: 1,
      itemTitle: "milk",
      completed: false,
      itemPrice: 2,
      itemQuantity: 1,
      category: "Dairy"
    },
    {
      key: 2,
      itemTitle: "cheese",
      completed: false,
      itemPrice: 1,
      itemQuantity: 2,
      category: "Dairy"
    },
    {
      key: 3,
      itemTitle: "yogurt",
      completed: false,
      itemPrice: 1,
      itemQuantity: 1,
      category: "Dairy"
    },
    {
      key: 4,
      itemTitle: "ground beef",
      completed: true,
      itemPrice: 5,
      itemQuantity: 1,
      category: "Meat"
    }
  ]
  )
  const [overlay, setOverlay] = React.useState(false)
  const initialNewItem = {
    itemTitle: "",
    itemQuantity: "",
    category:""
  }
  const [newItem, setNewItem] = React.useState(initialNewItem)
  let totalCost = 0

  // updateTotal()

  const allListItems = listData.map(item => {
    return (
      <ListItem
        key={item.key}
        id={item.key}
        title={item.itemTitle}
        completed={item.completed}
        onChange={toggleComplete}
        price={item.itemPrice}
        quantity={item.itemQuantity}
        deleteItem={deleteItem}
      />
    )
  })
  function toggleNewItemOverlay() {
    setOverlay(prevState => !prevState)
  }
  function storeTextInput(event) {
    const { name, value, type, checked } = event.target
    
    setNewItem(prevState => ({...prevState, [name]:value}))
    console.log(newItem)
  }
  function createItem() {

    const newID = nanoid()
    const newDetails = {
      key: newID,
      itemTitle: newItem.itemTitle,
      itemQuantity: newItem.itemQuantity,
      completed: false,
      itemPrice: 0,
      category: newItem.category
    }
    setListData(prevState => [...prevState, newDetails])
    setNewItem(initialNewItem)
    
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
        storeText={storeTextInput}
        storedTitle={newItem.itemTitle}  
        storedQuantity={newItem.itemQuantity}
        />}

    </div>
  );
}

export default App;
