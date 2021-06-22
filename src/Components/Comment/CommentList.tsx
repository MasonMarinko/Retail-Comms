import React, { useState, useEffect } from "react";
import { Item } from "../../types/Item";
import { Comment } from "../../types/Comment"
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import "./commentList.css";
import CommentService from "../../Services/commentService";
import useUserStore from "../../Stores/userStore";
import jwt from "jsonwebtoken"


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
    const [userInfo, setUserInfo] = useState({
      firstName:"",
      department:""
    })

    const [edited, setEdited]=useState({
      id:'',
      editing:false
    })

    const userStore = useUserStore()

    const testing = () => {
      const token = localStorage.getItem("token")

      if (!token) {
        return
      } {
        const userTokenInfo = jwt.decode(token)
        setUserInfoState(userTokenInfo)
      }
    }

    const setUserInfoState = (userInformation:any) => {
      setUserInfo({
        firstName: userInformation.firstName,
        department:userInformation.department
      })
    }

    const onFieldChange = (name:keyof typeof form, e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
      const data = {...form}
      data[name] = e.target.value as string
      setForm(data)
    }

    const onRemove = (comment:Comment) => {
      CommentService.delete(comment.id)
      .then((postResponse:any) => {
        removeComment(comment)
      })
      .catch((err:any) => {
        alert("testing")
      });
    }
    
    const onEdit = (comment:Comment) => {
      console.log(edited)
      const data = {...comment}
      
      setEdited({
        id:comment.id,
        editing:true
      })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const commentData:Partial<Comment> = {
        employeeName: userInfo.firstName,
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

    useEffect(() => {
      testing()
    },[userStore.token])
    
    return (
      <div className="form-comment-container">
        <div className="form-div-comments">
          <form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>onSubmit(e)} className = "form-comments-format" >
          <a>
            {userInfo.firstName}
          </a>
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
          <br></br>
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