import { List } from "@mui/material";
import { SongItem } from "./SongItem";
import { ListSubHeader } from "./ListSubHeader";
import { useSongs } from "../hooks/useSongs";
import { useFilteredArtists } from "../hooks/useFilteredArtists";
import { useContentHeight } from "../hooks/useContentHeight";
import { SpotifyIFrameWrapper } from "./SpotifyIFrameWrapper";

export const SongsGroupedByArtist = () => {
  const filteredArtists = useFilteredArtists();
  const tracks = useSongs();
  const maxHeight = useContentHeight();

  const sortedArtists = filteredArtists.sort(
    (a, b) => b.tracks.length - a.tracks.length,
  );

  return (
    <List
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: maxHeight - 8,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {sortedArtists.map(({ id, name, tracks: artistTracks }) => (
        <li key={`section-${id}`}>
          <ul>
            <SpotifyIFrameWrapper id={id} type="artist">
              {(onClick) => <ListSubHeader onClick={onClick} name={name} />}
            </SpotifyIFrameWrapper>
            {artistTracks
              .map((id) => tracks[id as any])
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((song, index) => {
                return <SongItem key={`${id}-${song.id}-${index}`} {...song} />;
              })}
          </ul>
        </li>
      ))}
    </List>
  );
};
