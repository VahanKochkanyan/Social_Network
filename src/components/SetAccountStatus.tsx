import { useState } from "react"
import { handleSetAccountStatus } from "../lib/Api"
import { useOutletContext } from "react-router-dom"
import { IContextType } from "../lib/types"
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
} from 'mdb-react-ui-kit';
import { PRIVATE_PIC, PUBLIC_PIC } from "../lib/constant";

export const UpdatePrivacy = () => {

  const {account, setAccount} = useOutletContext<IContextType>()
  const [isPrivate, setIsPrivate] = useState(false)
  const [error, setError] = useState("")

  const onSubmitPrivacy = () => {
    setIsPrivate(!isPrivate)
    handleSetAccountStatus()
      .then(response => {
        console.log(response);
        
          if(response.status == "error" && response.message) {
            setError(response.message)
          }
          setAccount({
            ...account,
            isPrivate: response.payload as boolean
          })
      })
  }

  return (

    <MDBContainer fluid>
            <MDBCol lg="8">
                <MDBCard className="my-5 rounded-3" style={{ maxWidth: '600px' }}>
                    <MDBCardBody className="px-5">  
                        <div className="list">

                            <p>When your account is private, only people you approve can see your photos and more about you. Your existing followers won’t be affected.</p>
                            <img
                                src={account.isPrivate ? PRIVATE_PIC : PUBLIC_PIC }
                                alt={account.isPrivate ? 'Private Account' : 'Public Account'}
                                className="me-2"
                                style={{ cursor: 'pointer' ,height:40, width:40}}
                                onClick={onSubmitPrivacy}
                            />

                            <span>{isPrivate ? 'Private Account' : 'Public Account'}</span>
                        </div>
                        
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
    </MDBContainer>
  );
}