// const findCategoryIdx = (movies, action) => {
//     let movieCategoryIdx
//     if (action.type === "SET_MOVIES") {
//         movieCategoryIdx = movies.findIndex(movie => movie.category === action.payload.category)
//     } else if (action.type === "DELETE_MOVIE") {
//         movieCategoryIdx = movies.findIndex(movie => movie.moviesList.find(movie => movie.imdbID === action.payload))
//     }
//     return movieCategoryIdx
// }

// export const CategoryReducer = (state = moviesInitialState, action) => {
//     const movieCategoryIdx = findCategoryIdx(state.movies, action)
//     switch (action.type) {
//         case "SET_MOVIES":
//         case "DELETE_MOVIE": {
//             if (movieCategoryIdx === -1) {
//                 const oldMovies = state.movies
//                 return {
//                     ...state,
//                     movies: oldMovies.concat({
//                         category: action.payload.category,
//                         moviesList: moviesReducer([], action)
//                     })
//                 }

//             } else {
//                 const oldMovieList = state.movies[movieCategoryIdx]
//                 const newMoviesList = [{
//                     ...oldMovieList,
//                     moviesList: moviesReducer(oldMovieList.moviesList, action)
//                 }]

//                 return {
//                     ...state,
//                     movies: [
//                         ...state.movies.slice(0, movieCategoryIdx),
//                         ...newMoviesList,
//                         ...state.movies.slice(movieCategoryIdx + 1)
//                     ]
//                 }
//             }
//         }
//         default:
//             return state
//     }
// }

// const moviesReducer = (state = moviesInitialState.movies, action) => {
//     switch (action.type) {
//         case "SET_MOVIES":
//             return [...state, ...action.payload.moviesList]
//         case "DELETE_MOVIE":
//             const newMoviesList = state.filter(movie => movie.imdbID !== action.payload)
//             return newMoviesList
//         default:
//             return state
//     }
// };

// export const activeMoviesCategoryReducer = (state = activeMoviesCategoryInitialState, action) => {
//     if (action.type === "CHANGE_CATEGORY") {
//         return action.payload
//     } else {
//         return state
//     }
// }

const promotionCommitteeReducer = (state, action) => {
    switch (action.type) {
        case "SHOW_MEMBERS":
            return [...state, ...action.payload.moviesList]
        // case "DELETE_MOVIE":
        //     const newMoviesList = state.filter(movie => movie.imdbID !== action.payload)
        //     return newMoviesList
        default:
            return state
    }
};

