import React, { Component } from 'react'
import Newsitems from './Newsitems';
import { Spinner } from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    //static means remain same through out the code where they will be used;
    //defaultProps -> asigning value to some variables, if case use didn't any props they will get fire;
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    //propTypes -> defines the types of the default props i.e number, String, boolean etc.
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFunction = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    //if we want to use the props inside the constructor then we have to mention props
    constructor(props) {
        //whenever want to access the constructor then super key is mention to be mandatory;
        super(props);
        //basically we can declare our state through the constructor
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }

        document.title = `${this.capitalizeFunction(this.props.category)} News-DailyHunt`;
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }
    //it is a life cycle method -> and run after the rander function -> helps to fetch data through api
    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        // a  async api call like which sends
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
        })
    };

    render() {
        return (
            <>
                <h2 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>News DailyHunt - Top {this.capitalizeFunction(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                        <div className='row'>
                            {/*row -> taking 3 items in a row*/}
                            {this.state.articles.map((element) => {
                                //key: -> important to give to identify each element uniquely
                                return <div className='col-md-4' key={element.content}>
                                    {/* col-md-4 -> "md" -> medium device takes for 4 column  from grid i.e bootstrap contains grid of 12*/}
                                    {/*col-md-4 makes align 3 boxes in one line with space of 4 grid*/}
                                    <Newsitems title={element.title ? element.title : ""}
                                        description={element.description ? element.description.slice(0, 88) : ""}
                                        imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                                        source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
