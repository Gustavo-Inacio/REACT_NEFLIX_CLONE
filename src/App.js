import React, {useEffect, useState} from 'react';
import './App.css';
import request from './TMDB-request';
import MovieRow from './components/movieRow/index.js';
import Fetured from './components/fetured';
import Header from './components/Header';
import loadingGif from './assets/loading.gif'
import TmdbIcon from './assets/tmbd.svg';

function App() {

  const [movielist, setMovieList] = useState([]);
  const [feturedData, setFeturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadHomeContent = async () => {
      let homeList = await request.getHomeList();
      setMovieList(homeList);
      let info = {};
      do{
        let originals = homeList.filter(element=> element.slug === 'originals')[0].content.results;
        let randomChoosen = Math.floor(Math.random() * originals.length);
        let choosenId = originals[randomChoosen].id;
        info = await request.getMovieInfo(choosenId, 'series');
      } while(!info.backdrop_path)
      

      setFeturedData(info);
    }

    loadHomeContent();

    
  },[]);

  useEffect(() => {
    const blackHeaderChecker = () => {
      if(window.scrollY > 12)
        setBlackHeader(true);
      else
        setBlackHeader(false);
    }

    window.addEventListener('scroll', blackHeaderChecker)

    return () =>{
      window.removeEventListener('scroll', blackHeaderChecker);
    }
  }, [])




  return (
    <div className="Page">
      <Header color={blackHeader}/>

      {feturedData && <Fetured item={feturedData}/>}

      <section className="home--list">
          {movielist.map((list, key) => (
              <MovieRow key={key} list={list} />
          ))}
      </section>

      <footer className="footer">
        <p> 
          <a href="https://www.themoviedb.org/">
            <img className="tmdb-icon" alt="TMDB" src={TmdbIcon}></img>
          </a>
          
        </p>

        <p className="netflix-rights">Direitos de imagem e design para <a href="https://www.netflix.com/br/">Netflix</a></p>
        <p className="my-email">Para fins educacionais. Desenvolvido por <a href="mailto:inacio.gustavo456@gmail.com" >Gustavo Inacio</a></p>
        <p className="disclaimer">Atualiza????es est??o por vir!</p>
      </footer>

      {movielist <= 0 && !feturedData && 
        <div className="loading">
          <img src={loadingGif} alt="Carregando"/>
        </div>
      }
    </div>
  );
}

export default App;
