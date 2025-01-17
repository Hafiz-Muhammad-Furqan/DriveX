import { useState, useEffect } from "react";

const HomeSlider = () => {
  const sliderData = [
    {
      img: "/Images/Home-1.png",
      title: "App where you set the price",
      description: "Find the best offers from drivers, passengers and more.",
    },
    {
      img: "/Images/Home-2.png",
      title: "Your safety is our priority",
      description:
        "Only verified service providers Choose yours by rating and other info.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
        setIsAnimating(false);
      }, 800);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  return (
    <div className="max-w-full flex items-center justify-between flex-col px-6 py-9 overflow-hidden ">
      <div
        className={`flex items-center justify-center gap-1 py-2 transition-opacity duration-500 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        <img
          src="/Images/Logo.png"
          alt="logo"
          className="object-cover bg-center h-10 "
        />
      </div>

      <div
        className={`w-full h-full flex items-center justify-center transition-transform duration-500  ${
          isAnimating ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <img
          src={sliderData[currentIndex].img}
          className="object-fill bg-center h-[290px] w-[300px]"
          alt="Slide Image"
        />
      </div>
      <div
        className={`h-full w-full flex items-center justify-center flex-col gap-4 transition-opacity duration-500 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-white text-2xl text-center font-bold leading-8 tracking-normal font-sans">
          {sliderData[currentIndex].title}
        </p>
        <p className="text-white text-normal text-center font-light tracking-wide leading-6">
          {sliderData[currentIndex].description}
        </p>
      </div>
      <div className="flex justify-center space-x-2">
        {sliderData.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full mt-2 ${
              currentIndex === index ? "bg-blue-500" : "bg-zinc-600"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
