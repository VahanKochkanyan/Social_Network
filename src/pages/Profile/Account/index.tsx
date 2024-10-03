import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { IAccount } from "../../../lib/types"
import { handleCancelRequest, handleSendFollow, handleUnfollow, handleUsersPersonalPage } from "../../../lib/Api"
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit"
import { Gallery } from "../../../components/Gallary"
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant"

export const Account = () => {

    const { id } = useParams()

    const [user ,setUser] = useState<IAccount | null>(null)

    const navigate = useNavigate()


    const handleRequest = () => {
        if(user) {
            if(user.connection.following) {
                unfollowUser()
            } else if(user.connection.requested) {
                cancelRequest()
            } else {
                followUser()
            }
        }
    }


    const followUser = () => {
        if(user && user.id) {
            handleSendFollow(user.id)
                .then(response => {
                    if(response.status == "following") {
                        setUser({
                            ...user,
                            connection: {
                                ...user.connection,
                                following: true,
                            }
                        })
                    } else if(response.status == "requested") {
                        setUser({
                            ...user,
                            connection: {
                                ...user.connection,
                                requested: true,
                            }
                        })
                    }
                })
        }
    }


    const unfollowUser = () => {
        if(user && user.id) {
            handleUnfollow(user.id)
                .then(response => {
                    if(response.status == "unfollowed") {
                        setUser({
                            ...user,
                            connection: {
                                ...user.connection,
                                following: false
                            }
                        })
                    }
                })
        }
    }


    const cancelRequest = () => {
        if(user && user.id) {
            handleCancelRequest(user.id)
                .then(response => {
                    if(response.status == "cancelled") {
                        setUser({
                            ...user,
                            connection: {
                                ...user.connection,
                                requested: false,
                            }
                        })
                    }
                })
        }
    }


    useEffect(() => {
        if(id) {
            handleUsersPersonalPage(id)
                .then(response => {
                    if(!response.payload) {
                        navigate("/profile")
                    } else {
                        setUser(response.payload as IAccount)
                    }
                    
                })
        }
    })

    return  (
        user && <div className="vh-100" style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="container py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md="12" xl="4">
                        <MDBCard 
                         style={{ borderRadius: '15px' }}>
                            <MDBCardBody className="text-center">
                                <div className="mt-3 mb-4">
                                    <MDBCardImage
                                        src={user.picture ? BASE_URL + user.picture : DEFAULT_PIC}
                                        className="rounded-circle" fluid style={{ width: '100px' }} />
                                </div>
                                <MDBTypography tag="h4">{user.name} {user.surname}</MDBTypography>
                                {user.isPrivate? <strong>Private Account</strong> : <strong>Public Account</strong>}
                                <MDBCardText className="text-muted mb-4">
                                </MDBCardText>

                                {user.posts && <Gallery posts={user.posts} />}

                                <button onClick={handleRequest} className='btn btn-primary'>
                                {
                                    user.connection.following ?
                                    "UNFOLLOW" :
                                    user.connection.followsMe ?
                                    "FOLLOW BACK" :
                                    user.connection.requested ?
                                    "CANCEL REQUEST":
                                    "FOLLOW"
                                }
                                </button>

                                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                    <div>
                                        <MDBCardText className="mb-1 h5">8471</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
                                    </div>
                                    <div className="px-3">
                                        <MDBCardText className="mb-1 h5">8512</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                                    </div>
                                    <div>
                                        <MDBCardText className="mb-1 h5">4751</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Total Transactions</MDBCardText>
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

