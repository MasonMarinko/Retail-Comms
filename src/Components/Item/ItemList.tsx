import React, { useState } from "react";
import { Item } from "../../types/Item";
import styled from "styled-components";
import { Button, Image } from "semantic-ui-react";

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
}> = ({ submitInformation, items }) => {
  return (
    <div className="product-list">
      <div className="actions-div">
        <form onSubmit={submitInformation}>
          <input
            name="itemNumber"
            placeholder="Item Number"
            id="itemNumber"
          ></input>
          <br></br>
          <input name="itemName" placeholder="Item Name" id="itemName"></input>
          <br></br>
          <input
            name="itemPrice"
            placeholder="Item Price"
            id="itemPrice"
          ></input>
          <br></br>
          <input
            name="itemQuantity"
            placeholder="Item Quantity"
            id="itemQuantity"
          ></input>
          <br></br>
          <Button>Submit</Button>
        </form>
      </div>
      {items.map((item) => {
        const isOnList = items.find(
          (item) => item.itemNumber == item.itemNumber
        );
        return (
          <StyledProductListItem
            className="product-list-item"
            key={item.itemNumber}
          >
            <div className="item-info-box">
              <div>
                <h3>{item.itemNumber}</h3>
              </div>
              <div className="title-div">
                <h3>{item.itemName}</h3>
              </div>
              <div className="price-div">
                <b>${item.price}</b>
              </div>
            </div>
          </StyledProductListItem>
        );
      })}
    </div>
  );
};
