import React, { Component } from "react";
// import { movies } from "./getmovies";
import axios from "axios";
export default class Movies extends Component {
  constructor() {
    console.log("constructor chla");
    super();
    this.state = {
      hover: "",
      parr: [1],
      currPage: 1,
      movies: [],
      favhekinahi: [],
    };
  }
  async componentDidMount() {
    let newPage = this.state.currPage + 1;
    // const res = await axios.get(
    //   `https://api.themoviedb.org/3/trending/all/day?api_key=&language=en-US&page=${this.state.currPage}`
    // );
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${newPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  }
  changeMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=4a4d253b86291ab42f6b02d1201be2f3&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  };
  handleRight = () => {
    let tempArr = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      tempArr.push(i);
    }
    this.setState(
      {
        parr: [...tempArr],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );
  };
  handleLeft = () => {
    if (this.state.currPage == 1) return;
    this.setState(
      {
        currPage: this.state.currPage - 1,
      },
      this.changeMovies
    );
  };
  handleMid = (value) => {
    if (value != this.state.currPage) {
      this.setState(
        {
          currPage: value,
        },
        this.changeMovies
      );
    }
  };
  handleFavouritesState = () => {
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    let temp = oldData.map((mov) => mov.id);
    this.setState({
      favhekinahi: [...temp],
    });
  };
  handleFavourites = (movie) => {
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    if (this.state.favhekinahi.includes(movie.id)) {
      oldData = oldData.filter((mov) => mov.id != movie.id);
    } else {
      oldData.push(movie);
    }
    localStorage.setItem("movies", JSON.stringify(oldData));
    this.handleFavouritesState();
  };
  render() {
    console.log("render hua");
    // let movie = movies.results;
    return (
      <>
        {this.state.movies.length === 0 ? (
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movObj) => (
                <div
                  className="card movies-card"
                  onMouseEnter={() => this.setState({ hover: movObj.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movObj.backdrop_path}`}
                    alt={movObj.title}
                    className="card-img-top movies-img"
                  />
                  <h5 className="card-title movies-title">
                    {movObj.original_title}
                  </h5>
                  <div
                    className="button-wrapper"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.hover === movObj.id && (
                      <a
                        onClick={() => this.handleFavourites(movObj)}
                        className="btn btn-primary movies-button"
                      >
                        {this.state.favhekinahi.includes(movObj.id)
                          ? "Remove from "
                          : "Add to "}
                        favourites
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" onClick={this.handleLeft}>
                  Previous
                </a>
              </li>
              {this.state.parr.map((v) => (
                <li class="page-item">
                  <a class="page-link" onClick={() => this.handleMid(v)}>
                    {v}
                  </a>
                </li>
              ))}
              <li class="page-item">
                <a class="page-link" onClick={this.handleRight}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}
