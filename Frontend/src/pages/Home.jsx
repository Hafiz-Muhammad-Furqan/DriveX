import HomeSlider from "../components/HomeSlider";
import Btn1 from "../components/Btn1";

const Home = () => {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-around flex-col px-3">
      <HomeSlider />
      <div className="w-full flex items-center justify-center flex-col gap-3">
        <Btn1 label={"Continue"} />
        <p className="text-neutral-400 text-[10px] text-center px-3">
          joining our app means you agree with our
          <span className="underline"> Terms of Use </span>
          and<span className="underline"> Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Home;
