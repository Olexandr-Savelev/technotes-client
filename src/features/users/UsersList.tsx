import { FC } from "react";
import { useGetUsersQuery } from "./UsersApiSlice";
import User from "./User";

const UsersList: FC = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content = null;

  if (isLoading) {
    content = <h1>Loading...</h1>;
  }

  if (isError) {
    content = (
      <p className={"errmsg"}>
        An error has occurred:
        {"data" in error ? `${error?.data}` : `${error}`}
      </p>
    );
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids.length
      ? ids.map((userId) => (
          <User
            key={userId}
            userId={userId}
          />
        ))
      : null;

    content = (
      <table className={"table users-table"}>
        <thead className="table-thead">
          <tr>
            <th
              scope="col"
              className="table-th"
            >
              Username
            </th>
            <th
              scope="col"
              className="table-th"
            >
              Role
            </th>
            <th
              scope="col"
              className="table-th"
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default UsersList;
