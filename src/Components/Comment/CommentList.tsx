import React, { useState } from "react";
import { Item } from "../../types/Item";
import { Comment } from "../../types/Comment"
import styled from "styled-components";
import { Button, Image } from "semantic-ui-react";

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
`;

export const CommentListLayout: React.FC<{
    comments:Comment[];
    submitComment: (e: any) => void;
  }> = ({ comments, submitComment }) => {
    return (
      <div className="product-list">
        <div className="actions-div">
          <form onSubmit={submitComment}>
            <textarea name="comment" placeholder="Comment Here" id="comment"></textarea>
            <br></br>
            <Button>Submit</Button>
          </form>
        </div>
              {comments.map((comment) => {
          return (
            <StyledProductListItem
              className="product-list-item"
              key={comment.id}
            >
              <div className="item-info-box">
                <div>
                  <h3>{comment.message}</h3>
                </div>
              </div>
            </StyledProductListItem>
          );
        })}
      </div>
    );
  };