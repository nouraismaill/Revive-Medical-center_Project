import { useRef, useState } from "react";

const FaqsCard = (props) => {
  const answerElRef = useRef();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { faqsList, idx } = props;

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="space-y-5   mt-3 overflow-hidden  border border-solid border-[#D9DCE2] mb-5  p-3 lg:p-2 lg:mr-[-40px] md:mr-[-400px]  sm:mx-auto"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer flex items-center justify-between text-[16px] mt-4 leading-7 lg:text-[22px] lg:leading-8 text-black  font-medium ">
        {faqsList.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" bg-blue-400 text-white h-5 w-5 lg:w-7 lg:h-7 border-none rounded flex items-center justify-centerml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" h-5 w-5 lg:w-7 lg:h-7 border border-solid border-[#141F21] rounded flex items-center justify-center text-black  ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300  "
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <p className=" text-[14px] leading-10  lg:text-[16px] lg:leading-7 font-[400] text-black">
          {faqsList.a}
        </p>
      </div>
    </div>
  );
};

export default FaqsCard;
