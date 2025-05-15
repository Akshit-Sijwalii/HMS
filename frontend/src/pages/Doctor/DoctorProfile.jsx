import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { profileData, setProfileData, getProfileData, dToken, backendUrl } =
    useContext(DoctorContext);
  const { currencySymbol } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        await getProfileData();
        setIsEdit(false);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  return (
    profileData && (
      <div className="flex flex-col gap-4 m-5">
        <div>
          <img
            className="bg-white/80 w-full sm:max-w-64 rounded-lg"
            src={profileData.image}
          />
        </div>
        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          <p className="flex items-center font-medium text-3xl text-gray-700 gap-2">
            {profileData.name}
          </p>

          <div className="flex items-center mt-1 text-gray-600 gap-2">
            <p>
              {profileData.degree} - {profileData.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {profileData.experience}
            </button>
          </div>

          {/* ======================Doc About=========================================================== */}

          <div>
            <p className="flex items-center gap-1  text-sm font-medium text-neutral-800 mt-3">
              About :{" "}
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {profileData.about}
            </p>
          </div>

          <p className="text-gray-600 mt-3">
            Appointment fee:{" "}
            <span className="text-gray-800 ">
              {currencySymbol}{" "}
              {isEdit ? (
                <input
                  className="bg-gray-50 rounded p-1 mt-2 border border-gray-600"
                  type="number"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  value={profileData.fees}
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>

          <div className="flex gap-2 py-2">
            <p className="font-medium">Address:</p>
            <p className="text-sm">
              {isEdit ? (
                <input
                  className="bg-gray-50 text-xl w-full rounded w-full p-1 mt-1 border border-gray-600 "
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={profileData.address.line1}
                />
              ) : (
                profileData.address.line1
              )}
              <br />
              {isEdit ? (
                <input
                  className="bg-gray-50 text-xl w-full rounded w-full p-1 mt-1 border border-gray-600 "
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={profileData.address.line2}
                />
              ) : (
                profileData.address.line2
              )}
            </p>
          </div>
          <div className="flex gap-1 p-2">
            <input
              className=" cursor-pointer"
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              checked={profileData.available}
              type="checkbox"
              name=""
              id=""
            />
            <label htmlFor="">Available</label>
          </div>

          <div className="mt-10">
            {isEdit ? (
              <button
                className="border border-gray-600 px-4 mt-5 py-1 rounded-full cursor-pointer hover:bg-gray-600 hover:text-white transition-all "
                onClick={() => updateProfile()}
              >
                save
              </button>
            ) : (
              <button
                className="border border-gray-600 px-4 mt-5 py-1 rounded-full cursor-pointer hover:bg-gray-600 hover:text-white transition-all "
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
