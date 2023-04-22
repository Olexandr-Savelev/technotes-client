import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../app/store";
import { selectUserById } from "./UsersApiSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { User as IUser } from "./types";
import { EntityId } from "@reduxjs/toolkit";

const User: FC<{ userId: EntityId }> = ({ userId }) => {
  const user = useAppSelector((state) =>
    selectUserById(state, userId)
  ) as IUser;

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`dash/user/${userId}`);
  };

  const userRole = user.roles.toString().replaceAll(",", ", ");

  const activeStatus = user.active ? "" : "table__cell--inactive";

  return (
    <tr className="table__row user">
      <td className={`table__cell ${activeStatus}`}>{user.username}</td>
      <td className={`table__cell ${activeStatus}`}>{userRole}</td>
      <td className={`table__cell ${activeStatus}`}>
        <button
          className="icon-button table__button"
          onClick={handleEdit}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};

export default User;
