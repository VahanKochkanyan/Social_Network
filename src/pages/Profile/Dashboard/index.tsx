import { useOutletContext } from "react-router-dom";
import { IContextType } from "../../../lib/types";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from "mdb-react-ui-kit";
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant";
import { useRef } from "react";
import { handleCoverUpload, handlePictureUpload } from "../../../lib/Api";

export function Dashboard() {

  const { account, setAccount } = useOutletContext<IContextType>();
  const photo = useRef<HTMLInputElement | null>(null);
  const cover = useRef<HTMLInputElement | null>(null);

  const handlePic = () => {
    if (photo.current) {
      const file = photo.current.files?.[0];
      if (file) {
        const form = new FormData();
        form.append("picture", file);

        handlePictureUpload(form)
          .then((response) => {
            setAccount({ ...account, picture: response.payload as string });
        });
      };
    };
  };

  const handleCover = () => {
    if (cover.current) {
      const file = cover.current.files?.[0];
      if (file) {
        const form = new FormData();
        form.append("cover", file);

        handleCoverUpload(form)
          .then((response) => {
            setAccount({ ...account, cover: response.payload as string });
        });
      };
    };
  };

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-column"
                style={{
                  backgroundColor: "#000",
                  height: "275px", 
                  position: "relative",
                }}
              >

                <input
                  type="file"
                  ref={cover}
                  onChange={handleCover}
                  style={{ display: "none" }}
                />

                <MDBCardImage
                  src={!account.cover ? DEFAULT_PIC : BASE_URL + account.cover}
                  alt="Cover image"
                  fluid
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  onClick={() => cover.current?.click()}
                />

                <input
                  type="file"
                  ref={photo}
                  onChange={handlePic}
                  style={{ display: "none" }}
                />

                <MDBCardImage
                  src={!account.picture ? DEFAULT_PIC : BASE_URL + account.picture}
                  alt="Profile picture"
                  className="img-thumbnail"
                  fluid
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%", 
                    objectFit: "cover",
                    position: "absolute",
                    bottom: "-60px",
                    left: "18px", 
                    zIndex: "1",
                  }}
                  onClick={() => photo.current?.click()}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: "9px", 
                    left: "180px",
                    zIndex: "1",
                    color: "black",
                  }}
                >

                  <MDBTypography tag="h5" className="mb-0">
                    {account.name} {account.surname}
                  </MDBTypography>

                  <MDBCardText>Nor-Norq</MDBCardText>
                </div>
              </div>

              <div className="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{account.followers.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{account.following.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>

              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                    <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                    <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
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
