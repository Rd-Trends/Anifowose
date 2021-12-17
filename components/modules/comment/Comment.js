import React from "react";
import { getDate } from "../../../utils/utils";
import randomColor from "randomcolor";
import Style from "../../../styles/Comment.module.css";

const comment = ({ comments }) => {
  return (
    <>
      {comments.map((item, index) => {
        const content = item?.content;
        const date = item?.commentedOn?.node?.date;
        const authorName = item?.author?.node?.name;
        const fancyDisplayedAuthorId = Array.from(authorName.substr(0, 2)).join(
          " "
        );
        const color = randomColor({ hue: "purple", count: 1 });

        return (
          <section key={index} className={Style.wrapper}>
            <div className={Style.image}>
              <p style={{ backgroundColor: color[0] }}>
                {fancyDisplayedAuthorId}
              </p>
            </div>
            <div className={Style.commentBox}>
              <div className={Style.meta}>
                <h3 className={Style.userName}>{authorName}</h3>
                <p className={Style.date}>{getDate(date)}</p>
              </div>
              <div
                className={Style.commentText}
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </div>
          </section>
        );
      })}
    </>
    //
  );
};

export default comment;
