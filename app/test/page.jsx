"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const net = require('node:net');
  const [users, setUsers] = useState([]);

  const getAllExample = async () => {
    const res = await fetch(`http://localhost:3000/api/test`);
    const data = await res.json();
    const { results } = data;

    setUsers(results);
  };

  useEffect(() => {
    getAllExample();
  }, []);

  return (
    <>
      {users.map((i) => (
        <p key={i.id}>
          {i.name}, {i.company.catchPhrase}
        </p>
      ))}
    </>
  );
};

export default Page;
