import React, { useState } from "react";

const SignIn = ({ toggle }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required!";
    if (!formData.password) newErrors.password = "Password is required!";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted", formData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-teal-300 via-lime-400 to-yellow-500 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-white text-center mb-4">
        Welcome Back!
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none ${
              errors.username
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-teal-300"
            }`}
          />
          {errors.username && (
            <p className="text-sm text-red-300 mt-1">{errors.username}</p>
          )}
        </div>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none ${
              errors.password
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-teal-300"
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-300 mt-1">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition transform hover:scale-105"
        >
          Sign In
        </button>
        <p
          onClick={() => toggle("signUp")}
          className="text-white hover:text-yellow-300 text-center cursor-pointer mt-4"
        >
          Don't have an account? Sign Up
        </p>
      </form>
    </div>
  );
};

export default SignIn;
