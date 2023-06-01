import React, { Component } from 'react'
import loading from "./news.png"
export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <>
        <div className="card" >
          <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={source.length<12?{left:"94%",zIndex:"1"}:{left:"90%",zIndex:"1"}}>{!source?"":source}
          <span class="visually-hidden">unread messages</span></span>
            {!imageUrl ? <img style={{ height: "19em" }} src={loading} className="card-img-top" alt="..." /> : <img style={{ height: "15em" }} src={imageUrl} className="card-img-top" alt="..." />}
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p class="card-text"><small class="text-muted">By {!author ? "Unknown" : author} on {date}</small></p>
              <a href={newsUrl} target='_blank' className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
      </>
    )
  }
}

export default NewsItem