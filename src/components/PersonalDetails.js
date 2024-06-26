import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalDetails = () => {
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    general: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    // Clear the specific field's error when user starts typing again
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
      general: '',
    }));
  };

  const validateField = (id, value) => {
    const namePattern = /^[A-Za-z]+$/;
    let errorMessage = '';

    switch (id) {
      case 'firstName':
        if (!namePattern.test(value)) {
          errorMessage = 'First Name can only contain letters.';
        }
        break;
      case 'middleName':
        if (value && !namePattern.test(value)) {
          errorMessage = 'Middle Name can only contain letters.';
        }
        break;
      case 'lastName':
        if (!namePattern.test(value)) {
          errorMessage = 'Last Name can only contain letters.';
        }
        break;
      case 'dateOfBirth':
        const dob = new Date(value);
        const ageDifMs = Date.now() - dob.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age < 18) {
          errorMessage = 'You must be at least 18 years old to apply.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
    return errorMessage;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const fieldErrors = {};

    // Validate all fields
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) {
        fieldErrors[key] = error;
        valid = false;
      }
    });

    if (!valid) {
      // If any field is invalid, set errors and return
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...fieldErrors,
        general: 'Please fix the errors before submitting.',
      }));
      return;
    }

    // Set form as submitted
    setSubmitted(true);

    // Handle form submission logic here
    console.log('Form submitted:', form);
    // Redirect to AccountForm component
    setTimeout(() => {
      navigate('/account-form');
    }, 1000); // Simulate a short delay for demonstration
  };

  return (
    <section id="personal_details" className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gray-200 h-2 rounded-full"></div>
          <div
            className="absolute inset-0 bg-blue-500 h-2 rounded-full transition-width duration-500"
            style={{ width: submitted ? '50%' : '0%' }}
          ></div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-8">Personal Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
                Middle Name (optional)
              </label>
              <input
                type="text"
                id="middleName"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={form.middleName}
                onChange={handleChange}
              />
              {errors.middleName && <p className="text-red-500 text-sm mt-1">{errors.middleName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={form.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth*
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={form.dateOfBirth}
                onChange={handleChange}
                required
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>
          </div>
          {errors.general && <p className="text-red-500 mt-4 text-center">{errors.general}</p>}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PersonalDetails;
