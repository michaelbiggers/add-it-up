import React from 'react'
import './App.css';
// import listData from './listData'
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
        itemPrice: 2.5,
        itemQuantity: 1,
        category: "Dairy"
      },
      {
        key: 2,
        itemTitle: "cheese",
        completed: true,
        itemPrice: 1.25,
        itemQuantity: 2,
        category: "Dairy"
      },
      {
        key: 3,
        itemTitle: "yogurt",
        completed: false,
        itemPrice: 1.3,
        itemQuantity: 1,
        category: "Dairy"
      },
      {
        key: 4,
        itemTitle: "ground beef",
        completed: true,
        itemPrice: 5.2,
        itemQuantity: 1,
        category: "Meat"
      }
    ]
  }




  )
  const allListItems = listData.listItems.map(item => {
    return (
      <ListItem
        key={item.key}
        title={item.itemTitle}
        completed={item.completed}
        onChange={handleChange}
      />
    )
  })


  function handleChange(event) {
    const { name, value, type, checked } = event.target
    // loop until the name of the event target matches the itemTitle of the object, then set the key
    let key
    for (let i = 0; i < listData.listItems.length; i++) {
      if (name === listData.listItems[i].itemTitle) {
        key = listData.listItems[i].key;
      }

    }

    if (checked) {
      setListData(prevState => ({
        listItems: prevState.listItems.map(
          item => item.key === key ? { ...item, completed: checked } : item
        )
      }))
    }
    else {
      setListData(prevState => ({
        listItems: prevState.listItems.map(
          item => item.key === key ? { ...item, itemTitle: value } : item
        )
      }))
    }
    // setListData(prevListData => {
    //   return prevListData.map((item => {
    //     return item.name === item.itemTitle ? {
    //       ...prevListData,
    //       [name]: type === "checkbox" ? checked : value
    //     } : item
    //   }))
    // })
  }

  return (
    <div className="App">
      <Header />

      <h2 className="list-header">Grocery list</h2>
      {allListItems.length > 0 ? allListItems : <p className="empty-list">There's nothing here yet</p>}

      <ActionBar />
    </div>
  );
}

export default App;
