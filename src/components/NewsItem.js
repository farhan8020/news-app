import React, { Component } from 'react'
export default class NewsItem extends Component { 
  render() {
    let { description, imageUrl, title, newsUrl , author, date } = this.props;    //or directly <h1>Hello {this.props.name}</h1>*/}
    return (
      <div className='container my-3'>
        <div className="card" style={{ width: "19rem", height: "480px" }}>      {/* ternary operator used bcz agar img null hai in articles to yeh https:""wali image load karo..default mein */}
        <img src={!imageUrl?"https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400":imageUrl} className="card-img-top" alt="news" style={{ height: "200px", objectFit: "cover" }} onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";
  }}/>
        <div className="card-body">
            <h5 className="card-title"> {title}... </h5>   
            <p className="card-text">{description}...</p> 
            <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {date ? new Date(date).toGMTString() : "No Date Mentioned"}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More </a>  {/* btn-sm - 'Read More' ka button chota karne ke liye BootStrap's class*/}
        </div>
        </div>
      </div>
    )
  }
}










































// jaise hum hamesha karte..this.props mei sab dale..phir {} javascript brackets use kar ke access karte..
//waise hi meine yaha "Read More" button click par href{newsUrl} route kiye..newsUrl ko this.props mei likha 
//phir hamare News.js mei apne articles ke values ko element.title, element.description, element.url bolkar assign kiya..
//sab apne website par display hua  
// // dekho aaisa hai : "articles": [
//     {
//       "source": {                            element.title,element.description, elemet.url bolkar access kar sakhte.
//         "id": "news24",                      bcz humne constructor(){                   
                                                       // super();                        
                                                       // this.state = {
                                                       // articles : this.articles bolkar phir niche  {this.state.articles.map((element)=>{ } 
//         "name": "News24"                            // element paraments diye hai apen articles mein 
//       },
//       "author": "Nicolette Lategan",
//       "title": "England re-route to Pretoria for Women’s World Cup prep amid conflict in Middle East",
//       "description": "The England Women’s squad will continue their preparations for a home T20 Cricket World Cup later this year in Pretoria, after the ongoing conflict in the Middle East required them to change their initial destination of Abu Dhabi.",
//       "url": "https://www.news24.com/sport/cricket/england-re-route-to-pretoria-for-womens-world-cup-prep-amid-conflict-in-middle-east-20260307-0297",
//       "urlToImage": "https://news24cobalt.24.co.za/resources/02a3-201602b811e4-8226ee12baa3-1000/format/inline/gettyimages-2243927784.jpeg",
//       "publishedAt": "2026-03-07T08:16:24",
//       "content": "The England Womens squad will continue preparations for a home T20 World Cup later this year in Pretoria, after the ongoing conflict in the Middle East required them to change their initial destinati… [+1857 chars]"
//     },

















//class based component mei props ko this.props mei dalte..humne yaha buss title&description ko props se pass kiya 
//uske liye render mei variable ke sath let {title, description} = this.props;  this.props assign kiye 
