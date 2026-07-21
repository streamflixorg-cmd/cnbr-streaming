import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { getMovies } from "../services/movieService";
import { getSeries } from "../services/seriesService";

const StreamflixContext = createContext();
