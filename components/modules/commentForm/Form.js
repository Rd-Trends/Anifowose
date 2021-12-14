import React, { useState, useEffect, useRef } from "react";
import { Input, TextArea } from "../../elements/FormElements/index";
import { Button } from "../../elements/Button/index";
import { createComment } from "../../../utils/commentMutation";
import { updateComments } from "../../../utils/commentQuery";
import Style from "../../../styles/CommentForm.module.css";
import buttonStyle from "../../../styles/Button.module.css";

const Form = ({ postId, setComments, type }) => {
  const [authorEmail, setAuthorEmail] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [shouldUpdateComment, setShouldUpdateComment] = useState(false);

  const authorRef = useRef();
  const authorEmailRef = useRef();
  const contentRef = useRef();
  //update comments array after sending a comment
  useEffect(() => {
    const updateComment = async () => {
      const data = await updateComments(`${type}`, postId);
      setComments(data?.comments.nodes);
      setShouldUpdateComment(false);
    };

    updateComment();
  }, [shouldUpdateComment, postId, setComments, type]);

  const clearInput = () => {
    (authorRef.current.value = ""),
      (authorEmailRef.current.value = ""),
      (contentRef.current.value = "");
    setAuthor("");
    setAuthorEmail("");
    setContent("");
  };

  const handleAuthorChange = () => {
    setAuthor(authorRef.current.value);
  };
  const handleAuthorEmailChange = () => {
    setAuthorEmail(authorEmailRef.current.value);
  };
  const handleContentChange = () => {
    setContent(contentRef.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(author, content, authorEmail);

    const data = await createComment({
      author,
      authorEmail,
      content,
      commentOn: postId,
    });

    if (data) {
      setShouldUpdateComment(true);
      clearInput();
    }
  };
  return (
    <form className={Style.Form} onSubmit={handleSubmit}>
      <div className={Style.inputWrapper}>
        <label htmlFor="Username">Username</label>
        <Input
          type="text"
          name="Username"
          placeholder="Your Name"
          isRequired={true}
          value={author}
          handleChange={handleAuthorChange}
          inputRef={authorRef}
        />
      </div>
      <div className={Style.inputWrapper}>
        <label htmlFor="Email">Email</label>
        <Input
          type="email"
          name="Email"
          placeholder="Your Email"
          isRequired={true}
          inputRef={authorEmailRef}
          handleChange={handleAuthorEmailChange}
        />
      </div>

      <div className={Style.inputWrapper}>
        <label htmlFor="Comment">Comment</label>
        <TextArea
          name="Comment"
          placeholder="Make a comment..."
          isRequired={true}
          inputRef={contentRef}
          handleChange={handleContentChange}
        />
      </div>
      <Button
        type="submit"
        className={buttonStyle.btn_primary}
        handleClick={handleSubmit}
      >
        Add Comment
      </Button>
    </form>
  );
};

export default Form;
