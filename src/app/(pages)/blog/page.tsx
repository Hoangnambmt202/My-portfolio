import Image from "next/image";

const Blog = () => {
  return (
    <div className="container mx-auto px-4 min-h-lvw">
      <div className="relative flex justify-center py-20">
        <div className="text-8xl font-black text-gray-800 opacity-60 absolute select-none tracking-widest">
          POSTS
        </div>
        <div className="relative top-6 -left-2 z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-white text-5xl font-extrabold tracking-wide">
              MY <span className="text-[color:var(--primary-color)]">BLOG</span>{" "}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-5xl ml-6 ">
        <a
          href="#"
          className="dark:bg-gray-800 dark:border-gray-700 border-gray-200 rounded-lg border  shadow-sm  "
        >
          <Image
            width={0}
            height={0}
            sizes="100vw"
            objectFit="contain"
            style={{ width: "100%", height: "200px" }}
            className="rounded-t-lg"
            src="/assets/imgs/image-1.jpg"
            alt="image-1"
          />
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>

            <button className="relative bg-[#4b48ff] text-white font-medium text-[17px] px-4 py-[0.35em] pl-5 h-[2.8em] rounded-[0.9em] flex items-center overflow-hidden cursor-pointer shadow-[inset_0_0_1.6em_-0.6em_#714da6] group">
              <span className="mr-10">Read more</span>
              <div className="absolute right-[0.3em] bg-white h-[2.2em] w-[2.2em] rounded-[0.7em] flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-0.6em)] shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] active:scale-95">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  className="w-[1.1em] transition-transform duration-300 text-[#7b52b9] group-hover:translate-x-[0.1em]"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </a>
     
      </div>
    </div>
  );
};

export default Blog;
