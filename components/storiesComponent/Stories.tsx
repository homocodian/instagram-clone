import { useEffect, useState } from "react";
import { Data, StoriesData } from "../../utils/types/Stories";
import Corousel from "./Corousel";
import CreateStory from "./CreateStory";
import Story from "./Story";

function Stories() {
  const [data, setData] = useState<StoriesData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const users: Data[] = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then((res) => res.json());
      const modData = users.map(
        (user): StoriesData => ({
          id: user.id,
          username: user.username,
          imageUrl: `https://picsum.photos/200/300?random=${user.id}`,
        })
      );
      setData(modData);
    };
    fetchData();
  }, []);

  return (
    <div className="py-4 mb-6 rounded-[3px] border bg-white">
      {!data ? (
        <CreateStory />
      ) : (
        <Corousel>
          {data.map(({ id, imageUrl, username }) => (
            <Story key={id} src={imageUrl} username={username} />
          ))}
        </Corousel>
      )}
    </div>
  );
}

export default Stories;
