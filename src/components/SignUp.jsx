import React, { useState } from "react";

const SignUp = ({ toggle }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required!";
    if (!formData.email) newErrors.email = "Email is required!";
    if (!formData.password) newErrors.password = "Password is required!";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match!";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted", formData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-bl from-indigo-500 via-sky-500 to-blue-400 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-white text-center mb-4">
        Create Account
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
                : "border-gray-300 focus:ring-cyan-300"
            }`}
          />
          {errors.username && (
            <p className="text-sm text-red-300 mt-1">{errors.username}</p>
          )}
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none ${
              errors.email
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-cyan-300"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-300 mt-1">{errors.email}</p>
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
                : "border-gray-300 focus:ring-cyan-300"
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-300 mt-1">{errors.password}</p>
          )}
        </div>
        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none ${
              errors.confirmPassword
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-cyan-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-300 mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition transform hover:scale-105"
        >
          Sign Up
        </button>
        <p
          onClick={() => toggle("signIn")}
          className="text-white hover:text-yellow-300 text-center cursor-pointer mt-4"
        >
          Already have an account? Sign In
        </p>
      </form>
    </div>
  );
};

export default SignUp;
