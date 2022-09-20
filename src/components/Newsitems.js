import React, { Component } from 'react'

export class Newsitems extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-4'>
        <div className="card">
          <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          {/*if in case imageUrl is null -> attach below link */}
          <img src={imageUrl == null ? "https://th.bing.com/th/id/OIP.np1BGMCMmFhrQ9WCP1SeTgHaE7?pid=ImgDet&rs=1" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            {/*btn-sm is a bootstrap class which make the button of smaller length */}
            <p className="card-text"><small className="text-muted">By {author == null ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            {/*let a = "any date time format ->"new Date(a) -> obj created and then we convert it
                                                                                                     into any of the format of date and time*/}
            <a rel="noopener noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitems
