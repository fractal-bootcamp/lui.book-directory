import { ContentType } from "../../shared/constants";

export const ShowThing = ({ id, type }: { id: number; type: ContentType }) => {
  return (
    <div>
      The id is {id}. The type is {type}.
    </div>
  );
};
