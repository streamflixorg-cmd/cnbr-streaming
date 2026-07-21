import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { getMovies } from "../services/movieService";
import { getSeries } from "../services/seriesService";

const StreamflixContext = createContext();

export function StreamflixProvider({ children }) {

    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);

    const [loading, setLoading] = useState(true);

    async function loadData() {

        setLoading(true);

        try {

            const movieList = await getMovies();
            const seriesList = await getSeries();

            setMovies(movieList);
            setSeries(seriesList);

        } catch (error) {

            console.error(error);

        }

        setLoading(false);

    }

    useEffect(() => {

        loadData();

    }, []);

    return (

        <StreamflixContext.Provider
            value={{
                movies,
                series,
                loading,
                reload: loadData
            }}
        >

            {children}

        </StreamflixContext.Provider>

    );

}

export function useStreamflix() {

    return useContext(StreamflixContext);

}