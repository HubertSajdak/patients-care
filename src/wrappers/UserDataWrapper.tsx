import { getUserData } from "features/user/userSlice";
import { useAppDispatch } from "store/hooks";
import { useEffect } from "react";

const UserDataWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return <>{children}</>;
};

export default UserDataWrapper;
