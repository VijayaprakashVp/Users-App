import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

export const UserDetails = () => {
  const [edit, setEdit] = useState(true);
  const [showform, setShowform] = useState(true);
  const id = useParams(); // to get the id from the link
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const { isLoading, error, data } = useQuery("userData1", () =>
    axios(`https://62b008c7e460b79df03b7410.mockapi.io/users/${id.id}`),
  );

  const handleEditSubmit = () => {
    fetch(`https://62b008c7e460b79df03b7410.mockapi.io/users/${id.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    fetch(`https://62b008c7e460b79df03b7410.mockapi.io/users/`, {
      method: "POST",
      body: JSON.stringify({
        name,
        avatar,
        id: id.id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // console.log(name, avatar);
    alert("Yay! Data Modified");
    setEdit(false);
    setShowform(false);
  };

  const { mutate } = useMutation(handleEditSubmit);
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>error : {error.message}</h1>;

  return (
    <div>
      <Link to={"/"} style={{ marginLeft: "-300px" }}>
        <button>Back to Home</button>
      </Link>

      {edit ? <h2>Existing User Details</h2> : <h2>Updated User Details</h2>}

      <div>
        <img src={data.data.avatar} alt="" />
        <h4>Name : {name ? name : data.data.name}</h4>
        <p>User-ID : {data.data.id}</p>
      </div>

      {showform ? (
        <div>
          <h4>
            you can <span style={{ color: "red" }}>edit</span> Below:
          </h4>
          <form action="">
            Name :{" "}
            <input
              type="text"
              placeholder={data.data.name}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />{" "}
            <br />
            <br />
            Avatar Link :{" "}
            <input
              type="text"
              placeholder="Profile Image Link"
              onChange={(e) => setAvatar(e.target.value)}
              value={avatar}
            />
          </form>
          <br />
          <button onClick={handleEditSubmit}>Submit</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
