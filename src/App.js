import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import filmStrip from './filmStrip.png'

// import StartButton from './components/StartButton'

class App extends Component {
  constructor() {
    super()

    this.state = {

      movieInput: "",
      movieName: ['Movie Example'],
      movieOverview: [],
      moviePoster: []

    }
    this.changeButton = this.changeButton.bind(this);
  }

  getMovieInfo(e) {
    axios.get(`http://localhost:8080/api/getstarted/${this.state.movieInput}`)
      .then(response => {
        // console.log(response)
       if(response.data.results.length > 0){
        this.setState({
          movieName: response.data.results[0].original_title,
          movieOverview: response.data.results[0].overview,
          moviePoster: response.data.results[0].poster_path

        })
       }
      })
  }

  inputUpdater(e) {
    this.setState({
      movieInput: e.target.value
    })
  }

  changeButton(buttonName) {
    this.setState({ buttonName })
  }

  render() {
    // console.log(this.state.movieName);
    // console.log(this.state.movieOverview);
    // console.log(this.state.moviePoster);

    return (
      <div>
        <MuiThemeProvider>
          <section>
            <h1 className="title">Search a Movie!</h1>

            <div className="search">

              <input className="inputBox" onChange={(e) => { this.inputUpdater(e) }} />

              <FloatingActionButton mini={true} secondary={true} style={{
                fontSize: '.7em'
              }}className="button" onClick={(e) => { this.getMovieInfo(e) }}> Search
          </FloatingActionButton>

            </div>

          </section>
        </MuiThemeProvider>
        <div className="movieStuff">
          <div className="movieTitle">{this.state.movieName}</div>
          <div className="description">{this.state.movieOverview}</div>

          <div className="poster">
            <img src={`http://image.tmdb.org/t/p/w185` + this.state.moviePoster} alt='' />
          </div>
        </div>
      </div>
    );
  }
}

export default App;