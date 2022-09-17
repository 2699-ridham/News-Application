import React, { Component } from 'react'
import Newsitems from './Newsitems';
import { Spinner } from './spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    //static means remain same through out the code where they will be used;
    //defaultProps -> asigning value to some variables, if case use didn't any props they will get fire;
    static defaultProps={
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    //propTypes -> defines the types of the default props i.e number, String, boolean etc.
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(){
        //whenever want to access the constructor then super key is mention to be mandatory;
        super();
        //basically we can declare our state through the constructor
        this.state={
            articles: [],
            loading: false,
            page:1
        }
    }

    //it is a life cycle method -> and run after the rander function -> helps to fetch data through api
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1efe9f0d13a14c28810decf22aa9bf42&page=1&pageSize=${this.props.pageSize}`;
        //fetch -> promise we have to apply await;
        this.setState(
            {loading: true}
        )
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData);
        this.setState({
            articles : parseData.articles,
            totalResults: parseData.totalResults,
            loading : false
        });
    }
 
    handlePrev= async ()=>{
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1efe9f0d13a14c28810decf22aa9bf42&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            page : this.state.page - 1,
            articles : parseData.articles,
            loading: false
        })
    }
    handleNext= async()=>{
        console.log("Next");
        if(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)){

        }else{
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1efe9f0d13a14c28810decf22aa9bf42&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true})
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                page : this.state.page + 1,
                articles : parseData.articles,
                loading: false
            })
        }
    }
  render() {
    return (
      <div>
            <div className='container my-4'>
                <h2 className="text-center">News DailyHunt - Top Headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className='row'>
                    {/*row -> taking 3 items in a row*/}
                    {this.state.articles.map((element)=>{
                        //key: -> important to give to identify each element uniquely
                        return <div className='col-md-4' key={element.url}>
                        {/* col-md-4 -> "md" -> medium device takes for 4 column  from grid i.e bootstrap contains grid of 12*/}
                        {/*col-md-4 makes align 3 boxes in one line with space of 4 grid*/}
                            <Newsitems title={element.title ? element.title.slice(0,45) : ""} 
                            description={element.description ? element.description.slice(0,88) : ""} 
                            imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                        </div>
                    })}
                </div>
            </div>
            <div className='container d-flex justify-content-between mb-3'>
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}> &larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
            </div>
      </div>
    )
  }
}
