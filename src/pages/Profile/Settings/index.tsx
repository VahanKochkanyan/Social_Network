import { EditLogin } from "../../../components/EditLogin";
import { EditPassword } from "../../../components/EditPassword";
import { UpdatePrivacy } from "../../../components/SetAccountStatus";

export const Settings = () => {

  return ( 
    <>
      <EditPassword />
      <EditLogin />
      <UpdatePrivacy/>
    </>
  );
};
