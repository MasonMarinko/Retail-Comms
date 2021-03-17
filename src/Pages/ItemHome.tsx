import React, { useState } from "react"
import { Grid, Header } from "semantic-ui-react"
import { FixedMenuLayout } from "../Components/Layout/FixedMenuLayout"
import { ItemListLayout } from "../Components/Item/ItemList"
import { Item } from "../types/Item"


const itemList: Item[] = [
    {
        itemNumber: 9003232
        // itemName: 'Vizio 32"',
        // price: 399.99,
        // quantity: 1
    }
]

export const ItemHome: React.FC = () => {
    const [itemTest, setItemTest] = useState([])
    // const [cartItems, setCartItems]= useState<CartItem[]>([])
    // const [newCartItems, setNewCartItems]= useState<CartItem[]>([])
    
    const submitInformation = (e:any) => {
        e.preventDefault()
        setItemTest(e.target.itemNumber.value)
        console.log(itemTest)
    }



    return <div className="cart-page">
        <FixedMenuLayout>
            <Header size="large" content="Add Items To Cart" />

            <Grid>
                <Grid.Column width="12">
                    <ItemListLayout items={itemList} submitInformation={submitInformation} />
                </Grid.Column>
            </Grid>
        </FixedMenuLayout>
    </div>
}