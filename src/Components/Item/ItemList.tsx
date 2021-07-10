import React, { useState, useEffect } from "react";
import { Item } from "../../types/Item";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import ItemService from "../../Services/itemService";
import "./itemList.css";
import jwt from "jsonwebtoken";

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
  addItem: (item: Partial<Item>) => void;
  removeItem: (item: Item) => void;
}> = ({ addItem, removeItem, items }) => {
  const [form, setForm] = useState({
    employeeName: "",
    itemNumber: "",
    itemName: "",
    itemPrice: "",
    itemQuantity: "",
  });

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    department: "",
  });

  const loggedInfo = () => {
    const token = localStorage.getItem("token");
    console.log(form);

    if (!token) {
      return;
    }
    {
      const userTokenInfo = jwt.decode(token);
      setUserInfoState(userTokenInfo);
    }
  };

  const setUserInfoState = (userInformation: any) => {
    setUserInfo({
      firstName: userInformation.firstName,
      lastName: userInformation.lastName,
      department: userInformation.department,
    });
  };

  const clearForm = () => {
    const formReset = {
      employeeName: "",
      itemNumber: "",
      itemName: "",
      itemPrice: "",
      itemQuantity: "",
    };
    setForm(formReset);
  };

  const onFieldChange = (
    name: keyof typeof form,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = { ...form };
    data[name] = e.target.value as string;
    setForm(data);
  };

  const onRemove = (item: Item) => {

    ItemService.delete(item.itemNumber)
      .then((postResponse: any) => {
        removeItem(item);
      })
      .catch((err: any) => {
        alert("testing");
      });
  };

  const loggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const lastName = userInfo.lastName;
    const lastInitial = lastName.charAt(0);
    e.preventDefault();
    if (!loggedIn()) {
      alert("You must be logged in to perform this action!");
      return;
    }
    {
      const itemData: Partial<Item> = {
        employeeName: userInfo.firstName + " " + lastInitial,
        itemNumber: parseInt(form.itemNumber),
        itemName: form.itemName,
        itemPrice: parseFloat(form.itemPrice),
        itemQuantity: parseInt(form.itemQuantity),
      };

      ItemService.create(itemData)
        .then((postResponse: any) => {
          console.log(postResponse.item);
          addItem(postResponse.item);
        })
        .catch((err: any) => {
          alert(err.response.data.message);
        });
    }
    clearForm();
  };

  useEffect(() => {
    loggedInfo();
  }, []);

  return (
    <div className="container">
      <div className="actions-div">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
          className="form-format"
        >
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFieldChange("itemNumber", e)
            }
            className="info-input"
            placeholder="Item Number"
            value={form.itemNumber}
          ></input>
          <br></br>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFieldChange("itemName", e)
            }
            className="info-input"
            placeholder="Item Name"
            value={form.itemName}
          ></input>
          <br></br>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFieldChange("itemPrice", e)
            }
            className="info-input"
            placeholder="Item Price"
            value={form.itemPrice}
          ></input>
          <br></br>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFieldChange("itemQuantity", e)
            }
            className="info-input"
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
                <h2 className="item-headers">Employee Name:</h2>
                <h3 className="item-info" id="employeeName">
                  {item.employeeName}
                </h3>
              </div>
              <div className="itemNumber-div">
                <h2 className="item-headers">Item Number:</h2>
                <h3 className="item-info" id="itemNumber">
                  {item.itemNumber}
                </h3>
              </div>
              <div className="title-div">
                <h2 className="item-headers">Item Name:</h2>
                <h3 className="item-info">{item.itemName}</h3>
              </div>
              <div className="price-div">
                <h2 className="item-headers">Price:</h2>
                <h3 className="item-info">${item.itemPrice}</h3>
              </div>
              <div className="quantity-div">
                <h2 className="item-headers">Quantity:</h2>
                <h3 className="item-info-bottom">{item.itemQuantity}</h3>
              </div>
              {/* <Button>EDIT</Button> */}
              <Button onClick={() => onRemove(item)}>REMOVE</Button>
            </div>
          </StyledProductListItem>
        );
      })}
    </div>
  );
};
