import "../../styles/globals.css";
import LandingPageNavbar from "../components/LandingPageNavbar";
import CustomerSignUp from "../components/CustomerSignUp";
import signUp from "../../../public/images/signUp.svg";

const SignUpPage = async () => {
  return (
    <div
      className="bg-accent h-[800px] flex flex-col"
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
      <div className="relative" style={{ paddingTop: "170px", height: "90vh" }}>
        <div
          style={{
            width: "550px",
            height: "100%",
            backgroundImage: `url('${signUp.src}')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: 0,
          }}
          className="mt-24 ml-14"
        ></div>
        <div className="left-0 w-full">
          <CustomerSignUp />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
