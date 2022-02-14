import { useState } from "react";
import { data as storyData } from "../../utils/data";
import Corousel from "./Corousel";
import CreateStory from "./CreateStory";
import Story from "./Story";

function Stories() {
  const [data] = useState(storyData);
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
