import { useState } from "react";
import Link from "next/link";
import { Button } from "../elements/Button";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import buttonStyle from "../../styles/Button.module.css";
import Style from "../../styles/Sidebar.module.css";

export const DropDown = ({ dropDown, genres, handleClick }) => {
  return (
    <>
      {dropDown && (
        <ul className={Style.dropDown}>
          {genres.map((genre) => {
            const { name, slug } = genre;
            return (
              <>
                <li key={name} onClick={handleClick}>
                  <Link href={`/posts/category/${slug}`}>
                    <a>{name}</a>
                  </Link>
                </li>
              </>
            );
          })}
        </ul>
      )}
    </>
  );
};
export const DropDownIcon = ({ toggleDropDown, dropDown, color }) => {
  return (
    <Button
      className={buttonStyle.btn_iconBtn}
      handleClick={toggleDropDown}
      label="Dropdown Toggler"
    >
      {dropDown ? (
        <RiArrowUpSLine color={color} size={20} />
      ) : (
        <RiArrowDownSLine color={color} size={20} />
      )}
    </Button>
  );
};
