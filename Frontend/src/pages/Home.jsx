import HomeSlider from "../components/HomeSlider";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-around flex-col px-3">
      <HomeSlider />
      <div className="w-full flex items-center justify-center flex-col gap-3">
        <Button
          label={"Continue"}
          colors={"bg-[#C1F11D] text-black"}
          icon={
            <i className="ri-arrow-right-long-line order-2 font-semibold text-lg pr-4"></i>
          }
          path={"/role"}
        />
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
