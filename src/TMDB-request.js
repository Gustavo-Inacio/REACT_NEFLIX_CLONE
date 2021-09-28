const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE = "https://api.themoviedb.org/3";
const language = "pt-BR";

const basicFetch = {
    fetch: async (endingPoint) => {
        return (await fetch(`https://api.themoviedb.org/3${endingPoint}api_key=${API_KEY}&language=${language}`)).json();
    },
    urlFix: async (url) => { // this method incluedes a '?' or a '&' to the link.
        if(url.includes('?')) return basicFetch.fetch(`${url}&`); 
        else return basicFetch.fetch(`${url}?`); 
    }
}


const createMovieList = async (slug, title, url) => {
    return  (   
        {   
            slug: slug,    
            title: title,    
            content: await basicFetch.urlFix(url),
        }  
    );
}

const getHomeList = async () => {
    return (
        [
            await createMovieList('originals', 'Originais da Netflix', '/discover/tv/?with_network=213'),
            await createMovieList('trending', 'Recomendados para Você', '/trending/all/week'),
            await createMovieList('toprated', 'Em Alta', '/movie/top_rated'),
            await createMovieList('action', 'Ação', '/discover/movie?with_genres=28'),
            await createMovieList('comedy', 'Comédia', '/discover/movie?with_genres=35'),
            await createMovieList('horror', 'Terror', '/discover/movie?with_genres=27'),
            await createMovieList('romance', 'Romance', '/discover/movie?with_genres=10749'),
            await createMovieList('mystery', 'Suspense', '/discover/movie?with_genres=9648')
        ]
    );
};

const getMovieInfo = async (id, type) => {
    let info = {};
    if(type && id){
        switch(type){
            case 'movie':
                info = await basicFetch.urlFix(`/movie/${id}`);
            break;
            case 'series': 
                info = await basicFetch.urlFix(`/tv/${id}`);
            break;
        }

        return info;
    }
};

export default {
    getHomeList: getHomeList,
    getMovieInfo: getMovieInfo
};