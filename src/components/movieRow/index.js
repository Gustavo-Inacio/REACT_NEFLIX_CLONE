import React, {useState} from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import './styles.css';

const MovieRow = ({list}) => {
    const [scrollList, setScrollList] = useState(0);

    const handleLeftArrow = () => {
        let scroll = scrollList + Math.round(window.innerWidth / 2);
        if(scroll > 0) scroll = 0;

        setScrollList(scroll);
    }
    const handleRightArrow = () => {
        let scroll = scrollList - Math.floor(window.innerWidth / 2);
        if(scroll < (window.innerWidth - (list.content.results.length * 150))) scroll = (window.innerWidth - (list.content.results.length * 150) - 60);

        setScrollList(scroll);
    }
   


    return (
       <div className="movieRow">
            <h2>{list.title}</h2>

            <div className="movieRow--arrowLeft" onClick={handleLeftArrow}>
               <NavigateBeforeIcon style={{fontSize: 50}}/>
            </div>
            <div className="movieRow--arrowRight" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}}/>
            </div>

            <div className="movieRow--listArea" >
                <div className="movieRow--list" style={{width: list.content.results.length * 150, marginLeft: scrollList}}>
                    {list.content.results.length > 0 && list.content.results.map((film, key) => (
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${film.poster_path}`} />
                        </div>
                    ))} 
                </div>
            </div>
        </div>
    )
};

export default MovieRow;