import React, { useState } from "react"
import { Grid, Header } from "semantic-ui-react"
import { FixedMenuLayout } from "../Components/Layout/FixedMenuLayout"
import { ItemListLayout } from "../Components/Item/ItemList"
import { CommentListLayout } from "../Components/Comment/CommentList"
import { Item } from "../types/Item"
import { Comment } from "../types/Comment"
import "./itemHome.css"


const itemList: Item[] = []

const commentList: Comment[] = []

export const ItemHome: React.FC = () => {
    const [itemLists, setItemLists] = useState<Item[]>([])
    const [commentLists, setCommentLists]= useState<Comment[]>([])
    

    //====== Add Items to itemList Object ======//
    const submitInformation = (e:any) => {
        e.preventDefault()
        const addedEmployeeName = e.target.employeeName.value
        const addedItemNumber = e.target.itemNumber.value
        const addedItemName = e.target.itemName.value
        const addedItemPrice = e.target.itemPrice.value
        const addedItemQuantity = e.target.itemQuantity.value
        itemList.push({employeeName: addedEmployeeName, itemNumber: addedItemNumber, itemName: addedItemName, price: addedItemPrice, quantity: addedItemQuantity })
        const items = [...itemLists]
        setItemLists(items)
    }
    
    //====== Remove Items from itemList Object ======//
    const removeItem = (item:Item) => {
        const itemIndex = itemList.findIndex(product => product.itemNumber == item.itemNumber)
        itemList.splice(itemIndex, 1)
        const items = [...itemLists]
        setItemLists(items)
    }
    
    //====== Add Comment to commentList ===========//
    const submitComment = (e:any) => {
        e.preventDefault()
        const addedCommentID = commentList.length
        const addedEmployeeName = e.target.employeeName.value
        const addedComment = e.target.comment.value
        const items = [...commentLists]
        commentList.push({id: addedCommentID,employeeName: addedEmployeeName, message: addedComment })
        setCommentLists(items)
    }

    //======= Remove Comment from commentList ======//
    const removeComment = (comment:Comment) => {
        const commentIndex = commentList.findIndex(something => something.id == comment.id)
        commentList.splice(commentIndex, 1)
        const items = [...commentLists]
        setCommentLists(items)
    }
    


    return <div className="cart-page">
        <FixedMenuLayout>
            <h1 className="title-text" >Add Items To List</h1>
            <Grid>
                    <ItemListLayout items={itemList} removeItem={removeItem}  submitInformation={submitInformation} />
            </Grid>
                <h1 className="title-text">Add Comments</h1>
            <Grid>
                    <CommentListLayout comments={commentList} removeComment={removeComment} submitComment={submitComment} />
            </Grid>
        </FixedMenuLayout>
    </div>
}