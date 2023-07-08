"use client"
import { useRef } from 'react'
import '../styles/globals.css'

const page = () => {

  const emailRef = useRef()
  const passwordRef = useRef()


  function onSubmit(e) {
    e.preventDefault()
    console.log({
      email : emailRef.current.value,
      password : passwordRef.current.value,
    })
  }

  return (
  <>
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="max-w-xl w-full mx-auto border-solid border-4 border-slate-300 rounded-xl drop-shadow-lg">
          <div className="sm:mx-auto  md:w-full sm:w-full bg-slate-600 py-9 drop-shadow-sm rounded-md">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              {/* email */}
              <div className="mt-2">
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter Email Address"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              {/* password */}
              <div className="mt-2">
                <input
                  ref={passwordRef}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter Password"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm mb-10 font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default page