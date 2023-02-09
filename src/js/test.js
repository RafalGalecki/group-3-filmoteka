import { getSearchedMovies } from "./fetch"

export const searchInput='Jack'


getSearchedMovies(searchInput).then ( (res) => {
    console.log(res);
})