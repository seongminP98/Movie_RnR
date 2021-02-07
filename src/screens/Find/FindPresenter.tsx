import React from 'react';
import { Link } from 'react-router-dom';

type FindProps = {
  onChange: any;
  onSubmit: any;
  checkUser: boolean;
};

const Find = ({ onChange, onSubmit, checkUser }: FindProps) => {
  return (
    <div className="flex justify-center pt-0 sm:pt-14">
      <div className="max-w-md w-full space-y-8 flex items-center flex-col">
        <div>
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <form className="mt-8 space-y-6 w-11/12 flex flex-col items-center" action="#" method="POST" onSubmit={onSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-px pb-2 w-full">
            <div>
              <label htmlFor="email-address" className="sr-only">
                ID
              </label>
              <input
                id="email-address"
                name="id"
                type="id"
                autoComplete="id"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="ID"
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Nickname
              </label>
              <input
                id="nickname"
                name="nickname"
                type="nickname"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nickname"
                onChange={onChange}
              />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-gray-darker hover:bg-black-lighter focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-darker"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-white group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
        <div className="w-11/12 flex justify-center relative -top-5">
          <Link to="/join" className="w-full">
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-gray-darker hover:bg-black-lighter focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-darker"
            >
              <span className="absolute left-1 inset-y-0 flex items-center pl-3">
                <i className="fas fa-user-plus"></i>
              </span>
              Create a new account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Find;
