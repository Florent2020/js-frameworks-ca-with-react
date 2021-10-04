import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Heading from "../layout/Heading";
import AuthContext from "../../context/AuthContext";

export default function AdminPage() {
  const [auth] = useContext(AuthContext);

  const history = useHistory();

  if (!auth) {
    history.push("/");
  }

  return (
    <>
      <Heading content="Admin" />
    </>
  );
}
