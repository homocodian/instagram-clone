interface IProps {
  src: string;
  username: string;
}
function Story({ src, username }: IProps) {
  return (
    <div className="w-16 cursor-pointer space-y-2 last:mr-4">
      <div
        className="p-[2px] h-[64px] w-[64px] rounded-full bg-gradient-to-bl 
        from-fuchsia-700 to-amber-500"
      >
        <div className="p-[2px] rounded-full bg-white">
          <img
            src={src}
            className="rounded-full object-cover w-[56px] h-[56px]"
            alt=""
          />
        </div>
      </div>
      <div className="text-xs text-center truncate">{username}</div>
    </div>
  );
}

export default Story;
