import React from "react";
import FadeInText from "@/components/animation/FadeInText";
import { useInView } from "react-intersection-observer";

type Props = {};

const OurService = (props: Props) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
  });
  return (
    <div className=" relative z-[5] border-[1px] border-transparent bg-regal_green">
      <div className=" w-[95%] mx-auto">
        <div className="flex items-start justify-between gap-[20px]">
          <div className="max-[520px]:hidden">
            <img src="../spa-wellness.png" alt="Luxury Spa and Wellness Center" />
          </div>
          <div className="">
            <img src="../concierge.png" alt="24/7 Concierge Service" />
          </div>
        </div>
        <div ref={ref} className="flex flex-col gap-[40px] my-[50px]">
          <h2 className=" text-[32px] relative z-[2] font-miracle text-white_text">
            Exceptional Services at Aurum{" "}
          </h2>
          <FadeInText
            inView={inView}
            style=" w-[500px] max-[520px]:w-full font-helvetica text-white_text leading-7"
          >
            Experience unparalleled luxury at Aurum Resort. Our dedicated team provides
            personalized 24/7 concierge service, exclusive spa treatments, and private
            guided tours of the bird sanctuary. Enjoy our infinity pool, fully-equipped
            fitness center, and meditation gardens. Let our attentive staff create
            unforgettable moments during your stay.
          </FadeInText>
          {/* <p className=" w-[400px] max-[520px]:w-full font-helvetica text-white_text leading-7">
            The team of the Safe Restaurant aims to exceed all expectations of
            our guests. Our chef worked hard to develop a unique menu that
            features the best meals of the European cuisine that will match the
            tastes of the most demanding clients. Friendly and attentive waiters
            will ensure that you will enjoy your time in our restaurant.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default OurService;
