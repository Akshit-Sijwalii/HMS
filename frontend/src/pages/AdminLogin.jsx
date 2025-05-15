import { useContext, useState } from "react";
import { AdminAppContext } from "../context/AdminAppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminAppContext);
  const { setDToken } = useContext(DoctorContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          //=================Clear Doctor token if it exists========================================================================
          localStorage.removeItem("dToken");
          setDToken("");

          //===================set Admin token======================================================================================
          localStorage.setItem("aToken", data.token);

          navigate("/admin-dashboard");
          setAToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          //====================Clear Admin token if it exists======================================================================
          localStorage.removeItem("aToken");
          setAToken("");

          //=============================Set Doctor token======================================================================
          localStorage.setItem("dToken", data.token);
          navigate("/doctor-dashboard");
          setDToken(data.token);
          console.log(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-zinc-600">{state}</span> Login
          </p>

          <div className="w-full ">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="w-full ">
            <p>Password</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button className="bg-gray-600 text-white w-full py-2 rounded-md text-base cursor-pointer">
            Login
          </button>
          {state === "Admin" ? (
            <p>
              Doctor Login ?
              <span
                onClick={() => setState("Doctor")}
                className="text-blue-600 underline cursor-pointer"
              >
                click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login ?
              <span
                onClick={() => setState("Admin")}
                className="text-blue-600 underline cursor-pointer"
              >
                click here
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default AdminLogin;
