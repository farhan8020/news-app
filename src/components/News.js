import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {   
  constructor(){
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalArticles: 0
    };
  }

  async componentDidMount() {  
    this.props.setProgress(10);

    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMonkey`;

    this.setState({ loading: true });

    let url = `https://cors-anywhere.herokuapp.com/https://gnews.io/api/v4/top-headlines?category=${this.props.category}&lang=en&country=${this.props.country}&max=20&page=${this.state.page}&apikey=${this.props.apiKey}`;
    
    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedData = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles || [],
      totalArticles: parsedData.totalArticles || 0,
      loading: false
    });

    this.props.setProgress(100);
  }

  // infinite scroll function (FIXED)
  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;

    this.setState({ loading: true });

    let url = `https://cors-anywhere.herokuapp.com/https://gnews.io/api/v4/top-headlines?category=${this.props.category}&lang=en&country=${this.props.country}&max=20&page=${nextPage}&apikey=${this.props.apiKey}`;

    try {
      let data = await fetch(url);
      let parsedData = await data.json();

      if (!parsedData.articles || parsedData.articles.length === 0) {
        this.setState({
          loading: false,
          totalArticles: this.state.articles.length
        });
        return;
      }

      this.setState((prevState) => {
        const newArticles = parsedData.articles;

        // merge + remove duplicates
        const allArticles = [...prevState.articles, ...newArticles];

        const uniqueArticles = allArticles.filter(
          (article, index, self) =>
            index === self.findIndex(
              (a) => a.url === article.url || a.title === article.title
            )
        );

        return {
          page: nextPage,
          articles: uniqueArticles,
          totalArticles: parsedData.totalArticles,
          loading: false
        };
      });

    } catch (error) {
      console.error("Error fetching more data:", error);
      this.setState({ loading: false });
    }
  };

  render() {
    return ( 
      <div className='container my-3'>                                                                           
        <a href="/" className='text-center my-4 fw-bold text-primary' style={{textDecoration:"none"}}>
          <h3 className="container my-3" style = {{paddingTop:"60px"}}>
            NewsMonkey - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}
          </h3>
        </a>  

        {/* only first load spinner */}
        {this.state.loading && this.state.page === 1 && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < (this.state.totalArticles || 100)}
          loader={!this.state.loading && <Spinner />}
        >
          <div className="container">
            <div className="row">                                                        
              {this.state.articles.map((element) => {                                                           
                return (
                  <div className="col-md-4" key={element.url}>                               
                    <NewsItem
                      title={element.title ? element.title.slice(0,45) : ""}
                      description={element.description ? element.description.slice(0,80) : ""}
                      imageUrl={element.image}
                      newsUrl={element.url}
                      author={element.author ? element.author.slice(0,35) : ""}
                      date={element.publishedAt}
                    />
                  </div>
                )
              })}  
            </div>                    
          </div>       
        </InfiniteScroll>
      </div>
    )
  }
}