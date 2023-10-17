import { useFormik } from "formik";
import { GoogleIcon } from "../assets/icons/icons";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../Utils/Constans";
import { CreateUser } from "../Api/Actions/CreateUser";
import axios from "axios";


export function Register() {
  const navigateTo = useNavigate()

  const formik = useFormik({
    initialValues: {
      UserName: "",
      Password: "",
      Email: "",
    },
    onSubmit: async(values) => {

      try {
        
        const { response } = await CreateUser(values)
        console.log(response)
        
        navigateTo("/login")

      } catch (error) {
        if(axios.isAxiosError(error))
        {
          console.log(error.response.data.errors)
        } else {
          console.log(error)
        }
      }

    },
  });

  return (
    <section className="flex flex-col lg:flex-row bg-slate-100 dark:bg-slate-800 min-h-screen">
      <div
        className="space-y-20 flex items-center flex-col lg:flex-1
      py-10"
      >
        <div className="w-8/12 flex flex-col justify-center items-center gap-3">
          <header className="h-6 bg-white"></header>

          <div className="flex flex-col md:w-80 gap-3 w-full">

    
              <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>


            <h2 className="text-gray-50 w-full  text-center border-b-2 border-solid border-gray-400  leading-[0.1rem] mt-6 mb-3">
              <span className="bg-slate-100 dark:bg-slate-800 p-5 dark:text-white text-black">OR</span>
            </h2>

            <h1 className="text-md md:text-3xl font-bold text-yellow-400">Welcome</h1>

            <a href="/login" className="dark:text-gray-300 text-md">
              Already has an account? Log in
            </a>
          </div>

          <form
            id="LoginForm"
            method="post"
            className="flex gap-3 flex-col md:w-80 w-full"
            onSubmit={formik.handleSubmit}
          >
                        <div>
              <span
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute
                mt-2 top-64 p-2 pl-2"
              >
                {/* <UserIcon /> */}
              </span>

              <label
                htmlFor="Email"
                className="dark:text-white text-black mb-2 block"
              >
                UserName
              </label>

              <input
                name="UserName"
                type="text"
                aria-required="true"
                autoComplete="off"
                aria-autocomplete="none"
                placeholder="example@gmail.com"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
              text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
                dark:focus:ring-blue-500 pl-9"
                required
                onChange={formik.handleChange}
                value={formik.values.UserName}
              />
            </div>
            
            <div>
              <span
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute
                mt-2 top-64 p-2 pl-2"
              >
                {/* <UserIcon /> */}
              </span>

              <label
                htmlFor="Email"
                className="dark:text-white text-black mb-2 block"
              >
                Email
              </label>

              <input
                name="Email"
                type="email"
                aria-required="true"
                autoComplete="off"
                aria-autocomplete="none"
                placeholder="example@gmail.com"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
              text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
                dark:focus:ring-blue-500 pl-9"
                required
                onChange={formik.handleChange}
                value={formik.values.Email}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block dark:text-white text-black"
              >
                Password
              </label>

              <input
                name="Password"
                type="password"
                aria-required="true"
                autoComplete="off"
                aria-autocomplete="none"
                placeholder="*******************"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50
              p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500
                dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                dark:focus:border-blue-500 dark:focus:ring-blue-500 pl-9"
                required
                onChange={formik.handleChange}
                value={formik.values.Password}
              />
            </div>

              <button
                type="submit"
                id="registerSubmit"
                className="w-full 
                rounded-lg bg-blue-700 px-5 
                py-2.5 text-center text-sm font-medium
                 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
              >
                sign in
              </button>

          </form>
        </div>
      </div>

      <div className="lg:flex-1 p-4">

        <div
          className="bg-gradient-to-t from-transparent to-indigo-500 flex 
           flex-col p-8 dark:bg-gradient-to-t dark:from-transparent dark:to-indigo-500
           bg-black rounded-md h-full"
        >
        
          <img
            src="/src/assets/img/woman.jpg"
            alt=""
            className="w-full rounded-md"
          />

          <span>
            <a
              className="dark:text-white text-black text-center block"
              href="https://www.freepik.com/free-ai-image/cartoon-lofi-young-manga-style-girl-studying-while-listening-music-raining-street-ai-generative_43227423.htm#query=gamer%20anime&position=47&from_view=search&track=ais"
            >
              Image By chandlervid85
            </a>
          </span>
        </div>
      </div>

    </section>
  );
}
