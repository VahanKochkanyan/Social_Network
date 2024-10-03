import { useEffect, useState } from "react"
import { IUser } from "../../../lib/types"
import { handleAcceptRequest, handleDeclineRequest, handleRequests } from "../../../lib/Api"
import { NavLink } from "react-router-dom"
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant"

interface IReq {
    user: IUser
    id: string
}


export const Requests = () => {

    const [requests, setRequests] = useState<IReq[]>([])

    useEffect(() => {
        handleRequests()
            .then(response => {
                setRequests(response.payload as IReq[])
            })
    }, [])


    const handleAccept = (id: string) => {
        handleAcceptRequest(id)
            .then(response => {
                if(response.status == "ok") {
                    setRequests(requests.filter(req => req.id != id))
                }
            })
    }


    const handleDecline = (id: string) => {
        handleDeclineRequest(id)
            .then(response => {
                if(response.status == "ok") {
                    setRequests(requests.filter(req => req.id != id))
                }
            })
    }


return <div>

    {requests.length > 0 && <small> You have {requests.length} Requests!</small>}
    <div className="list">

        {requests.map(req => (

            <div key={req.id} className="list" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                    src={req.user.picture ? BASE_URL + req.user.picture : DEFAULT_PIC}
                    alt={`${req.user.name} ${req.user.surname}`}
                    style={{ width: 50, height: 50, borderRadius: '50%', marginRight: '10px' }}
                />

                <div>
                    <p style={{ margin: 0 }}>{req.user.name} {req.user.surname}</p>
                    <NavLink to={`/profile/${req.user.id}`} className="btn btn-link">View Profile</NavLink>
                </div>
                
                <button type="button" onClick={() => handleAccept(req.id)} className="btn btn-primary">accept</button>
                <button type="button" onClick={() => handleDecline(req.id)} className="btn btn-danger">decline</button>
            </div>
        ))}
    </div>
    </div>
}