import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";

class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API_KEY;

  constructor() {
    super();
    this.state = {
      progress: 0,
      mode: "light"
    };
  }

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  toggleMode = () => {
    if (this.state.mode === "light") {
      document.body.style.backgroundColor = "#1e1e2f";
      this.setState({ mode: "dark" });
    } else {
      document.body.style.backgroundColor = "white";
      this.setState({ mode: "light" });
    }
  };

  render() {
    return (
      <>
        <BrowserRouter>

          <NavBar mode={this.state.mode} toggleMode={this.toggleMode} />

          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />

          <Routes>

            {/* ✅ FIXED: general → top */}
            <Route
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="top"
                  country="in"
                  category="top"
                  mode={this.state.mode}
                />
              }
            />

            <Route path="/business" element={
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="business" category="business" mode={this.state.mode} />
            } />

            <Route path="/entertainment" element={
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" category="entertainment" mode={this.state.mode} />
            } />

            <Route path="/health" element={
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="health" category="health" mode={this.state.mode} />
            } />

            <Route path="/science" element={
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="science" category="science" mode={this.state.mode} />
            } />

            <Route path="/sports" element={
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" category="sports" mode={this.state.mode} />
            } />

            <Route path="/technology" element={
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" category="technology" mode={this.state.mode} />
            } />

          </Routes>

          <footer className="text-center py-2 bg-dark text-light">
            &copy; 2026 NewsMonkey | Made by Farhan
          </footer>

        </BrowserRouter>
      </>
    );
  }
}

export default App;