import { useForm } from "react-hook-form"
import { IUpdateLogin, IUpdatePassword } from "../../../lib/types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { handleUpdateLogin, handleUpdatePassword } from "../../../lib/Api"

export const Settings = () => {

    const [error, setError] = useState<string>("")

    const navigate = useNavigate()


    
    const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: passwordErrors } } = useForm<IUpdatePassword>()
    const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: loginErrors } } = useForm<IUpdateLogin>()

    const handleUpdatePass = (data: IUpdatePassword) => {
        handleUpdatePassword(data)
            .then(response => {
                if (response.status == "error" && response.message) {
                    setError(response.message)
                } else {
                    navigate("/profile")
                }
            })
    }

    const handleUpdateLog = (data: IUpdateLogin) => {
        handleUpdateLogin(data)
            .then(response => {
                if (response.status == "error" && response.message) {
                    setError(response.message)
                } else {
                    navigate("/profile")
                }
            })
    }

    return (
        <>
            <div>
                <h3>Update Password</h3>
                <h3>{error}</h3>
                <form onSubmit={handleSubmitPassword(handleUpdatePass)} >
                    <input
                        type="password"
                        placeholder="Enter your old password"
                        {...registerPassword("old", {
                            required: "Filling in the old password is mandatory"
                        })}
                    />
                    {passwordErrors.old && <p className="text-danger">{passwordErrors.old.message}</p>}

                    <input
                        type="password"
                        placeholder="Enter your new password"
                        {...registerPassword("newpwd", {
                            required: "Entering a new password is mandatory"
                        })}
                    />
                    {passwordErrors.newpwd && <p className="text-danger">{passwordErrors.newpwd.message}</p>}

                    <button type="submit">Change Password</button>
                </form>
            </div>


            <div>
                <h3>Update Login</h3>
                <h3>{error}</h3>
                <form onSubmit={handleSubmitLogin(handleUpdateLog)} >
                    <input
                        type="password"
                        placeholder="Enter your old login"
                        {...registerLogin("password", {
                            required: "It is mandatory to fill in the old login"
                        })}
                    />
                    {loginErrors.password && <p className="text-danger">{loginErrors.password.message}</p>}

                    <input
                        type="text"
                        placeholder="Enter your new login"
                        {...registerLogin("login", {
                            required: "Completing a new entry is mandatory"
                        })}
                    />
                    {loginErrors.login && <p className="text-danger">{loginErrors.login.message}</p>}

                    <button type="submit">Change Login</button>
                </form>
            </div>
        </>
    )
}
