import React, { useState } from "react"
import { Grid, Header } from "semantic-ui-react"
import { FixedMenuLayout } from "../Components/Layout/FixedMenuLayout"
import { ItemListLayout } from "../Components/Item/ItemList"
import { CommentListLayout } from "../Components/Comment/CommentList"
import { Item } from "../types/Item"
import { Comment } from "../types/Comment"


const itemList: Item[] = [
]

const commentList: Comment[] = [
    {
        id: 1,
        message: "testing this thing for use"
    }
]

export const ItemHome: React.FC = () => {
    const [itemLists, setItemLists] = useState<Item[]>([])
    const [commentLists, setCommentLists]= useState<Comment[]>([])
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
    
    const submitComment = (e:any) => {
        e.preventDefault()
        const addedCommentID = commentList.length + 1
        const addedComment = e.target.comment.value
        const items = [...commentList]
        commentList.push({id: addedCommentID, message: addedComment })
        setCommentLists(items)
    }
    
    const removeItem = (item:Item) => {
        const itemIndex = itemLists.findIndex(product => product.itemNumber == item.itemNumber)
        console.log(itemIndex)
        console.log(itemLists)
        const items = [...itemLists]
        // // items.splice(itemIndex, 1)
        // setItemLists(items)
    }


    return <div className="cart-page">
        <FixedMenuLayout>
            <Header size="large" content="Add Items To List" />
            <Grid>
                <Grid.Column width="12">
                    <ItemListLayout items={itemList} removeItem={removeItem}  submitInformation={submitInformation} />
                </Grid.Column>
            </Grid>
                <Header size="large" content="Add Comments" />
            <Grid>
                <Grid.Column width="12">
                    <CommentListLayout comments={commentList} submitComment={submitComment} />
                    </Grid.Column>
            </Grid>
        </FixedMenuLayout>
    </div>
}