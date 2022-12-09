import { useKeyring } from "@w3ui/react-keyring";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 *
 * @param {object} props
 * @param {JSX.Element} props.children
 * @returns
 */
export const ProtectedRoute = ({ children }) => {
  const [{ space }] = useKeyring();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!space?.registered()) {
  //     navigate("/signin");
  //   }
  // }, [space, navigate]);

  return children;
};
