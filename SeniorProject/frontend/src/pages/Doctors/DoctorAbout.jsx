import FormatDate from "../../utils/formatDate";
const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-black font-semibold flex items-center gap-2">
          About of
          <span className="text-blue-500 font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="text__para">{about}</p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-black font-semibold ">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          {qualifications?.map((item, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
            >
              <div>
                <span className="text-blue-500 text-[15px] leading-6 font-semibold">
                  {FormatDate(item.startingDate)} -{" "}
                  {FormatDate(item.endingDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-gray-400">
                  {item.degree}
                </p>
              </div>
              <p className="text-[14px] leading-5 font-medium text-gray-400">
                {item.university}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-black font-semibold ">
          Experience
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5 ">
          {experiences?.map((item, index) => (
            <li key={index} className="p-4 rounded bg-[#F3FAFF]">
              <span className="text-blue-500 text-[15px] leading-6 font-semibold">
                {FormatDate(item.startingDate)} - {FormatDate(item.endingDate)}
              </span>
              <p className="text-[16px] leading-6 font-medium text-gray-400">
                {item.position}
              </p>
              <p className="text-[14px] leading-5 font-medium text-gray-400">
                {item.hospital}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
