import "../../styles/globals.css";
import LandingPageNavbar from "../components/LandingPageNavbar";
import CustomerSignUp from "../components/CustomerSignUp";
import Footer from "../components/Footer";

const SignUpPage = async () => {
  return (
    <div
      className="bg-accent h-auto flex flex-col"
      style={{
        zIndex: "-1",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: "100",
        }}
      >
        <LandingPageNavbar />
      </div>
      <div
        className="relative"
        style={{ height: "100vh", paddingTop: "155px" }}
      >
        <CustomerSignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
