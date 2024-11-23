import Profile from "./Profile";
import { useAuthContext } from "../hooks/useAuthContext";

const ProfilePage = () => {
  const { currentUser } = useAuthContext();

  return (
    <div className="bg-[#e6f7ff]">
      {currentUser && currentUser.uid && <Profile userId={currentUser.uid} />}
    </div>
  );
};

export default ProfilePage;
