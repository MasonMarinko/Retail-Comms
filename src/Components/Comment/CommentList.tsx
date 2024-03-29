import React, { useState, useEffect } from "react";
import { Item } from "../../types/Item";
import { Comment } from "../../types/Comment";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import "./commentList.css";
import CommentService from "../../Services/commentService";
import useUserStore from "../../Stores/userStore";
import jwt from "jsonwebtoken";
import { User } from "../../types/User";
import { userInfo } from "node:os";

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
  addUserToComment: (commentID: string, userData: Partial<User>) => void;
}> = ({ comments, addComment, removeComment, addUserToComment }) => {
  const [form, setForm] = useState({
    type: "task",
    employeeName: "",
    createdBy: "",
    message: "",
  });

  const userStore = useUserStore();

  const clearForm = (commentType: any) => {
    const formReset = {
      type: commentType,
      employeeName: "",
      createdBy: "",
      message: "",
      readBy: "",
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

  const onTaskComplete = (
    e: React.ChangeEvent<HTMLButtonElement>,
    comment: any
  ) => {
    e.preventDefault();
    if (!userStore.payload) {
      alert("You must be logged in to perform this action!");
      return;
    }
    const taskCompleteArray = comment.readBy;

    if (taskCompleteArray.length > 0) {
      alert("This task has already been marked as complete");
      return;
    }
    {
      CommentService.markCommentRead(comment.id, userStore.token)
        .then((postResponse: any) => {
          addUserToComment(comment.id, {
            id: userStore.payload?.id,
            firstName: userStore.payload?.firstName,
            lastName: userStore.payload?.lastName,
          });
        })
        // .catch((err: any) => {
        //   alert(err);
        // });
    }
  };

  const onRead = (e: React.ChangeEvent<HTMLButtonElement>, comment: any) => {
    e.preventDefault();
    if (!userStore.payload) {
      alert("You must be logged in to perform this action!");
      return;
    }
    const userReadArray = comment.readBy;
    if (userReadArray.includes(userStore.payload?.id)) {
      alert("You have already indicated you read this memo!");
      return;
    }
    {
      CommentService.markCommentRead(comment.id, userStore.token)
        .then((postResponse: any) => {
          addUserToComment(comment.id, {
            id: userStore.payload?.id,
            firstName: userStore.payload?.firstName,
            lastName: userStore.payload?.lastName,
          });
        })
        // .catch((err: any) => {
        //   alert(err);
        // });
    }
  };

  const onRemove = (comment: Comment) => {
    if (!userStore.payload) {
      alert("You must be logged in to perform this action!");
      return;
    }


    if (comment.commentType == "memo") ifMemo()
    else if (comment.commentType == "task") {
      const userTaskArray = comment.users;
      if (userTaskArray.length == 0) {
        const removeTaskConfirm = window.confirm(
          "Are you sure you want to remove this task before it's completed?"
        );
        if (!removeTaskConfirm) {
          return;
        }
        {
          CommentService.delete(comment.id)
            .then((postResponse: any) => {
              removeComment(comment);
            })
            .catch((err: any) => {
              alert("testing");
            });
          return;
        }
      }
      {
        const userFirstName = comment.users[0].firstName;
        const userLastName = comment.users[0].lastName;
        const userFullName = " " + userFirstName + " " + userLastName + " ";
        const employeeCompleteVerify = window.confirm(
          "Have you verified that" + userFullName + "has completed the task?"
        );
        if (!employeeCompleteVerify) {
          return;
        }
        {
          CommentService.delete(comment.id)
            .then((postResponse: any) => {
              removeComment(comment);
            })
            .catch((err: any) => {
              alert("testing");
            });
        }
      }
    }
    
    function ifMemo() {
      const removeMemoConfirm = window.confirm(
        "Before removing have you verified all employees have read this memo?"
      );
      if (!removeMemoConfirm) {
        return;
      }
      {
        CommentService.delete(comment.id)
          .then((postResponse: any) => {
            removeComment(comment);
          })
          .catch((err: any) => {
            alert("testing");
          });
      }
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userStore.payload) {
      alert("You must be logged in to perform this action!");
      return;
    }
    const taskType = form.type;
    const lastName = userStore.payload.lastName;
    const lastInitial = lastName.charAt(0);
    const createdInfo = userStore.payload.id;
    {
      const commentData: Partial<Comment> = {
        commentType: form.type,
        employeeName: userStore.payload.firstName + " " + lastInitial,
        createdBy: createdInfo,
        message: form.message,
      };

      CommentService.create(commentData)
        .then((postResponse: any) => {
          debugger
          addComment(postResponse.comment);
        })
        .catch((err: any) => {
          alert(err);
        });
    }
    clearForm(taskType);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      userStore.setToken(token);
    }
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
        const isTask = comment.commentType == "task";
        const isCommentArray = comment.users == undefined;
        const ownPost = userStore.payload?.id == comment.createdBy;
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
                  <div className="read-button-flex">
                    <div className="read-by-align">
                      <h1 className="read-by-text">
                        Completed By:{" "}
                        {isCommentArray ? (
                          <></>
                        ) : (
                          <>
                            {comment.users
                              .map((user) => {
                                return user.firstName + " " + user.lastName;
                              })
                              .join(", ")}
                          </>
                        )}
                      </h1>
                    </div>
                    <br></br>
                    <div className="read-button">
                      <div className="comment-adjust-buttons">
                        {ownPost ? (
                          <Button onClick={() => onRemove(comment)}>
                            REMOVE
                          </Button>
                        ) : (
                          <Button onClick={(e: any) => onTaskComplete(e, comment)}>
                            COMPLETED
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="read-button-flex">
                    <div className="read-by-align">
                      <h1 className="read-by-text">
                        Read By:{" "}
                        {isCommentArray ? (
                          <></>
                        ) : (
                          <>
                            {comment.users
                              .map((user) => {
                                return user.firstName + " " + user.lastName;
                              })
                              .join(", ")}
                          </>
                        )}
                      </h1>
                    </div>
                    <br></br>
                    <div className="read-button">
                      <div className="comment-adjust-buttons">
                      {ownPost ? (
                          <Button onClick={() => onRemove(comment)}>
                            REMOVE
                          </Button>
                        ) : (
                          <Button onClick={(e: any) => onRead(e, comment)}>
                            READ
                          </Button>
                        )}
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
