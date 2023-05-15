import Image from "next/image";
import tempImagetoo from "../public/images/tempfiletoo.png";
import landscape from "../public/images/landscape.png";

const Banner = () => {
  return (
    <div 
      className=" banner-background w-full min-h-[50vh] flex flex-col md:flex-row justify-center items-center py-10 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-white  to-yellow-300"
      style={{
        // backgroundImage: `url(${landscape})`,
        backgroundSize: 'cover', // cover the full area of the div
        backgroundPosition: 'center', // center the image
        backgroundRepeat: 'no-repeat' // do not repeat the image
      }}
    >
      <div className="flex flex-col gap-5 text-black mb-8 md:mb-0 md:w-1/2">
        <p className="text-4xl md:text-5xl font-bold leading-tight md:lg:text-6xl">
        Your Empire <br className="hidden md:block" />Starts Here

        </p>
        <p className="w-2/3">Get loads of ready-to-start business ideas, providing you the golden opportunity to swiftly transform your entrepreneurial vision into a thriving reality.</p>
        {/* <p className="text-base md:lg:w-3/4">
          Join 1,000+ elite entrepreneurs getting curated startup ideas in
          million dollar niches. Launch your empire this weekend.
        </p> */}
      </div>
      <div className="image-container w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/3">
        <Image
          className="object-cover"
          src={tempImagetoo}
          layout="responsive"
          width={1280}
          height={720}
          quality={100}
          loading={"eager"}
          alt="bannerImgOne"
        />
      </div>
    </div>
  );
};

export default Banner;
