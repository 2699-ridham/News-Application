import React, { useEffect, useState } from 'react'
import Newsitems from './Newsitems';
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=>{
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFunction = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(70);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    //useEffect = use to see the changes.
    useEffect(() => {
        document.title = `${capitalizeFunction(props.category)} News-DailyHunt`;
        updateNews();
        //this below is for disable the warbing
        //eslint-disable-next-line
    }, []);

    const fetchMoreData = async () => {
        // a  async api call like which sends
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
    }

    return (
        <div>
            <h2 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>News DailyHunt - Top {capitalizeFunction(props.category)} Headlines</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className='row'>
                        {/*row -> taking 3 items in a row*/}
                        {articles.map((element,id) => {
                            //key: -> important to give to identify each element uniquely
                            return <div className='col-md-4' key={id}>
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
        </div>
    )
}

//if user forgot to pass the props then this default props fires;
News.defaultProps={
    country: 'in',
    pageSize: 8,
    category: 'general'
}

//props defination;
News.propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

}
export default News