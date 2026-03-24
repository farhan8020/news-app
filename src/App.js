import { BrowserRouter, Routes, Route } from "react-router-dom";
import React , {Component} from 'react';
import NavBar from './components/NavBar';
import News from './components/News'
import LoadingBar from "react-top-loading-bar";


class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API_KEY
  constructor(){
    super();
    this.state = {
      progress: 0,                                 //1st step for top loading bar on website 
      mode: "light"   // 👈 add this
    }
  }

  setProgress = (progress) => {                  //1st step
    this.setState({ progress: progress });
    }

  toggleMode = () => {
  if (this.state.mode === "light") {
    document.body.style.backgroundColor = "#1e1e2f"; // dark background
    this.setState({ mode: "dark" });
  } else {
    document.body.style.backgroundColor = "white";   // light background
    this.setState({ mode: "light" });
  }
};


   render() {
    return (
      <>
        <div  >
          <BrowserRouter>
          <NavBar mode={this.state.mode} toggleMode={this.toggleMode} />  
           <LoadingBar                           //2nd Step jaha loading chaiye waha paste 
              color="#f11946"
               progress={this.state.progress}
              onLoaderFinished={() => this.setProgress(0)}
            />
          <Routes>  {/* 3rd {<News setProgress={this.setProgress} in every route  */}
            <Route  path="/" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="general" country = 'in' category="general" mode={this.state.mode}/>} /> 
            <Route  path="/business" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="business" country = 'in' category="business" mode={this.state.mode} />} />
            <Route  path="/entertainment" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="entertainment" country = 'in' category="entertainment" mode={this.state.mode} />} />
            <Route  path="/health" element={<News setProgress={this.setProgress} apiKey = {this.apiKey}  key="health" country = 'in' category="health" mode={this.state.mode} />} />
            <Route  path="/science" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="science" country = 'in' category="science" mode={this.state.mode} />} />
            <Route  path="/sports" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="sports" country = 'in' category="sports" mode={this.state.mode} />} />
            <Route  path="/technology" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="technology" country = 'in' category="technology" mode={this.state.mode} />} />
          </Routes>
          <footer className="text-center py-2 bg-dark text-light">
          &copy; 2026 NewsMonkey | Made by Farhan
        </footer>
          </BrowserRouter>
        </div>
      </>
  );
}
}

export default App;

