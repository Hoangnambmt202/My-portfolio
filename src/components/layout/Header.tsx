export const Header = ({
  backdrop,
  title,
}: {
  backdrop: string;
  title: string;
}) => {
  const words = title.trim().split(" ");
  const lastWord = words.pop()?.toUpperCase();
  const firstPart = words.join(" ")?.toUpperCase();

  return (
    <div className="relative flex justify-center py-16 sm:py-18 md:py-20">
      {/* Backdrop text */}
      <div className="absolute select-none tracking-widest uppercase text-gray-800 opacity-60 font-black 
        text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
        {backdrop}
      </div>

      {/* Foreground title */}
      <div className="relative top-4 sm:top-5 md:top-6 -left-1 sm:-left-2 z-10">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full animate-pulse"></div>
          <span className="text-white font-extrabold uppercase font-poppins 
            text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
            {firstPart}{" "}
            <span className="text-[color:var(--primary-color)]">{lastWord}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
