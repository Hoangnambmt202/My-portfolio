import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen max-w-5xl mx-auto items-center justify-center ">

        <div className="relative rounded-tl-[50px] rounded-bl-[50px]">
          <div className="relative bg-black p-2  overflow-hidden">
            <Image
              className="rounded-3xl !h-[500px] object-cover"
              src="/assets/imgs/Nam_1.jpg"
              width={500}
              height={400}
          
              alt="Picture of the author"
            />
          </div>

          
          <div className="absolute left-full top-1/2 transform -translate-y-1/2">
            <button className="bg-white text-black p-2 rounded-l-full shadow-lg">
              <i className="fas fa-gear"></i>
            </button>
          </div>
        </div>

        
        <div className="flex-1 px-10">
          
          <h1 className="text-4xl font-bold text-[color:var(--primary-color)] inline-block"><span className="text-xl text-[color:var(--primary-color)]">—</span>  I&apos;M NAM.</h1>
          <h2 className="text-4xl font-extrabold mt-1 mb-4">FULLSTACK WEB DEV</h2>

          <p className="text-lg text-gray-300 max-w-xl leading-relaxed mb-6">
            I&apos;m a Tunisian based web designer & front-end developer focused on crafting clean & user-friendly experiences, 
            I am passionate about building excellent software that improves the lives of those around me.
          </p>
       <Link href='/about'>
       
        <button
          className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
        >
          <span
            className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"
          >
          </span>
          <span
            className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined"
          >
            More about me
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
              ></path>
            </svg>
          </span>
        </button>
       </Link>

         
        </div>
      </div>
    </>
  )
}
