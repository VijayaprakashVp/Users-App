import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

export const Users = () => {
  const { isLoading, error, data } = useQuery("userData", () =>
    axios(`https://62b008c7e460b79df03b7410.mockapi.io/users`),
  );
  //   console.log("data:", data.data);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>error : {error.message}</h1>;

  const [showform, setShowform] = useState(false);
  const [singleUser, setSingleUser] = useState([]);
  const [name, setName] = useState("");
  const [imageurl, setImageurl] = useState("");

  const handleEditSubmit = () => {
    console.log("name:", name);
    console.log("imageurl:", imageurl);

    fetch(
      `https://62b008c7e460b79df03b7410.mockapi.io/users/${singleUser.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );

    fetch(`https://62b008c7e460b79df03b7410.mockapi.io/users/`, {
      method: "POST",
      body: JSON.stringify({
        name,
        imageurl,
      }),
      headers: { "Content-Type": "application/json" },
    });
  };

  /////////////////////////////////////////////////

  const handleEdit = (id) => {
    // console.log("id:", id);
    fetch(`https://62b008c7e460b79df03b7410.mockapi.io/users/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setSingleUser(res);
        setShowform(true);
      })
      .catch((err) => console.log(err));
  };

  /////////////////////////////////////////////////

  const { mutate } = useMutation(handleEditSubmit);

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
              <button
                style={{ marginLeft: "50px", cursor: "pointer" }}
                onClick={(id) => handleEdit(e.id)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </table>

      {showform ? (
        <div style={{ marginBottom: "100px" }}>
          <h4>
            {singleUser.name}'s Data , can{" "}
            <span style={{ color: "red" }}>Edit</span> here
          </h4>
          <form action="">
            Name :{" "}
            <input
              type="text"
              placeholder={singleUser.name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <br /> <br />
            Avatar :{" "}
            <input
              type="text"
              placeholder="place enter avatar url"
              name="avatar"
              onChange={(e) => setImageurl(e.target.value)}
              value={imageurl}
            />
            <br />
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

////////////////////////////////////////////////////////////

// const [data, setData] = useState([]);
//   const [edit, setEdit] = useState({});
//   var refresh = 0;

//   useEffect(() => {
//     fetch(`https://62b008c7e460b79df03b7410.mockapi.io/users`)
//       .then((res) => res.json())
//       .then((res) => setData(res))
//       .catch((err) => console.log(err));
//   }, [refresh]);

//   const handleChange = (e) => {
//     setEdit({ ...edit, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <h1>Users List</h1>
//       <table style={{ margin: "auto" }}>
//         <tr>
//           <th>S.No</th>
//           <th>Name</th>
//           <th>Avatar</th>
//         </tr>
//         {data.map((e, i) => (
//           <tr key={e.id}>
//             <td>{i + 1 + "."}</td>
//             <td>{e.name}</td>
//             <img src={e.avatar} alt="" style={{ width: "50px" }} />
//             <td>
//               <button
//                 style={{ marginLeft: "50px", cursor: "pointer" }}
//                 onClick={(id) => handleEdit(e.id)}
//               >
//                 Edit
//               </button>
//             </td>
//           </tr>
//         ))}
//       </table>

//
//     </div>
//   );
