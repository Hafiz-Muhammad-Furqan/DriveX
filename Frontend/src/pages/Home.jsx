import HomeSlider from "../components/HomeSlider";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="flex-1  w-full flex items-center justify-around flex-col px-3 ">
      <HomeSlider />
      <div className="w-full flex items-center justify-center flex-col gap-3">
        <Button
          label={"Continue"}
          colors={"bg-[#C1F11D] text-black relative"}
          icon={
            <i className="ri-arrow-right-long-line font-semibold text-lg absolute right-3"></i>
          }
          path={"/role"}
        />
        <p className="text-gray-300  text-[11px] text-center px-3 pb-3">
          joining our app means you agree with our
          <span className="underline"> Terms of Use </span>
          and<span className="underline"> Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
