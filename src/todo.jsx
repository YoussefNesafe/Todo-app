import React, { useEffect, useState } from 'react'
import {GrAddCircle} from 'react-icons/gr'
import {FiEdit} from 'react-icons/fi'
import { Itemlist } from './components/ItemList';

// Get the data from localStorage
const getLocalItems = () => {
  let data = localStorage.getItem('items');
    if (data) {
      return JSON.parse(data)
    } else {
      return []
    }
}

export const Todo = () => {
  // Initialize the state
  const [inputData , setInputData] = useState('');
  const [selectedItem , setSelectedItem] = useState({});
  const [items, setItems] = useState(getLocalItems());
  const [isEdit, setIsEdit] = useState(false);

  // UseEffect to save the data to localStorage
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items])

  // Change the state of the inputData
  const changeHandler = (e) =>{
    setInputData(e.target.value)
  }

  // Add and Update new or exists item to the list and clear the input 
  const addItem = () =>{
    if(inputData === ''){
      alert('Please enter a value')
    } else if (isEdit) {
      // Update the item
      const newItems = items.map(item => {
        if(item.id === selectedItem.id){
          item.name = inputData
        }
        return item
      })
      // Update the state
      setItems(newItems)
      setInputData('')
      setIsEdit(false)
    }
    else {
      // Add a new item
      let newItem = {id: new Date().getTime().toString(), name: inputData}
      setItems([ newItem,...items])
      setInputData('')
    }
  }

  // Delete an item from the list
  const deleteItem = (id) =>{
    setItems(items.filter(item => item.id !== id))
  }

  // Select an item to edit
  const editItem = (id) =>{
    const item = items.find(item => item.id === id)
    setSelectedItem(item)
    setInputData(item.name)
    setIsEdit(true)
  }

  return (
    <div className='container'>
<div className='todo'>
<h1> &lt; Todo App /&gt;</h1>
      <div className='inputDiv' >
      <input type='text' value={inputData} onChange={changeHandler} placeholder='Add a todo'  />
      {
        isEdit ?  <FiEdit size={'30px'} color={'green'}   cursor={'pointer'}  onClick={addItem}  /> :<GrAddCircle size={'30px'} lightingColor="red" cursor={'pointer'}    onClick={addItem} />
      }
      </div>
      <div className='itemsContainer' >
        {
          items.length > 0 ? <h4 className='success'>Tasks To Do</h4> :<h4 className='error'>No Tasks todo</h4>
        }
        {
          items.map(item => {
            return <Itemlist key={item.id} item={item} editItem={editItem} deleteItem={deleteItem} />
          }
          )
        }
        
        {
          items.length > 0 ? <button onClick={() => setItems([])}>Clear All</button> : null
        }
      </div>
</div>
    </div>
  )
}

