import { useEffect } from "react";
import useAuthHook from "../hooks/useAuthHook";

const ResolveAuthScreen = ({ navigation }) => {
  const { tryLocalSignin } = useAuthHook(navigation);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return null;
};

export default ResolveAuthScreen;
