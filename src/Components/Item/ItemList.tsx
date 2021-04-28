import React, { useState } from "react";
import { Item } from "../../types/Item";
import { Comment } from "../../types/Comment"
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import ItemService from "../../Services/itemService";
import getData from "../../Services/itemService";
import "./itemList.css";
import axios from 'axios';

const StyledProductListItem = styled.div`
  display: flex;
  margin-bottom: 15px;

  & > div {
    padding: 10px;
  }
  .image-div {
    img {
      max-width: 150px;
    }
  }
  .title-div {
    max-width: 300px;
  }
  .price-div {
  }
  .actions-div {
    margin-left: auto;
    align-self: center;
  }
`;

export const ItemListLayout: React.FC<{
  items: Item[];
  addItem: (item:Partial<Item>) => void;
  removeItem: (item:Item) => void;
}> = ({ addItem, removeItem, items }) => {
  
  const [form, setForm]=useState({
    employeeName:"",
    itemNumber:"",
    itemName:"",
    itemPrice:"",
    itemQuantity:"" 
  })


  const getData = async () => {
    try {
      return await axios.get('http://localhost:4500/api/item')
    } catch (error) {
      console.error(error)
    }
  }

  const getItemData = async () => {
    const itemData = await getData()
    console.log(itemData?.data.items)
  }

  getItemData()


  const onFieldChange = (name:keyof typeof form, e:React.ChangeEvent<HTMLInputElement>) => {
    const data = {...form}
    data[name] = e.target.value as string
    setForm(data)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const item:Partial<Item> = {
      employeeName: form.employeeName,
      itemNumber: parseInt(form.itemNumber),
      itemName: form.itemName,
      price: parseFloat(form.itemPrice),
      quantity: parseInt(form.itemQuantity)
    }

    
    ItemService.create(item)
    .then((postResponse:any) => {
      alert('Item created successfully!');
      console.log(postResponse);
    })
    .catch((err:any) => {
      console.log(err);
    });

    addItem(item)
    // clear form
  }

  return (
    <div className="container">
      <div className="actions-div">
        <form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>onSubmit(e)} className="form-format">
        <input
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onFieldChange("employeeName", e)}
            className = "info-input"
            placeholder="Your Name"
            value={form.employeeName}
          ></input>
          <br></br>
          <input
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onFieldChange("itemNumber", e)}
            className = "info-input"
            placeholder="Item Number"
            value={form.itemNumber}
          ></input>
          <br></br>
          <input 
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onFieldChange("itemName", e)}
            className = "info-input"
            placeholder="Item Name"
            value={form.itemName}
            ></input>
          <br></br>
          <input
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onFieldChange("itemPrice", e)}
            className = "info-input"
            placeholder="Item Price"
            value={form.itemPrice}
          ></input>
          <br></br>
          <input
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onFieldChange("itemQuantity", e)}
            className = "info-input"
            placeholder="Item Quantity"
            value={form.itemQuantity}
          ></input>
          <br></br>
          <Button>Submit</Button>
        </form>
      </div>
      {items.map((item) => {
        return (
          <StyledProductListItem
          className="product-list-item"
          key={item.itemNumber}
          >
            <div className="item-info-box">
            <div className="employeeName-div">
            <h2 className = "item-headers">Employee Name:</h2>
                  <h3
                  className = "item-info"
                  id = "employeeName">
                  {item.employeeName}
                  </h3>
              </div>
              <div className="itemNumber-div">
                <h2 className = "item-headers">Item Number:</h2>
                  <h3
                  className = "item-info"
                  id = "itemNumber">
                  {item.itemNumber}
                  </h3>
              </div>
              <div className="title-div">
              <h2 className = "item-headers">Item Name:</h2>
                  <h3
                  className = "item-info"
                  >
                  {item.itemName}
                  </h3>
              </div>
              <div className="price-div">
              <h2 className = "item-headers">Price:</h2>
                <h3
                className = "item-info"
                >
                  ${item.price}
                </h3>
              </div>
              <div className="quantity-div">
              <h2 className = "item-headers">Quantity:</h2>
                <h3
                className = "item-info-bottom"
                >
                {item.quantity}
                </h3>
              </div>
                {/* <Button>EDIT</Button> */}
                <Button onClick={()=>removeItem(item)}>REMOVE</Button>
            </div>
          </StyledProductListItem>
        );
      })}
    </div>
  );
};
