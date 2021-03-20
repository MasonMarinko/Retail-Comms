import React, { useState } from "react";
import { Item } from "../../types/Item";
import { Comment } from "../../types/Comment"
import styled from "styled-components";
import { Button} from "semantic-ui-react";
import "./itemList.css"

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
  submitInformation: (e: any) => void;
  removeItem: (item:Item) => void;
}> = ({ submitInformation, removeItem, items }) => {
  return (
    <div className="container">
      <div className="actions-div">
        <form className = "form-format" onSubmit={submitInformation}>
        <input
            className = "info-input"
            name="employeeName"
            placeholder="Your Name"
            id="employeeName"
          ></input>
          <br></br>
          <input
            className = "info-input"
            name="itemNumber"
            placeholder="Item Number"
            id="itemNumber"
          ></input>
          <br></br>
          <input 
            className = "info-input"
            name="itemName"
            placeholder="Item Name"
            id="itemName"
            ></input>
          <br></br>
          <input
            className = "info-input"
            name="itemPrice"
            placeholder="Item Price"
            id="itemPrice"
          ></input>
          <br></br>
          <input
            className = "info-input"
            name="itemQuantity"
            placeholder="Item Quantity"
            id="itemQuantity"
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
