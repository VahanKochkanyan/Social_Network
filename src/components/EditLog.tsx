import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUpdateLogin } from "../lib/types";
import { handleUpdateLogin } from "../lib/Api";

export const EditLog = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<IUpdateLogin>();

  const handleUpdateLog = (data: IUpdateLogin) => {
    handleUpdateLogin(data).then((response) => {
      if (response.status == "error" && response.message) {
        setError(response.message);
      } else {
        navigate("/profile");
      };
    });
  };

  return (
    <div>
      <h3>Update Login</h3>
      <h3>{error}</h3>
      <form onSubmit={handleSubmitLogin(handleUpdateLog)}>
        <input
          type="password"
          placeholder="Enter your old login"
          {...registerLogin("password", {
            required: "It is mandatory to fill in the old login",
          })}
        />
        {loginErrors.password && (
          <p className="text-danger">{loginErrors.password.message}</p>
        )}

        <input
          type="text"
          placeholder="Enter your new login"
          {...registerLogin("login", {
            required: "Completing a new entry is mandatory",
          })}
        />
        {loginErrors.login && (
          <p className="text-danger">{loginErrors.login.message}</p>
        )}

        <button type="submit">Change Login</button>
      </form>
    </div>
  );
};
