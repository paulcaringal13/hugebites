"use client";

import { Box, Divider } from "@mui/material";
import Carousel from "./Carousel";
import HomePageMenu from "./HomePageMenu";
import HomePageTieredCakes from "./HomePageTieredCakes";

const HomePageHome = () => {
  return (
    <Box sx={{ maxWidth: "1150px", bgcolor: "#f9fdfd" }} className="mx-auto">
      <Carousel />
      <Divider sx={{ marginTop: "65px", marginBottom: "45px" }} />
      <HomePageMenu />
      <Divider sx={{ marginTop: "65px", marginBottom: "45px" }} />
      <HomePageTieredCakes />
    </Box>
  );
};

export default HomePageHome;
