import React, { useState } from "react"
import { Item } from "../../types/Item"
import styled from "styled-components"
import { Button, Image } from "semantic-ui-react"

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
`


export const ItemListLayout: React.FC<{items: Item[], submitInformation: (e:any) => void}> = ({submitInformation, items}) => {

 
        return (
            <div className="product-list">
            {items.map((item) => {
                
                // const isInCart = cartItems.find(item => item.id == product.id)
                return (
                    <StyledProductListItem className="product-list-item" key={item.itemNumber}>
                        <div className="item-info-box">
                            <div>
                            <h3>{item.itemNumber}</h3>
                            </div>
                        <div className="title-div">
                            <h3>{item.itemName}</h3>
                        </div>
                        <div className="price-div">
                            <b>${item.price.toFixed(2)}</b>
                        </div>
                        </div>
                        <div className="actions-div">
                            <form>
                                <p>Item Number:</p>
                                <input 
                                // ref={newItemNumber}
                                onChange={submitInformation}
                                >
                                </input>
                                <Button>Submit</Button>
                                {/* <p>Item Name:</p>
                                <input 
                                value={newItemName}
                                >
                                </input>
                                <p>Item Price:</p>
                                <input 
                                value={newItemPrice}
                                >
                                </input>
                                <p>Item Quantity:</p>
                                <input 
                                value={newItemQuantity}
                                >
                                </input> */}
                                </form>
                        </div>
                    </StyledProductListItem>
                )
            })}
        </div>
    )
}