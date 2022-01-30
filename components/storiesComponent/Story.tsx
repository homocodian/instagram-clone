interface IProps {
  src: string;
  username: string;
}
function Story({ src, username }: IProps) {
  return (
    <div className="w-16 cursor-pointer space-y-2">
      <div className="h-16 w-16 rounded-full">
        <img
          src={src}
          className="rounded-full object-cover p-[2px] 
          w-16 h-16 border-2 border-red-600"
          alt=""
        />
      </div>
      <div className="text-xs text-center truncate">{username}</div>
    </div>
  );
}

export default Story;
