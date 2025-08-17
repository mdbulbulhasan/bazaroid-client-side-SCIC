import React from "react";
import { Link, useRouteError } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4 animate-pulse" />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
        Oops!
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-4">
        Sorry, an unexpected error has occurred.
      </p>
      {error && (
        <p className="text-gray-500 mb-4">
          <i>{error.statusText || error.message}</i>
        </p>
      )}
      <Link
        to="/"
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition duration-300 cursor-pointer"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
