import { AppBar } from "./AppBar";
import { List } from "./List";
import { useQuery } from "@tanstack/react-query";
import { lineupsQuery } from "../provider/queries";
import { FestivalItem } from "./FestivalItem";
import { Festival } from "../types/festival";

export const FestivalSelectionScreen = () => {
  const { data: festivals } = useQuery<Festival[]>(lineupsQuery);

  return (
    <div>
      <AppBar title="Synceval" />
      <List>
        {festivals?.map((festival) => <FestivalItem festival={festival} />)}
      </List>
    </div>
  );
};
