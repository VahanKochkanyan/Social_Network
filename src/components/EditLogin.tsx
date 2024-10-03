import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUpdateLogin } from "../lib/types";
import { handleUpdateLogin } from "../lib/Api";

export const EditLogin = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<IUpdateLogin>();

  const handleUpdateLog = (data: IUpdateLogin) => {
    handleUpdateLogin(data)
    .then((response) => {
      if (response.status == "error" && response.message) {
        setError(response.message);
      } else {
        navigate("/profile");
      };
    });
  };

  
  return (
    <>
      <h3 style={{ 
        fontSize: '1.5rem', 
        color: '#333', 
        marginBottom: '20px', 
        textAlign: 'left' 
      }}>Update Login</h3>
  
      <h3 style={{ 
        color: 'red', 
        textAlign: 'center', 
        fontSize: '1rem', 
        marginBottom: '10px' 
      }}>{error}</h3>
  
      <form onSubmit={handleSubmitLogin(handleUpdateLog)} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <input
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginBottom: '10px', 
            borderRadius: '40px', 
            border: '1px solid #ccc', 
            fontSize: '1rem' 
          }}
          placeholder="Enter your old login"
          {...registerLogin("password", {
            required: "It is mandatory to fill in the old login",
          })}
        />
        {loginErrors.password && (
          <p style={{ 
            color: 'red', 
            fontSize: '0.875rem' 
          }}>{loginErrors.password.message}</p>
        )}
  
        <input
          type="text"
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginBottom: '10px', 
            borderRadius: '40px', 
            border: '1px solid #ccc', 
            fontSize: '1rem' 
          }}
          placeholder="Enter your new login"
          {...registerLogin("login", {
            required: "Completing a new entry is mandatory",
          })}
        />
        {loginErrors.login && (
          <p style={{ 
            color: 'red', 
            fontSize: '0.875rem' 
          }}>{loginErrors.login.message}</p>
        )}
  
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            border: 'none', 
            borderRadius: 'px', 
            fontSize: '1rem', 
            cursor: 'pointer' 
          }}>Change Login</button>
      </form>
    </>
  );
};
