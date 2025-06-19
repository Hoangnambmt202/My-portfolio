"use client";
import Link from "next/link";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaEnvelope,
  FaComments,
} from "react-icons/fa";

const navItems = [
  { href: "/", label: "Home", icon: <FaHome /> },
  { href: "/about", label: "About", icon: <FaUser /> },
  { href: "/portfolio", label: "Portfolio", icon: <FaBriefcase /> },
  { href: "/contact", label: "Contact", icon: <FaEnvelope /> },
  { href: "/chat", label: "Chat", icon: <FaComments /> },
];

export default function Nav() {

  return (
    <nav className="fixed top-0 right-10 w-16 h-screen flex flex-col justify-center items-center py-4">
      {navItems.map((item) => (
       
      
       <Link
       key={item.href}
       href={item.href}
         className="cursor-pointer relative bg-white/10 py-2 rounded-full min-w-[8.5rem] min-h-[2.92rem] group max-w-full flex items-center justify-start hover:bg-[color:var(--primary-color)] transition-all duration-[0.8s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] shadow-[inset_1px_2px_5px_#00000080] mb-4"
       >
         <div className="absolute flex px-1 py-0.5 justify-start items-center inset-0">
           <div
             className="w-[0%] group-hover:w-full transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]"
           ></div>
           <div
             className="rounded-full shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_black] h-full aspect-square bg-[color:var(--primary-color)] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:bg-black"
           >
             <div
               className="size-[0.8rem] text-white group-hover:text-white group-hover:-rotate-45 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]"
             >
               {item.icon}
             </div>
           </div>
         </div>
         <div
           className="pl-[3.4rem] pr-[1.1rem] group-hover:pl-[1.1rem] group-hover:pr-[3.4rem] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:text-black text-white"
         >
           {item.label}
         </div>
       </Link>
       
        
      ))}
    </nav>
  );
}
