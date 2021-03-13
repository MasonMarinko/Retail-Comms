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
        align-self: center;
    }

    .actions-div {
        margin-left: auto;
        align-self: center;
    }
`


export const ItemListLayout: React.FC<{items: Item[]}> = ({items}) => {
    
    return (
        <div className="product-list">
            {items.map((item) => {
                
                // const isInCart = cartItems.find(item => item.id == product.id)
                return (
                    <StyledProductListItem className="product-list-item" key={item.itemNumber}>
                        <div className="title-div">
                            <h3>{item.itemName}</h3>
                        </div>
                        <div className="price-div">
                            <b>${item.price.toFixed(2)}</b>
                        </div>
                        <div className="actions-div">
                                <>
                                <Button >Remove From Cart</Button>
                                <Button >Add To Cart</Button>
                                </>
                            )
                        </div>
                    </StyledProductListItem>
                )
            })}
        </div>
    )
}