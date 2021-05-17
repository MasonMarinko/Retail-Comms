import React, { useState } from "react";
import { Item } from "../../types/Item";
import { Comment } from "../../types/Comment"
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import ItemService from "../../Services/itemService";
import "./commentList.css";
import CommentService from "../../Services/commentService";

const StyledProductListItem = styled.div`
  display: flex;

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

export const CommentListLayout: React.FC<{
    comments:Comment[];
    addComment: (comment:Partial<Comment>) => void;
    removeComment: (comment:Comment) => void;
  }> = ({ comments, addComment, removeComment }) => {
    const [form, setForm]=useState({
      employeeName:"",
      message: ""
    })
    const onFieldChange = (name:keyof typeof form, e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
      const data = {...form}
      data[name] = e.target.value as string
      setForm(data)
    }

    const onRemove = (comment:Comment) => {
      console.log(comment)
      CommentService.delete(comment.id)
      .then((postResponse:any) => {
        removeComment(comment)
      })
      .catch((err:any) => {
        alert("testing")
      });
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const commentData:Partial<Comment> = {
        employeeName: form.employeeName,
        message: form.message
      }

      
      CommentService.create(commentData)
      .then((postResponse:any) => {
        console.log(postResponse.comment);
        addComment(postResponse.comment)
      })
      .catch((err:any) => {
        alert(err)
      });
      // clear form
    }

    return (
      <div className="form-comment-container">
        <div className="form-div-comments">
          <form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>onSubmit(e)} className = "form-comments-format" >
          <input
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onFieldChange("employeeName", e)}
            className = "info-input-comments"
            placeholder="Your Name"
            value={form.employeeName}
          ></input>
          <br></br>
          <textarea 
            onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>onFieldChange("message", e)}
            className = "comment-box"
            placeholder="Comment Here" 
            value={form.message}
            ></textarea>
          <br></br>
          <Button onClick={()=>addComment} className = "comment-submit-button">Submit</Button>
          </form>
        </div>
              {comments.map((comment) => {
          return (
          <StyledProductListItem
            className="product-list-item-comment"
            key={comment.id}
            >
            <div className = "employee-name-info">
            <h2 className = "item-headers-comments">Posted By:</h2>
              <h3
                className = "item-info-comments"
                id = "employeeName">
                {comment.employeeName}
              </h3>
              </div>
          <div className="item-info-box-comments">
              <div className = "message-info">
            <h2 className = "item-headers-comments">Message:</h2>
                <h3
                  className = "item-info-bottom-comments"
                  id = "commentMessage">
                    {comment.message}
                </h3>
                </div>
                <div className = "comment-adjust-buttons">
                {/* <Button>EDIT</Button> */}
                <Button onClick={()=>onRemove(comment)}>COMPLETED</Button>
                </div>
          </div>
          </StyledProductListItem>
          );
        })}
        </div>
    );
  };