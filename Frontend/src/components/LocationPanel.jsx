const LocationPanel = ({
  OpenLocationPanel,
  setOpenLocationPanel,
  locations,
  setLocations,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(locations);
  };
  return (
    <div
      className={`w-full rounded-t-3xl h-[99dvh] flex items-center flex-col transition-transform duration-200 ease-linear z-[10] ${
        OpenLocationPanel ? "translate-y-0" : "translate-y-full"
      } bg-[#141414] fixed bottom-0`}
    >
      <div className="w-full flex items-center justify-center px-3 py-7  relative">
        <h2 className="text-center text-white text-xl font-bold ">
          Enter your route
        </h2>
        <i
          onClick={() => setOpenLocationPanel(false)}
          className="ri-close-line text-white text-xl font-bold px-1 py-[1px] bg-zinc-600 rounded-full cursor-pointer absolute right-3"
        ></i>
      </div>
      <div className="w-full flex flex-col items-center gap-3 px-3">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-3"
        >
          <div className="w-full flex items-center bg-[#3F4042] rounded-md py-3 px-2">
            <div className="h-4 w-4 rounded-full bg-[#C0F11C] flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-black"></div>
            </div>
            <input
              type="text"
              className="w-full bg-[#3F4042] outline-none rounded-lg text-white px-3 placeholder:text-gray-300"
              placeholder="Add Pick-up location"
              value={locations.pickUpLocation}
              onChange={(e) =>
                setLocations({ ...locations, pickUpLocation: e.target.value })
              }
            />
          </div>
          <div className="w-full flex items-center bg-[#3F4042] rounded-md py-3">
            <i className="ri-search-line text-lg font-thin text-white px-2"></i>
            <input
              type="text"
              className="w-full bg-[#3F4042] pr-3 pl-1 outline-none  rounded-lg placeholder:text-gray-300 text-white"
              placeholder="Destination"
              value={locations.destination}
              onChange={(e) =>
                setLocations({ ...locations, destination: e.target.value })
              }
            />
          </div>
          <button
            className="absolute bottom-4  w-[92%] rounded-xl py-2 cursor-pointer font-semibold text-lg text-center bg-[#C1F11D]"
            type="submit"
          >
            Find a Driver
          </button>
        </form>
      </div>
      <div className="w-full px-3 flex flex-col items-center justify-around text-white mt-6 mb-6 gap-6 overflow-y-scroll no-scrollbar">
        <div className="w-full flex items-center justify-center">
          <i className="ri-map-pin-line text-2xl text-gray-400"></i>
          <div className="w-full flex items-start justify-center flex-col px-3 gap-1">
            <p className="font-semibold leading-5">
              Lorem ipsum dolor sit amet .
            </p>
            <p className="text-xs font-thin text-gray-400">
              Lorem ipsum dolor sit amet amet amet adipisicing elit. Quibusdam,
              fuga.
            </p>
          </div>
          <p className="text-gray-400 text-xs">2.3k/m</p>
        </div>
      </div>
    </div>
  );
};

export default LocationPanel;
