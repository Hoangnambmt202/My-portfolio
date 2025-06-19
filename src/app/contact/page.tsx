"use client";

import { FiMail, FiPhone } from "react-icons/fi";

const Contact = () => {
  const contactLinks = [
    {
      label: "nam23062002@gmail.com",
      icon: <FiMail className="text-white text-xl" />,
    },
    {
      label: "+84 914 837 433 (Zalo)",
      icon: <FiPhone className="text-white text-xl" />,
    },
    {
      label: "https://www.linkedin.com/in/pham-ngoc-hoang-nam",
    },
    {
      label: "https://www.facebook.com/pham.ngoc.hoang.nam",
    },
    {
      label: "http://github.com/Hoangnambmt202",
    },
    {
      label: "https://www.youtube.com/@NamGoPhim",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          {/* <!-- Header with Background Text --> */}
          <div className="relative">
            <div className="text-8xl font-black text-gray-800 opacity-20 absolute -top-8 -left-4 select-none">
              CONTACT
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-primary font-medium">GET IN</span>
                <span className="text-white font-bold text-xl">TOUCH</span>
              </div>
            </div>
          </div>

          {/* <!-- Encouragement Text --> */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">
              DON&apos;T BE SHY !
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Feel free to get in touch with me. I am always open to discussing
              new projects, creative ideas or opportunities to be part of your
              visions.
            </p>
          </div>

          {/* <!-- Contact Info --> */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 group">
              <div>
                <div className="flex gap-4 items-center">
                  <span>
                    <FiMail className="text-white text-5xl" />
                  </span>
                  <div>
                    <p className="text-gray-400 text-sm">MAIL ME</p>
                    <p className="text-white font-medium hover:text-primary transition-colors cursor-pointer">
                      steve@mail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 group">
              <div>
                <div className="flex gap-4 items-center">
                  <span>
                    <FiPhone className="text-white text-5xl" />
                  </span>
                  <div>
                    <p className="text-gray-400 text-sm">CALL ME</p>
                    <p className="text-white font-medium hover:text-primary transition-colors cursor-pointer">
                      +84 914 837 433
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Social Media --> */}
          <div className="flex space-x-4 pt-4">
            {/* linkedin */}
            <a href="">
              <button className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#0077b5] from-gray-800 text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1.1em"
                  viewBox="0 0 512 512"
                  stroke-width="0"
                  fill="currentColor"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"></path>
                </svg>
                <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
                  Linkedin
                </span>
              </button>
            </a>
            {/* youtube */}
            <a href="">
              <button className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#CD201F] from-gray-800 text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1.1em"
                  viewBox="0 0 512 512"
                  strokeWidth={0}
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                </svg>
                <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
                  Youtube
                </span>
              </button>
            </a>
            {/* facebook */}
            <a href="">
              <button className="group flex justify-center p-2 rounded-md drop-shadow-xl from-gray-800 bg-[#316FF6] text-white font-semibold hover:translate-y-2 transition-all duration-250 hover:from-[#331029] hover:to-[#310413]">
                <svg
                  className="w-5"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 448 512"
                  height="1.1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
                </svg>
                <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-md group-hover:-translate-y-10 duration-500">
                  Facebook
                </span>
              </button>
            </a>
            {/* github */}
            <a href="">
            <button className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:translate-y-3 transition-all duration-500 hover:from-[#331029] hover:to-[#310413]">
        <svg className="w-5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
        </svg>
        <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
          GitHub
        </span>
      </button>
            </a>
          </div>
        </div>

        {/* <!-- Right Section - Contact Form --> */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <form className="space-y-6">
            {/* <!-- Name and Email Row --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all peer"
                  placeholder="YOUR NAME"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 -top-2.5 bg-gray-800 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-gray-800"
                >
                  YOUR NAME
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all peer"
                  placeholder="YOUR EMAIL"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 bg-gray-800 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-gray-800"
                >
                  YOUR EMAIL
                </label>
              </div>
            </div>

            {/* <!-- Subject --> */}
            <div className="relative">
              <input
                type="text"
                id="subject"
                required
                className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all peer"
                placeholder="YOUR SUBJECT"
              />
              <label
                htmlFor="subject"
                className="absolute left-4 -top-2.5 bg-gray-800 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-gray-800"
              >
                YOUR SUBJECT
              </label>
            </div>

            {/* <!-- Message --> */}
            <div className="relative">
              <textarea
                id="message"
                rows={6}
                required
                className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all peer resize-none"
                placeholder="YOUR MESSAGE"
              ></textarea>
              <label
                htmlFor="message"
                className="absolute left-4 -top-2.5 bg-gray-800 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-gray-800"
              >
                YOUR MESSAGE
              </label>
            </div>

            {/* <!-- Submit Button --> */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-full flex items-center space-x-3 transition-all transform hover:scale-105 hover:shadow-lg group"
              >
                <span>SEND MESSAGE</span>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <i className="fas fa-paper-plane text-primary text-sm"></i>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
