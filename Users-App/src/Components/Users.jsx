import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export const Users = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const { isLoading, error, data } = useQuery("userData", () =>
    axios(`https://62b008c7e460b79df03b7410.mockapi.io/users`),
  );
  //   console.log(data);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>error : {error.message}</h1>;

  return (
    <div>
      <h1>Users List</h1>
      <table style={{ margin: "auto" }}>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Avatar</th>
        </tr>
        {data.data.map((e, i) => (
          <tr key={e.id}>
            <td>{i + 1 + "."}</td>
            <td>{e.name}</td>
            <img src={e.avatar} alt="" style={{ width: "50px" }} />
            <td>
              <Link to={`/userdetails/${e.id}`}>
                <button style={{ marginLeft: "50px", cursor: "pointer" }}>
                  Edit
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
