import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUpdatePassword } from "../lib/types";
import { handleUpdatePassword } from "../lib/Api";

export const EditPwd = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm<IUpdatePassword>();

  const handleUpdatePass = (data: IUpdatePassword) => {
    handleUpdatePassword(data)
    .then((response) => {
      if (response.status == "error" && response.message) {
        setError(response.message);
      } else {
        navigate("/profile");
      }
    });
  };

  return (
    <div>
      <h3>Update Password</h3>
      <h3>{error}</h3>
      <form onSubmit={handleSubmitPassword(handleUpdatePass)}>

        <input
          type="password"
          placeholder="Enter your old password"
          {...registerPassword("old", {
            required: "Filling in the old password is mandatory",
          })}
        />

        {passwordErrors.old && (
          <p className="text-danger">{passwordErrors.old.message}</p>
        )}

        <input
          type="password"
          placeholder="Enter your new password"
          {...registerPassword("newpwd", {
            required: "Entering a new password is mandatory",
          })}
        />
        
        {passwordErrors.newpwd && (
          <p className="text-danger">{passwordErrors.newpwd.message}</p>
        )}

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};
