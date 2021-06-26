import React, { useState, useEffect } from "react";
import { Item } from "../../types/Item";
import { Comment } from "../../types/Comment";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import "./commentList.css";
import CommentService from "../../Services/commentService";
import useUserStore from "../../Stores/userStore";
import jwt from "jsonwebtoken";

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
  comments: Comment[];
  addComment: (comment: Partial<Comment>) => void;
  removeComment: (comment: Comment) => void;
}> = ({ comments, addComment, removeComment }) => {
  const [form, setForm] = useState({
    type: "task",
    employeeName: "",
    message: ""
  });
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    department: "",
  });

  const [readByNames, setReadByNames] = useState([""]);

  const userStore = useUserStore();

  const loggedInfo = () => {
    const token = localStorage.getItem("token");
    console.log(form);

    if (!token) {
      return;
    }
    {
      const userTokenInfo = jwt.decode(token);
      setUserInfoState(userTokenInfo);
    }
  };

  const setUserInfoState = (userInformation: any) => {
    setUserInfo({
      firstName: userInformation.firstName,
      lastName: userInformation.lastName,
      department: userInformation.department,
    });
  };

  const loggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const clearForm = () => {
    const formReset = {
      type: "task",
      employeeName: "",
      message: "",
      readBy: ""
    };
    setForm(formReset);
  };

  const onFieldChange = (
    name: keyof typeof form,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const data = { ...form };
    data[name] = e.target.value as string;
    setForm(data);
  };

  const onRead = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const fullName = userInfo.firstName + " " +  userInfo.lastName
    const comments = [...readByNames]
    setReadByNames([fullName])
    console.log(comments)
    // setReadByNames([comments])
    // {
    //   const commentData: Partial<Comment> = {
    //     readBy: readByNames
    //   };

    //   CommentService.create(commentData)
    //     .then((postResponse: any) => {
    //       console.log(postResponse.comment);
    //       addComment(postResponse.comment);
    //     })
    //     .catch((err: any) => {
    //       alert(err);
    //     });
    // }
  }

  const onRemove = (comment: Comment) => {
    CommentService.delete(comment.id)
      .then((postResponse: any) => {
        removeComment(comment);
      })
      .catch((err: any) => {
        alert("testing");
      });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const lastName = userInfo.lastName;
    const lastInitial = lastName.charAt(0);
    e.preventDefault();
    if (!loggedIn()) {
      alert("You must be logged in to perform this action!");
      return;
    }
    {
      const commentData: Partial<Comment> = {
        commentType: form.type,
        employeeName: userInfo.firstName + " " + lastInitial,
        message: form.message
      };

      CommentService.create(commentData)
        .then((postResponse: any) => {
          console.log(postResponse.comment);
          addComment(postResponse.comment);
        })
        .catch((err: any) => {
          alert(err);
        });
    }
    clearForm();
  };

  useEffect(() => {
    loggedInfo();
  }, []);

  return (
    <div className="form-comment-container">
      <div className="form-div-comments">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
          className="form-comments-format"
        >
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onFieldChange("type", e)
            }
            name="selectList"
            id="selectList"
          >
              <option value="task">Task</option>
            <option value="memo">Memo</option>
          </select>
          <br></br>
          <br></br>
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onFieldChange("message", e)
            }
            className="comment-box"
            placeholder="Comment Here"
            value={form.message}
          ></textarea>
          <br></br>
          <Button onClick={() => addComment} className="comment-submit-button">
            Submit
          </Button>
        </form>
      </div>
      {comments.map((comment) => {
        const isTask = comment.commentType === "task";
        return (
          <StyledProductListItem
            className="product-list-item-comment"
            key={comment.id}
          >
            <div className="employee-name-info">
              <h2 className="item-headers-comments">Posted By:</h2>
              <h3 className="item-info-comments" id="employeeName">
                {comment.employeeName}
              </h3>
            </div>
            <div className="item-info-box-comments">
              <div className="message-info">
                <h2 className="item-headers-comments">Message:</h2>
                <h3 className="item-info-bottom-comments" id="commentMessage">
                  {comment.message}
                </h3>
              </div>
              <br></br>
                {isTask ? (
                  <>
                  <div className="comment-adjust-buttons">
                  <Button onClick={() => onRemove(comment)}>COMPLETED</Button>
                  </div>
                  </>
                ) : (
                  <>
                  <div className="read-button-flex">
                    <div className="read-by-align">
                      <h1 className="read-by-text">Read By: {readByNames} </h1>
                    </div>
                    <br></br>
                    <div className= "read-button">
                  <div className="comment-adjust-buttons">
                    <Button onClick={(e: any) => onRead(e)}>READ</Button>
                    </div>
                    </div>
                    </div>
                  </>
                )}
              </div>
          </StyledProductListItem>
        );
      })}
    </div>
  );
};
