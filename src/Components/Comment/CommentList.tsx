import React, { useState } from "react";
import { Item } from "../../types/Item";
import { Comment } from "../../types/Comment"
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import "./commentList.css";

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
    addComment: (comment:Comment) => void;
    removeComment: (comment:Comment) => void;
  }> = ({ comments, addComment, removeComment }) => {
    return (
      <div className="form-comment-container">
        <div className="form-div-comments">
          <form className = "form-comments-format" >
          <input
            className = "info-input-comments"
            name="employeeName"
            placeholder="Your Name"
            id="employeeName"
          ></input>
          <br></br>
          <textarea 
            className = "comment-box"
            name="comment" 
            placeholder="Comment Here" 
            id="comment">
          </textarea>
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
                <Button onClick={()=>removeComment(comment)}>COMPLETED</Button>
                </div>
          </div>
          </StyledProductListItem>
          );
        })}
        </div>
    );
  };