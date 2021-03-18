import React, { useState } from "react"
import { Grid, Header } from "semantic-ui-react"
import { FixedMenuLayout } from "../Components/Layout/FixedMenuLayout"
import { ItemListLayout } from "../Components/Item/ItemList"
import { Item } from "../types/Item"


const itemList: Item[] = [
    {
        itemNumber: 9003232,
        itemName: 'Vizio 32"',
        price: 399.99,
        quantity: 1
    }
]
console.log(itemList)

export const ItemHome: React.FC = () => {
    const [itemLists, setItemLists] = useState<Item[]>([])
    // const [cartItems, setCartItems]= useState<CartItem[]>([])
    // const [newCartItems, setNewCartItems]= useState<CartItem[]>([])
    
    const submitInformation = (e:any) => {
        e.preventDefault()
        const addedItemNumber = e.target.itemNumber.value
        const addedItemName = e.target.itemName.value
        const addedItemPrice = e.target.itemPrice.value
        const addedItemQuantity = e.target.itemQuantity.value
        const items = [...itemList]
        itemList.push({itemNumber: addedItemNumber, itemName: addedItemName, price: addedItemPrice, quantity: addedItemQuantity })
        setItemLists(items)
    }



    return <div className="cart-page">
        <FixedMenuLayout>
            <Header size="large" content="Add Items To List" />

            <Grid>
                <Grid.Column width="12">
                    <ItemListLayout items={itemList} submitInformation={submitInformation} />
                </Grid.Column>
            </Grid>
        </FixedMenuLayout>
    </div>
}