import { useSetRecoilState } from "recoil";
import { errorMessage } from "../../utils/atoms/errorMessage";
import { useAuth } from "../../utils/AuthProvider";
import getErrorMessage from "../../utils/firebaseErrors";

function Profile() {
  const { user, signOut } = useAuth();
  const setSignoutError = useSetRecoilState(errorMessage);
  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      setSignoutError(getErrorMessage(error));
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center w-full gap-2">
        <img
          src={user?.photoURL || ""}
          alt="profile"
          className="rounded-full h-14 w-14 object-cover"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold truncate w-36">
            {user?.email || user?.displayName}
          </p>
          <p className="capitalize text-xs text-gray-400 font-medium">
            {user?.displayName}
          </p>
        </div>
      </div>
      <button className="capitalize text-blue-500 text-sm" onClick={logout}>
        logout
      </button>
    </div>
  );
}

export default Profile;
