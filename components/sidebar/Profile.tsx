function Profile() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center w-full gap-2">
        <img
          src={
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
          }
          alt="profile"
          className="rounded-full h-14 w-14 object-cover"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">ashish_s_singh</p>
          <p className="capitalize text-xs text-gray-400 font-medium">
            Ashish singh
          </p>
        </div>
      </div>
      <button className="capitalize text-blue-500 text-sm">logout</button>
    </div>
  );
}

export default Profile;
