import { Playlists } from "./Playlists";
import { ArtistResult } from "./ArtistResult";
import "./App.css";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Playlist } from "./SinglePlaylistV2";
import { ArtistNavigationIcon } from "./ArtistNavigationIcon";
import { PlaylistNavigationIcon } from "./PlaylistNavigationIcon";
import { DataLoading } from "./DataLoading";
import { AppBar } from "./AppBar";
import { RouteEnum } from "../state/types";

const borderBottomItems = [
  {
    route: RouteEnum.ARTISTS,
    icon: <ArtistNavigationIcon />,
    label: "Artists",
  },
  {
    route: RouteEnum.PLAYLIST_LIST,
    icon: <PlaylistNavigationIcon />,
    label: "Playlists",
  },
];

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBottomNav = [
    RouteEnum.ARTISTS,
    RouteEnum.PLAYLIST,
    RouteEnum.PLAYLIST_LIST,
  ].find((route) => location.pathname.includes(route.replace(":id", "")));

  const getItem = ({
    route,
    icon,
    label,
  }: {
    route: RouteEnum;
    icon: any;
    label: string;
  }) => {
    const active = location.pathname === route;
    return (
      <BottomNavigationAction
        key={route}
        sx={{ background: active ? "whitesmoke" : "" }}
        onClick={() => navigate(route)}
        label={label}
        icon={icon}
      />
    );
  };

  return (
    <>
      <AppBar />
      <Routes>
        <Route path={RouteEnum.LOADING} element={<DataLoading />} />
        <Route path={RouteEnum.PLAYLIST_LIST} element={<Playlists />} />
        <Route path={RouteEnum.PLAYLIST} element={<Playlist />} />
        <Route path={RouteEnum.ARTISTS} element={<ArtistResult />} />
      </Routes>

      {showBottomNav && (
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            {borderBottomItems.map(getItem)}
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
};
