import React, { useState, useEffect } from "react"
import ItemService from "../Services/itemService";
import CommentService from "../Services/commentService";
import { ItemListLayout } from "../Components/Item/ItemList"
import { CommentListLayout } from "../Components/Comment/CommentList"
import { Item } from "../types/Item"
import { Comment } from "../types/Comment"
import { User } from '../types/User'


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

    const addUserToComment = (commentID: string, userData: Partial<User>) => {
        const commentIndex = commentLists.findIndex((comment) => {
            return commentID == comment.id  
        })
        const comments = [...commentLists]
        comments[commentIndex].users.push(userData)
        setCommentLists(comments)
        getCommentData()
    }
    
    useEffect(() => {
        getItemData();
        getCommentData();
    }, []);

    //====== Add Items to itemList Object ======//
    const addItem = (item:Partial<Item>) => {
        const items = [...itemLists]
        items.push(item as Item)
        setItemLists(items)
    }

    
    //====== Add Comment to commentList ===========//
    const addComment = (comment:Partial<Comment>) => {
        const comments = [...commentLists]
        comments.push(comment as Comment)
        setCommentLists(comments)
    }
    
    //====== Remove Items from itemList Object ======//
    const removeItem = (item:Item) => {
        const itemIndex = itemLists.findIndex(product => product.itemNumber == item.itemNumber)
        itemLists.splice(itemIndex, 1)
        const items = [...itemLists]
        setItemLists(items)
    }

    //======= Remove Comment from commentList ======//
    const removeComment = (comment:Comment) => {
        const commentIndex = commentLists.findIndex(product => product.id == comment.id)
        commentLists.splice(commentIndex, 1)
        const comments = [...commentLists]
        setCommentLists(comments)
    }
    


    return <div className="cart-page">
            <h1 className="title-text" >Add Items To List</h1>
            <div>
                    <ItemListLayout items={itemLists} removeItem={removeItem}  addItem={addItem} />
            </div>
                <h1 className="title-text">Add Comments</h1>
            <div>
                    <CommentListLayout comments={commentLists} addUserToComment={addUserToComment} removeComment={removeComment} addComment={addComment} />
            </div>
    </div>
}