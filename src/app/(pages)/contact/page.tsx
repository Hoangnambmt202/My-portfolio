"use client";

import { Input } from "@/components/elements/Input";
import { Header } from "@/components/layout/Header";
import { FiMail, FiPhone } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 ">
      <div className="max-w-6xl ">
        <Header backdrop="CONTACT" title="GET IN TOUCH" />
        <div className="flex gap-4 justify-start">
          {/* <!-- Contact Info --> */}
          <div className="flex flex-col flex-1/3 space-y-8 p-4">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                DON &apos; T BE SHY !
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Feel free to get in touch with me. I am always open to
                discussing new projects, creative ideas or opportunities to be
                part of your visions.
              </p>
            </div>
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
                        nam23062002@mail.com
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
              {/* <!-- Social Media --> */}
              <div className="flex space-x-4 pt-4">
                <svg width="0" height="0" className="absolute">
                  <defs>
                    <clipPath
                      id="squircleClip"
                      clipPathUnits="objectBoundingBox"
                    >
                      <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"></path>
                    </clipPath>
                  </defs>
                </svg>

                <div className="relative">
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"></div>

                  <div className="relative flex items-end gap-x-2 p-2">
                    <div className="relative">
                      <a
                        href="http://github.com/Hoangnambmt202"
                        style={{ clipPath: "url(#squircleClip)" }}
                        className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-8 w-8 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                        </svg>
                      </a>
                    </div>

                    <div className="relative">
                      <a
                        href="https://www.linkedin.com/in/pham-ngoc-hoang-nam/"
                        style={{ clipPath: "url(#squircleClip)" }}
                        className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-8 w-8 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                        </svg>
                      </a>
                    </div>

                    <div className="relative">
                      <a
                        href="https://www.youtube.com/@NamGoPhim"
                        style={{ clipPath: "url(#squircleClip)" }}
                        className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg border border-red-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-8 w-8 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                        </svg>
                      </a>
                    </div>

                    <div className="relative">
                      <a
                        href="https://www.facebook.com/pham.ngoc.hoang.nam/"
                        style={{ clipPath: "url(#squircleClip)" }}
                        className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg border border-indigo-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                          fill="currentColor"
                          className="h-8 w-8 text-white"
                        >
                          <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Right Section - Contact Form --> */}
          <div className="flex-2/3 p-4 ">
            <form className="space-y-6">
              {/* <!-- Name and Email Row --> */}
              <div className="flex justify-between gap-4">
                {/* Name */}
                <Input placeholder="YOUR NAME" label="YOUR NAME" type="text" />
                {/* email */}
                <Input
                  placeholder="YOUR EMAIL"
                  label="YOUR EMAIL"
                  type="email"
                />
                {/* <!-- Subject --> */}
                <Input
                  placeholder="YOUR SUBJECT"
                  label="YOUR SUBJECT"
                  type="text"
                />
              </div>

              {/* <!-- Message --> */}
              <div className="relative">
                <textarea
                  id="message"
                  rows={6}
                  required
                  className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-4xl text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all peer resize-none"
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
                  className="relative bottom-0 flex justify-center items-center gap-2 border border-[#000] rounded-xl text-[#FFF] font-black bg-[#000] uppercase px-8 py-4 z-10 overflow-hidden ease-in-out duration-700 group hover:text-[#000] hover:bg-[#FFF] active:scale-95 active:duration-0 focus:bg-[#FFF] focus:text-[#000] isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFF] before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 cursor-pointer"
                >
                  <span className="truncate easy-in-out duration-300 group-active:-translate-x-96 group-focus:translate-x-96">
                    Send Message
                  </span>
                  <div className="absolute flex flex-row justify-center items-center gap-2 -translate-x-96 eaes-in-out duration-300 group-active:translate-x-0 group-focus:translate-x-0">
                    <div className="animate-spin size-4 border-2 border-[#000] border-t-transparent rounded-full"></div>
                    Processing...
                  </div>
                  <svg
                    className="fill-[#FFF] group-hover:fill-[#000] group-hover:-translate-x-0 group-active:translate-x-96 group-active:duration-0 group-focus:translate-x-96 group-focus:fill-[#000] ease-in-out duration-700"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
