"use client";
import { Box, Typography } from "@mui/material";

const HomePageTieredCakes = () => {
  return (
    <Box className="mx-auto">
      <Typography
        sx={{
          fontFamily: "cursive",
          fontSize: "35px",
          fontWeight: "bold",
          marginBottom: "25px",
          color: "#EE7376",
        }}
      >
        Explore Our Cake Tiers and Savor Every Moment!
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: "#EE7376",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "70px" }}
        >
          <Box
            component="img"
            sx={{
              height: "fit-content",
              maxWidth: "500px",
              overflow: "hidden",
              width: "80%",
              borderRadius: "10px",
            }}
            src={"/initial-images/2 Tier Cake.jpg"}
            alt={"tiered-cake"}
            className="mx-auto transform transition-all hover:opacity-50 duration-1000"
          />
          <Typography
            component="div"
            sx={{
              marginLeft: "40px",
              marginTop: "8px",
              marginBottom: "5px",
              fontFamily: "cursive",
              fontSize: "10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            10" 2-tier Cake - Starts at ₱2, 800
          </Typography>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", marginRight: "70px" }}
        >
          <Box
            component="img"
            sx={{
              height: "fit-content",
              maxWidth: "500px",
              overflow: "hidden",
              borderRadius: "10px",
              width: "80%",
            }}
            src={"/initial-images/2-tier-cake.jpg"}
            alt={"tiered-cake"}
            className="mx-auto transform transition-all hover:opacity-50 duration-1000"
          />{" "}
          <Typography
            component="div"
            sx={{
              marginLeft: "40px",
              marginTop: "8px",
              marginBottom: "5px",
              fontFamily: "cursive",
              fontSize: "10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            6" & 8" 2-tier Cake - Starts at ₱2, 600
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePageTieredCakes;
