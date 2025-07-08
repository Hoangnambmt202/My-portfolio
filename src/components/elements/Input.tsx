

export const Input = ({placeholder, label, type} : {placeholder:string; label:string, type:string}) => {
  return (
    <div className="relative">
      <input
        type={type}
        id="name"
        required
        className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-full text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all peer"
        placeholder={placeholder}
      />
      <label
        htmlFor="name"
        className="absolute left-4 -top-2.5 bg-gray-800 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-gray-800"
      >
        {label}
      </label>
    </div>
  );
};
