import React, { useState, useEffect } from "react"
import { Grid, Header } from "semantic-ui-react"
import ItemService from "../Services/itemService";
import CommentService from "../Services/commentService";
import { ItemListLayout } from "../Components/Item/ItemList"
import { CommentListLayout } from "../Components/Comment/CommentList"
import { Item } from "../types/Item"
import { Comment } from "../types/Comment"


export const ItemHome: React.FC = () => {
    const [itemLists, setItemLists] = useState<Item[]>([])
    const [commentLists, setCommentLists]= useState<Comment[]>([])
    
    const getItemData = async () => {
        const grabData = await ItemService.getAllItems()
        const itemData = grabData?.items
        setItemLists(itemData)
    }

    const getCommentData = async () => {
        const grabCommentData = await CommentService.getAllComments()
        const commentData = grabCommentData?.comments
        setCommentLists(commentData)
    }
    
    useEffect(() => {
        getItemData();
        getCommentData();
      }, []);

    //====== Add Items to itemList Object ======//
    const addItem = (item:Partial<Item>) => {
        // remove after database implementation
        const items = [...itemLists]
        // add to database
        // then push response to items
        items.push(item as Item)
        setItemLists(items)
    }


    
    //====== Remove Items from itemList Object ======//
    const removeItem = (item:Item) => {
        const itemIndex = itemLists.findIndex(product => product.itemNumber == item.itemNumber)
        itemLists.splice(itemIndex, 1)
        const items = [...itemLists]
        setItemLists(items)
    }
    
    //====== Add Comment to commentList ===========//
    const addComment = (comment:Partial<Comment>) => {
        // comment.id = "340978"
        const comments = [...commentLists]
        comments.push(comment as Comment)
        setCommentLists(comments)
    }

    //======= Remove Comment from commentList ======//
    const removeComment = (comment:Comment) => {
        const commentIndex = commentLists.findIndex(something => something.id == comment.id)
        commentLists.splice(commentIndex, 1)
        const items = [...commentLists]
        setCommentLists(items)
    }
    


    return <div className="cart-page">
            <h1 className="title-text" >Add Items To List</h1>
            <Grid>
                    <ItemListLayout items={itemLists} removeItem={removeItem}  addItem={addItem} />
            </Grid>
                <h1 className="title-text">Add Comments</h1>
            <Grid>
                    <CommentListLayout comments={commentLists} removeComment={removeComment} addComment={addComment} />
            </Grid>
    </div>
}