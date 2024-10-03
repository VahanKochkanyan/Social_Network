import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUpdatePassword } from "../lib/types";
import { handleUpdatePassword } from "../lib/Api";

export const EditPassword = () => {
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
    <>
      <h3 style={{ 
        fontSize: '1.5rem', 
        color: '#333', 
        marginBottom: '5px', 
        textAlign: 'left' 
      }}>Update Password</h3>
  
      <h3 style={{ 
        color: 'red', 
        textAlign: 'center', 
        fontSize: '1rem', 
        marginBottom: '15px' 
      }}>{error}</h3>
  
      <form onSubmit={handleSubmitPassword(handleUpdatePass)} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <input
          type="password"
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginBottom: '10px', 
            borderRadius: '40px', 
            border: '1px solid #ccc', 
            fontSize: '1rem' 
          }}
          placeholder="Enter your old password"
          {...registerPassword("old", {
            required: "Filling in the old password is mandatory",
          })}
        />
        {passwordErrors.old && (
          <p style={{ 
            color: 'red', 
            fontSize: '0.875rem' 
          }}>{passwordErrors.old.message}</p>
        )}
  
        <input
          type="password"
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginBottom: '10px', 
            borderRadius: '40px', 
            border: '1px solid #ccc', 
            fontSize: '1rem' 
          }}
          placeholder="Enter your new password"
          {...registerPassword("newpwd", {
            required: "Entering a new password is mandatory",
          })}
        />
        {passwordErrors.newpwd && (
          <p style={{ 
            color: 'red', 
            fontSize: '0.875rem' 
          }}>{passwordErrors.newpwd.message}</p>
        )}
  
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            border: 'none', 
            borderRadius: '10px', 
            fontSize: '1rem', 
            cursor: 'pointer' 
          }}>Change Password</button>
      </form>
    </>
  );
  
};
