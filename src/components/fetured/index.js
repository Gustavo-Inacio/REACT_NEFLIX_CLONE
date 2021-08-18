import React from 'react';
import './styles.css';
import request from '../../TMDB-request'

const fetured = ({item}) => {
    console.log(item);
    let airYear = new Date(item.first_air_date).getFullYear();
    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name)
        
    }

    let description = item.overview;
    if(description.length > 200){
        description = description.substring(0, 200)+'...';
    }

    return (
        <section className="fetured" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}} >
            <div className="fetured--shadow--horizontal">
                <div className="fetured--shadow--vertical">
                    <div className="fetured--name">{item.name}</div>
                    <div className="fetured--info">
                        <div className="fetured--points">{item.vote_average}</div>
                        <div className="fetured--year">{airYear}</div>
                        <div className="fetured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons ==! 1 ? 's' : ''} </div>
                    </div>
                    <div className="fetured--decription">{description} </div>
                    <div className="fetured--buttons">
                        <a className="fetured--watch">◄ Assistir </a>
                        <a className="fetured--myList">+ Minha lista </a>
                    </div>
                    <div className="fetured--genres"><strong>Gêneros: </strong>{genres.join(', ')}</div>
                </div>
            </div>
            
        
        </section>
    );
}

export default fetured;