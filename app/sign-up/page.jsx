"use client";
import { useState } from "react";

const page = () => {
  // const firstNameRef = useRef();
  // const lastNameRef = useRef();
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const passwordConfirmRef = useRef();
  // const contactRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [accountType, setAccountType] = useState("");

  // function onSubmit(e) {
  //   e.preventDefault();
  //   console.log({
  //     first_name: firstNameRef.current.value,
  //     last_name: lastNameRef.current.value,
  //     email: emailRef.current.value,
  //     password: passwordRef.current.value,
  //     password_confirm: passwordConfirmRef.current.value,
  //     contact: contactRef.current.value,
  //   });
  // }

  const createAccount = async () => {
    const postData = {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        age: age,
        contact: contact,
      }),
    };

    console.log(postData.body);

    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/account`,
        postData
      );
      const response = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="max-w-xl w-full mx-auto border-solid border-4 border-slate-300 rounded-xl drop-shadow-lg">
          <div className="sm:mx-auto  md:w-full sm:w-full bg-slate-600 py-9 drop-shadow-sm rounded-md">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign up your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              // onSubmit={onSubmit}
            >
              <div>
                <div className="flex justify-between">
                  <div className="flex-1 me-1">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First Name
                    </label>
                  </div>

                  <div className="flex-1 ms-2">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last Name
                    </label>
                  </div>
                </div>

                <div className="flex  mt-2 justify-between">
                  {/* first_name */}
                  <div className="flex-1 me-1">
                    <input
                      // ref={firstNameRef}
                      id="first_name"
                      type="text"
                      autoComplete="first_name"
                      required
                      placeholder="Enter First Name"
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  {/* last_name */}
                  <div className="flex-1 ms-2">
                    <input
                      // ref={lastNameRef}
                      id="last_name"
                      type="text"
                      autoComplete="last_name"
                      required
                      placeholder="Enter Last Name"
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                {/* email */}
                <div className="mt-2">
                  <input
                    // ref={emailRef}
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter Email Address"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                {/* password */}
                <div className="mt-2">
                  <input
                    // ref={passwordRef}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Enter Password"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password_confirm"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  {/* password_confirm */}
                  <input
                    // ref={passwordConfirmRef}
                    id="password_confirm"
                    type="password"
                    required
                    placeholder="Re-enter Password"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Age
                </label>
                {/* contact */}
                <div className="mt-2">
                  <input
                    // ref={contactRef}
                    id="age"
                    type="number"
                    autoComplete="contact"
                    required
                    placeholder="Enter Age"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contact Number
                </label>
                {/* contact */}
                <div className="mt-2">
                  <input
                    // ref={contactRef}
                    id="contact"
                    type="number"
                    autoComplete="contact"
                    required
                    placeholder="Enter Contact Number"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-slate-600 px-3 mb-10 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={createAccount}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
