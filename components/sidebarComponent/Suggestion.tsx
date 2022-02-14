interface IProps {
  email: string;
  follower: string;
  imageUrl: string;
}

function Suggestion({ email, follower, imageUrl }: IProps) {
  return (
    <div className="mt-4 flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8">
          <img
            src={imageUrl}
            alt="profile"
            className="rounded-full w-8 h-8 object-cover"
          />
        </div>
        <div className="flex flex-col w-[60%]">
          <p className="text-sm font-semibold truncate">{email}</p>
          <p className="capitalize text-xs text-gray-400 font-medium truncate">
            followed by {follower}
          </p>
        </div>
        <button
          aria-label="follow"
          className="text-xs text-blue-500 font-semibold capitalize"
        >
          follow
        </button>
      </div>
    </div>
  );
}

export default Suggestion;
