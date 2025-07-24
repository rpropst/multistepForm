import React, { useState } from 'react';

// Main App component
const App = () => {
  // State to manage the current step of the form
  const [currentStep, setCurrentStep] = useState(1);
  // State to store all form data
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceType: '',
    problemDescription: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  // State for form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);
  // State for form validation errors
  const [errors, setErrors] = useState({});

  // Function to handle input changes and update formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Function to validate current step's data
  const validateStep = () => {
    let newErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.customerName.trim()) {
        newErrors.customerName = 'Name is required.';
        isValid = false;
      }
      if (!formData.customerEmail.trim()) {
        newErrors.customerEmail = 'Email is required.';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
        newErrors.customerEmail = 'Email is invalid.';
        isValid = false;
      }
      if (!formData.customerPhone.trim()) {
        newErrors.customerPhone = 'Phone number is required.';
        isValid = false;
      } else if (!/^\d{10}$/.test(formData.customerPhone)) {
        newErrors.customerPhone = 'Phone number must be 10 digits.';
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.serviceType) {
        newErrors.serviceType = 'Service type is required.';
        isValid = false;
      }
      if (!formData.problemDescription.trim()) {
        newErrors.problemDescription = 'Problem description is required.';
        isValid = false;
      }
    } else if (currentStep === 3) {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required.';
        isValid = false;
      } else if (!/^\d{16}$/.test(formData.cardNumber)) {
        newErrors.cardNumber = 'Card number must be 16 digits.';
        isValid = false;
      }
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required.';
        isValid = false;
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Format MM/YY. E.g., 12/25';
        isValid = false;
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required.';
        isValid = false;
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits.';
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  // Function to move to the next step
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  // Function to move to the previous step
  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // In a real application, you would send formData to a backend here.
      console.log('Form Submitted:', formData);
      setIsSubmitted(true);
      // Optionally reset form or navigate to a success page
      // setFormData({ ...initialState });
      // setCurrentStep(1);
    }
  };

  // Render different form sections based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customer Information</h2>
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="John Doe"
              />
              {errors.customerName && <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>}
            </div>
            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="john.doe@example.com"
              />
              {errors.customerEmail && <p className="mt-1 text-sm text-red-600">{errors.customerEmail}</p>}
            </div>
            <div>
              <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="1234567890"
              />
              {errors.customerPhone && <p className="mt-1 text-sm text-red-600">{errors.customerPhone}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Problem Description</h2>
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              >
                <option value="">Select a service type</option>
                <option value="repair">Repair</option>
                <option value="maintenance">Maintenance</option>
                <option value="installation">Installation</option>
                <option value="consultation">Consultation</option>
                <option value="other">Other</option>
              </select>
              {errors.serviceType && <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>}
            </div>
            <div>
              <label htmlFor="problemDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Describe Your Problem
              </label>
              <textarea
                id="problemDescription"
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="Please provide a detailed description of the issue or service you require."
              ></textarea>
              {errors.problemDescription && <p className="mt-1 text-sm text-red-600">{errors.problemDescription}</p>}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Information</h2>
            <p className="text-sm text-gray-600">
              This is a mock payment section. No real payment processing will occur.
            </p>
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength="16"
              />
              {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date (MM/YY)
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  placeholder="XXX"
                  maxLength="4"
                />
                {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Review Your Request</h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner space-y-3">
              <p className="text-lg font-medium text-gray-800">Customer Details:</p>
              <p><strong>Name:</strong> {formData.customerName}</p>
              <p><strong>Email:</strong> {formData.customerEmail}</p>
              <p><strong>Phone:</strong> {formData.customerPhone}</p>

              <p className="text-lg font-medium text-gray-800 mt-4">Problem Details:</p>
              <p><strong>Service Type:</strong> {formData.serviceType}</p>
              <p><strong>Description:</strong> {formData.problemDescription}</p>

              <p className="text-lg font-medium text-gray-800 mt-4">Payment Details (Mock):</p>
              <p><strong>Card Number:</strong> {formData.cardNumber ? `**** **** **** ${formData.cardNumber.slice(-4)}` : 'N/A'}</p>
              <p><strong>Expiry Date:</strong> {formData.expiryDate}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-in-out scale-100 hover:scale-[1.01]">
        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg transition-colors duration-300
                  ${currentStep >= step ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                {step}
              </div>
              <p
                className={`mt-2 text-sm font-medium transition-colors duration-300
                  ${currentStep >= step ? 'text-blue-700' : 'text-gray-500'}`}
              >
                {step === 1 && 'Customer'}
                {step === 2 && 'Problem'}
                {step === 3 && 'Payment'}
                {step === 4 && 'Review'}
              </p>
            </div>
          ))}
        </div>

        {isSubmitted ? (
          <div className="text-center py-10">
            <svg
              className="mx-auto h-24 w-24 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mt-4 text-3xl font-semibold text-gray-900">Request Submitted!</h3>
            <p className="mt-2 text-lg text-gray-600">
              Your service request has been successfully submitted. We will contact you shortly.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setFormData({
                  customerName: '',
                  customerEmail: '',
                  customerPhone: '',
                  serviceType: '',
                  problemDescription: '',
                  cardNumber: '',
                  expiryDate: '',
                  cvv: '',
                });
              }}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Previous
                </button>
              )}

              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105
                    ${currentStep === 3 ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white'}
                    ${currentStep === 1 ? 'ml-auto' : ''}`}
                >
                  {currentStep === 3 ? (
                    <>
                      Review & Submit
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              )}

              {currentStep === 4 && (
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105 ml-auto"
                >
                  Submit Request
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;