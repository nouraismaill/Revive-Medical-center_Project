import Star from "../assets/images/Star.png";
const DoctorCard = ({ doctor, key }) => {
  const { name, specialization, avgRating, totalRating, photo } = doctor;

  return (
    <div className="p-3 lg:p-5" key={key}>
      <div>
        <img src={photo} className="w-full" alt="doc-img" />
      </div>
      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
        {name}
      </h2>
      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          {specialization}
        </span>
        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
            <img src={Star} alt="" />
            {avgRating}
          </span>
          <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
            ({totalRating})
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
