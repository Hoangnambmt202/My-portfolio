"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Input } from "@/components/elements/Input";
import { useContactForm, useNotifications } from "@/lib/hooks/useStores";
import { useTranslation } from "@/lib/hooks/useTranslation";
import type { ContactForm } from "@/lib/store/useContactStore";

export default function ContactPage() {
  const { t } = useTranslation();
  const {
    form,
    formErrors,
    isSubmitting,
    submitError,
    submitSuccess,
    updateForm,
    submitForm,
  } = useContactForm();

  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    if (submitSuccess) {
      showSuccess(t("contact.messageSent"), t("contact.messageSuccess"));
    }
    if (submitError) {
      showError(t("notifications.error"), submitError);
    }
  }, [submitSuccess, submitError, showSuccess, showError, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm();
    if (success) {
      // Form will be reset automatically by the store
    }
  };

  const handleInputChange = (field: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateForm(field, e.target.value);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Header
          backdrop={t("contact.backdrop")}
          title={t("contact.getInTouch")}
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Section - Contact Info */}
          <div className="w-full lg:w-1/3 space-y-6 lg:space-y-8">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                {t("contact.dontBeShy")}
              </h3>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6">
                {t("contact.description")}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 lg:w-7 lg:h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-400 text-sm">{t("contact.mailMe")}</p>
                  <p className="text-white font-medium break-words">
                    nam23062002@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 lg:w-7 lg:h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-400 text-sm">{t("contact.callMe")}</p>
                  <p className="text-white font-medium" title="tel:+84 914 837 433">+84 914 837 433</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://www.linkedin.com/in/pham-ngoc-hoang-nam/"
                target="_blank"
                rel="noopener noreferrer"
                title="linkedin"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-white"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/pham.ngoc.hoang.nam/"
                target="_blank"
                rel="noopener noreferrer"
                title="facebook"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg border border-indigo-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
              >
                <svg
                  viewBox="0 0 320 512"
                  fill="currentColor"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-white"
                >
                  <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@NamGoPhim"
                target="_blank"
                rel="noopener noreferrer"
                title="youtube"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg border border-red-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-white"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Section - Contact Form */}
           
          <div className="w-full lg:w-2/3 bg-gray-800/50 px-4 py-6 sm:p-6 lg:p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name, Email and Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                <div>
                  <Input
                    id="name"
                    htmlFor="name"
                    placeholder={t("contact.yourName")}
                    label={t("contact.yourName")}
                    type="text"
                    value={form.name}
                    onChange={handleInputChange("name")}
                    error={formErrors.name[0]}
                  />
                </div>
                <div>
                  <Input
                    id="email"
                    htmlFor="email"
                    placeholder={t("contact.yourEmail")}
                    label={t("contact.yourEmail")}
                    type="email"
                    value={form.email}
                    onChange={handleInputChange("email")}
                    error={formErrors.email[0]}
                  />
                </div>
                <div>
                  <Input
                    id="subject"
                    htmlFor="subject"
                    placeholder={t("contact.yourSubject")}
                    label={t("contact.yourSubject")}
                    type="text"
                    value={form.subject}
                    onChange={handleInputChange("subject")}
                    error={formErrors.subject[0]}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  id="message"
                  rows={6}
                  required
                  value={form.message}
                  onChange={handleInputChange("message")}
                  className={`w-full px-4 py-4 bg-gray-700 border rounded-4xl text-white placeholder-transparent focus:outline-none focus:ring-2 transition-all peer resize-none ${
                    formErrors.message[0]
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-600 focus:border-primary focus:ring-primary/20"
                  }`}
                  placeholder={t("contact.yourMessage")}
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 -top-2.5 bg-gray-800 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-gray-800"
                >
                  {t("contact.yourMessage")}
                </label>
                {formErrors.message[0] && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.message[0]}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative flex justify-center items-center gap-2 border border-[#000] rounded-xl text-[#FFF] font-black bg-[#000] uppercase px-6 sm:px-8 py-3 sm:py-4 z-10 overflow-hidden ease-in-out duration-700 group hover:text-[#000] hover:bg-[#FFF] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:bg-[#FFF] focus:text-[#000] isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFF] before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 cursor-pointer text-sm sm:text-base"
                >
                  <span
                    className={`truncate transition-all duration-300 ${
                      isSubmitting ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {t("contact.sendMessage")}
                  </span>

                  {isSubmitting && (
                    <div className="absolute flex flex-row justify-center items-center gap-2">
                      <div className="animate-spin size-4 border-2 border-[#FFF] border-t-transparent rounded-full"></div>
                      <span className="text-sm sm:text-base">{t("contact.sending")}</span>
                    </div>
                  )}

                  <svg
                    className="fill-[#FFF] group-hover:fill-[#000] transition-colors duration-700"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="16"
                    width="16"
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
}