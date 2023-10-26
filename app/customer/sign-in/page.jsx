import LandingPageNavbar from "../components/LandingPageNavbar";
import CustomerSignIn from "../components/CustomerSignIn";
import Footer from "../components/Footer";

const SignInPage = async () => {
  async function getAllCustomerAccounts() {
    // GET ALL CUSTOMER ACCOUNTS FROM THE ACCOUNTS TABLE IN THE DATABASE
    const res = await fetch(`http://localhost:3000/api/customer/sign-in`, {
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  }

  // STORE THE RESPONSE TO THIS VARIABLE
  const customerAccounts = await getAllCustomerAccounts();

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
      <div className="relative" style={{ paddingTop: "250px", height: "90vh" }}>
        {/* PASS THE ARRAY OF EXISTING CUSTOMER ACCOUNTS INTO COMPONENT */}
        <CustomerSignIn customerAccounts={customerAccounts} />
      </div>
      <div style={{ height: "50vh", width: "100vw", position: "relative" }}>
        <Footer />
      </div>
    </div>
  );
};

export default SignInPage;
