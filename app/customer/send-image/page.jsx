"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";

const UploadImage = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const currentDateAndTime = dayjs().format("MM D YYYY H mm ss A");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const results = await res.json();
      console.log(results);
      console.log(currentDateAndTime);
      setImage(results);
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="Upload" />
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="The house from the offer."
          src={`/products/${image}`}
        />
      </form>
    </Box>
  );
};

export default UploadImage;
