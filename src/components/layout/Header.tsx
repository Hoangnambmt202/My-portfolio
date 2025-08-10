export const Header = ({backdrop, title}: {backdrop:string; title:string}) => {
    const words = title.trim().split(' ');
    const lastWord = words.pop()?.toUpperCase() ;
    const firstPart = words.join(' ')?.toUpperCase() ;
    

  return (
    <div className="relative flex justify-center py-20">
      <div className="text-8xl font-black text-gray-800 opacity-60 absolute select-none tracking-widest uppercase">
        {backdrop}
      </div>
      <div className="relative top-6 -left-2 z-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          <span className="text-white text-5xl font-extrabold uppercase font-poppins">
            {firstPart}{" "}
            <span className="text-[color:var(--primary-color)]">{lastWord}</span>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};