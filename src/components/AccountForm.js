import React, { useState } from 'react';

const AccountForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const usernameConditions = {
    noSpecialChar: /^[a-zA-Z0-9]*$/.test(username),
    length: username.length >= 8 && username.length <= 20
  };

  const passwordConditions = {
    length: password.length >= 8,
    containsNumber: /[0-9]/.test(password),
    containsUpperCase: /[A-Z]/.test(password),
    noSequences: !/(.)\1{3,}|(0123|1234|2345|3456|4567|5678|6789|7890)/.test(password)
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{8,20}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    let valid = true;
    let errors = {
      username: '',
      password: '',
      confirmPassword: ''
    };

    if (!validateUsername(username)) {
      valid = false;
      errors.username = 'Username must be 8-20 characters long and contain only letters and numbers.';
    }

    if (!validatePassword(password)) {
      valid = false;
      errors.password = 'Password must be at least 8 characters long, contain at least one number and one uppercase letter.';
    }

    if (password !== confirmPassword) {
      valid = false;
      errors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errors);

    if (valid) {
      alert('Form submitted successfully!');
      // Handle form submission
    }
  };

  const renderValidationMessage = (condition, message) => (
    <li className="flex items-center text-sm text-gray-600 mt-1">
      {submitted && (
        <span className={`mr-2 ${condition ? 'text-green-500' : 'text-red-500'}`}>
          {condition ? '✓' : '✗'}
        </span>
      )}
      {message}
    </li>
  );

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create your login details</h2>
        <p className="text-center text-gray-600 mb-6">Keep your details safe - you'll need them later</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
            <ul>
              {renderValidationMessage(usernameConditions.noSpecialChar, 'Must not contain any special characters or spaces.')}
              {renderValidationMessage(usernameConditions.length, 'Must be at least 8 characters long, but no longer than 20.')}
            </ul>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            <ul>
              {renderValidationMessage(passwordConditions.length, 'Must be at least 8 characters long.')}
              {renderValidationMessage(passwordConditions.containsNumber, 'Contain at least 1 number.')}
              {renderValidationMessage(passwordConditions.containsUpperCase, 'Contain at least 1 UPPER case letter.')}
              {renderValidationMessage(passwordConditions.noSequences, 'Not contain sequences or repeated characters such as 1234, 3333, ZZZZ, etc.')}
            </ul>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
