import React, { useState, useEffect, useRef } from 'react';

// The main application component
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Consolidated CSS Styles
  const styles = `
  
    .app-container {
      min-height: 100vh;
      background-color: #f9fafb; /* bg-gray-50 */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .app-title {
      font-size: 1.875rem; /* text-3xl */
      font-weight: 800; /* font-extrabold */
      color: #1f2937; /* text-gray-800 */
      margin-bottom: 2rem; /* mb-8 */
    }

    /* Open Form Button */
    .open-form-button {
      background-color: #4f46e5; /* bg-indigo-600 */
      color: white;
      font-weight: 600; /* font-semibold */
      padding: 0.75rem 2rem; /* py-3 px-8 */
      border-radius: 0.75rem; /* rounded-xl */
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    }
    .open-form-button:hover {
      background-color: #4338ca; /* hover:bg-indigo-700 */
      transform: scale(1.05); /* hover:scale-105 */
    }
    .open-form-button:focus {
      outline: none;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.5); /* focus:ring-4 focus:ring-indigo-500 */
    }

    /* Modal Styles */
    .modal {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.7); /* bg-black bg-opacity-70 */
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
    }

    .modal-content {
      background-color: white;
      padding: 2rem; /* p-8 */
      border-radius: 1rem; /* rounded-2xl */
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
      width: 100%;
      max-width: 32rem; /* max-w-lg */
      margin-left: 1rem; /* mx-4 */
      margin-right: 1rem;
      position: relative;
    }

    .modal-header {
      font-size: 1.875rem; /* text-3xl */
      font-weight: 700; /* font-bold */
      color: #1f2937; /* text-gray-800 */
      margin-bottom: 1.5rem; /* mb-6 */
      border-bottom: 1px solid #e5e7eb; /* border-b */
      padding-bottom: 0.5rem; /* pb-2 */
    }

    /* Form Styles */
    .form {
      margin-top: 1.25rem; /* simulated space-y-5 */
    }
    .form > div:not(:last-child) {
        margin-bottom: 1.25rem; /* space-y-5 */
    }

    .form-label {
      display: block;
      font-size: 0.875rem; /* text-sm */
      font-weight: 500; /* font-medium */
      color: #374151; /* text-gray-700 */
      margin-bottom: 0.25rem; /* mb-1 */
    }

    .form-input {
      width: 100%;
      padding: 0.75rem; /* p-3 */
      border: 1px solid #d1d5db; /* border border-gray-300 */
      border-radius: 0.5rem; /* rounded-lg */
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .form-input:focus {
      outline: none;
      border-color: #4f46e5; /* focus:border-indigo-500 */
      box-shadow: 0 0 0 1px #4f46e5; /* focus:ring-indigo-500 */
    }

    /* Submit Button */
    .submit-button {
      width: 100%;
      background-color: #10b981; /* bg-green-600 */
      color: white;
      font-weight: 700; /* font-bold */
      padding: 0.75rem 1rem; /* py-3 px-4 */
      border-radius: 0.75rem; /* rounded-xl */
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06); /* shadow-md */
      transition: all 0.3s ease;
      margin-top: 1.5rem; /* mt-6 */
      border: none;
      cursor: pointer;
    }
    .submit-button:hover {
      background-color: #059669; /* hover:bg-green-700 */
      transform: scale(1.01); /* hover:scale-[1.01] */
    }
    .submit-button:focus {
      outline: none;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.5); /* focus:ring-4 focus:ring-green-500 */
    }

    /* Close Button */
    .close-button {
      position: absolute;
      top: 1rem; /* top-4 */
      right: 1rem; /* right-4 */
      color: #9ca3af; /* text-gray-400 */
      font-size: 1.875rem; /* text-3xl */
      line-height: 1;
      background: none;
      border: none;
      cursor: pointer;
      transition: color 0.15s ease-in-out;
    }
    .close-button:hover {
      color: #4b5563; /* hover:text-gray-700 */
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="app-container">
        <h1 className="app-title">XModal Application</h1>
        <button
          onClick={openModal}
          className="open-form-button"
        >
          Open Form
        </button>

        {/* The XModal component renders conditionally */}
        <XModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
};

// The Modal component containing the form logic
const XModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: ''
  });

  // --- Handlers ---

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Logic to handle clicking outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);


  // Reset the form data
  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      dob: '',
      phone: ''
    });
  };

  // --- Validation Logic ---
  const validateAndSubmit = (e) => {
    e.preventDefault();

    // 1. Required Field Validation
    if (!formData.username.trim()) {
      return;
    }
    if (!formData.email.trim()) {
      alert("Invalid email");
      return;
    }
    if (!formData.dob.trim()) {
      alert("Invalid date of birth");
      return;
    }
    if (!formData.phone.trim()) {
      alert("Invalid phone number.");
      return;
    }

    // 2. Email Format Validation (must contain '@')
    if (!formData.email.includes('@')) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // 3. Phone Number Validation (must be exactly 10 digits)
    const phoneDigits = formData.phone.replace(/\D/g, ''); // Remove non-digits
    if (phoneDigits.length !== 10) {
      alert("Invalid phone number");
      return;
    }

    // 4. Date of Birth Validation (must not be a future date)
    const today = new Date();
    // Set time components to midnight for accurate date comparison
    today.setHours(0, 0, 0, 0);

    const dobDate = new Date(formData.dob);
    dobDate.setHours(0, 0, 0, 0); // Ensure the DOB date is also compared at midnight

    if (dobDate > today) {
      // NOTE: Using the exact alert message requested by the user, even though it refers to phone number
      alert("Invalid date of birth");
      return;
    }

    // If all validation passes:
    // 1. Log success (optional)
    console.log("Form submitted successfully:", formData);

    // 2. Reset the form and close the modal
    resetForm();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    // Outer div must have class "modal"
    <div className="modal">
      {/* Inner div must have class "modal-content" and handles the click-outside logic */}
      <div
        className="modal-content"
        ref={modalRef}
        onClick={e => e.stopPropagation()} // Prevent click inside from closing modal
      >
        <h2 className="modal-header">XModal Registration</h2>

        <form onSubmit={validateAndSubmit} className="form">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="user@example.com"
            />
          </div>

          {/* Date of Birth Field */}
          <div>
            <label htmlFor="dob" className="form-label">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., 5551234567"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
          >
            Submit
          </button>
        </form>

        {/* Close Button (Optional, for better UX) */}
        <button
          onClick={onClose}
          className="close-button"
          aria-label="Close Modal"
        >
          &times;
        </button>

      </div>
    </div>
  );
};

export default App;
