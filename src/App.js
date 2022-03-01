import React from 'react'
import './App.css';

import ListItem from './components/ListItem';
import Header from './components/Header'
import ActionBar from './components/ActionBar';

function App() {
  const [listData, setListData] = React.useState({
    listItems: [
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
  }
  )
  let totalCost = 0
  updateTotal()
  const allListItems = listData.listItems.map(item => {
    return (
      <ListItem
        key={item.key}
        id={item.key}
        title={item.itemTitle}
        completed={item.completed}
        onChange={handleChange}
        price={item.itemPrice}
        quantity={item.itemQuantity}
      />
    )
  })


  function handleChange(event) {
    const { name, value, type, checked } = event.target
    console.log(event)
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


  function updateTotal() {
    listData.listItems.map(
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
      // totalCost = totalCost.toFixed(2)
  }

  return (
    <div className="App">
      <Header />

      <h2 className="list-header"></h2>
      <div className="item-container">
        {allListItems.length > 0 ? allListItems : <p className="empty-list">There's nothing here yet</p>}
      </div>
      <ActionBar currentTotal={totalCost} />
    </div>
  );
}

export default App;
