import DoctorCard from "../../components/DoctorCard";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`https://revive-backend-j4x9.onrender.com/users/appointments/my-appointments`);
 
  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}
      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-centerleading-7 text-[20px] font-semibold text-primaryColor">
          You did not book any doctor yet!
        </h2>
      )}
    </div>
  );
};
export default MyBookings;
