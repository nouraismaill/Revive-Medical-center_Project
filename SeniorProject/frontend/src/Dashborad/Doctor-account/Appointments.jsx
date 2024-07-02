import FormatDate from "../../utils/formatDate";
export const Appointments = ({ appointments }) => {
  return (
    <table className="w-full text-left text-sm text-gray-500 ">
      <thead className="text-xs text-gray-900 uppercase bg-gray-50 ">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>

          <th scope="col" className="px-6 py-3">
            Payment
          </th>

          <th scope="col" className="px-6 py-3">
            Date
          </th>
          <th scope="col" className="px-6 py-3">
            Time
          </th>
          <th scope="col" className="px-4 py-3">
            Booked on
          </th>
        </tr>
      </thead>
      <tbody>
        {appointments?.map((item) => (
          <tr key={item._id}>
            <th
              scope="row"
              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
            >
              <img
                src={item?.user?.photo}
                className="w-10 h-10 rounded-full"
                alt=""
              />

              <div className="pl-2 ">
                <div className="text-base font-semibold ">
                  {item?.user?.name}
                </div>
                <div className="text-[13px] text-gray-500">
                  {item?.user?.email}
                </div>
              </div>
            </th>

            <td className="px-6 py-4">
              {item.isPaid && (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  Paid
                </div>
              )}
              {!item.isPaid && (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 bg-red-500 mr-2"></div>Unpaid
                </div>
              )}
            </td>

            <td className="px-[-2] py-4">{item.date}</td>
            <td className="px-6 py-4">{item.time}</td>
            <td className="px-[-2] py-7">{FormatDate(item.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
