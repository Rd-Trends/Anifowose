import React from "react";
import { BsPerson } from "react-icons/bs";
import { AiOutlineTag } from "react-icons/ai";
import { BiCalendar, BiCategory, BiTime } from "react-icons/bi";
import Style from "../../../styles/PostMeta.module.css";

const Index = ({
  artist,
  author,
  categories,
  genres,
  tags,
  readTime,
  runtime,
  datePublished,
}) => {
  return (
    <div className={Style.wrapper}>
      {(artist || author) && (
        <div>
          <BsPerson />{" "}
          <p>
            {artist ? "Artist" : "Author"}: {artist}
          </p>
        </div>
      )}
      {(categories || genres) && (
        <div>
          <BiCategory />
          <p>{categories ? "Category" : "Genre"}: </p>
          {
            <span>
              {(categories || genres).map((category) => {
                return (
                  <a key={category.name} href={category.uri}>
                    {category.name}
                  </a>
                );
              })}
            </span>
          }
        </div>
      )}
      {tags && (
        <div>
          <AiOutlineTag />
          <p>Tags:</p>
          <span>
            {tags.map((tag) => {
              return (
                <a key={tag.name} href={tag.uri}>
                  {tag.name}
                </a>
              );
            })}
          </span>
        </div>
      )}
      {(runtime || readTime) && (
        <div>
          <BiTime />{" "}
          <p>
            {runtime ? "Duration" : "Read Time"}:{" "}
            {runtime
              ? runtime
              : readTime > 1
              ? `${readTime} minutes`
              : `${readTime} minute`}
          </p>
        </div>
      )}
      {datePublished && (
        <div>
          <BiCalendar /> <p> Published: {datePublished}</p>
        </div>
      )}
    </div>
  );
};

export default Index;
