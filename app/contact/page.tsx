'use client'

// Importing React and useState
import React, { useState } from 'react';

// FAQItem component
const FAQItem = ({ question, answer }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`border-2 border-gray-100 rounded-lg mb-2 md:mb-5 transition-all duration-300 ease-in ${isOpen ? 'border-opacity-100' : 'border-opacity-0'}`}>
            <button
                onClick={toggleOpen}
                className="flex items-center justify-between w-full p-4 md:px-5 md:py-4 cursor-pointer focus:outline-none"
            >
                <h1 className="font-semibold text-gray-700 text-left">{question}</h1>
                <span className={`text-gray-400 bg-gray-200 rounded-full ${isOpen ? 'transform rotate-180' : ''} transition-transform duration-100 ease-out`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            <hr className="border-gray-200" />

            <p className={`p-4 md:p-8 text-sm text-gray-500 transition-opacity duration-300 ease-in ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                {answer}
            </p>
        </div>
    );
};

const FileUploadForm = () => {
  const [email, setEmail] = useState('');
  const [details, setdetails] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handledetailsChange = (e: any) => {
    setdetails(e.target.value);
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('email', email);
    formData.set('details', details);
    if (file) {
      formData.set('file', file);
    }

    try {
      const response = await fetch('http://localhost:5000/prescription', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[550px] bg-white">
      <h1 className="text-gray-800 text-center text-xl font-bold">Need something extra? Add your Prescription</h1>
      <form className="py-6 px-4 md:px-9" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-base font-medium text-[#07074D]">
            Your Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@domain.com"
            value={email}
            onChange={handleEmailChange}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 md:px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-base font-medium text-[#07074D]">
            Additional Details / Query?
          </label>
          <input
            type="number"
            name="details"
            id="details"
            placeholder="Type your message..."
            value={details}
            onChange={handledetailsChange}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 md:px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="mb-6 pt-2 md:pt-4">
          <label className="mb-3 block text-xl font-semibold text-[#07074D]">Upload File</label>

          <div className="mb-4 md:mb-8">
            <input type="file" name="file" id="file" onChange={handleFileChange} className="sr-only" />
            <label
              htmlFor="file"
              className="relative flex min-h-[150px] md:min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-4 md:p-12 text-center"
            >
              <div>
                <span className="mb-2 block text-base md:text-xl font-semibold text-[#07074D]">Drop files here</span>
                <span className="mb-2 block text-sm md:text-base font-medium text-[#6B7280]">Or</span>
                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-4 md:px-7 text-base md:text-xl font-medium text-[#07074D]">
                  Browse
                </span>
              </div>
            </label>
          </div>

          {file && (
            <div className="mb-4 md:mb-5 rounded-md bg-[#F5F7FB] py-3 md:py-4 px-4 md:px-8">
              <div className="flex items-center justify-between">
                <span className="truncate pr-2 md:pr-3 text-base md:text-lg font-medium text-[#07074D]">{file.name}</span>
                <button type="button" onClick={() => setFile(null)} className="text-[#07074D]">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-4 md:px-8 text-center text-base font-semibold text-white outline-none"
          >
            Send File
          </button>
        </div>
      </form>
    </div>
  );
};


// Contact component
const Contact = () => {
    const faqItems = [
        { question: 'How can I pay for my appointment?', answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?' },
        { question: 'Is the cost of the appointment covered by private health insurance?', answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?' },
        { question: 'Do I need a referral?', answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?' },
        { question: 'What are your opening hours?', answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?' },
        { question: 'What can I expect at my first consultation?', answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?' },
    ];

    return (
        <section className="min-h-[80vh] bg-white flex flex-col md:flex-row justify-around items-center p-4 md:p-8">
            <div className="w-full md:w-1/2 lg:w-2/5 mb-8 md:mb-0 flex flex-col justify-between">
                <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl mb-4 md:mb-8">Frequently asked questions</h1>

                <div>
                    {faqItems.map((item, index) => (
                        <FAQItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3">
                <FileUploadForm />
            </div>
        </section>
    );
};

export default Contact;
