import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general"

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b42cdca1bef94ef5818f8f5516977e62&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        });
    }
    handleHomeClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b42cdca1bef94ef5818f8f5516977e62&page=1&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b42cdca1bef94ef5818f8f5516977e62&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b42cdca1bef94ef5818f8f5516977e62&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({
                loading: true
            })
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })

        }
    }
    render() {
        return (
            <div className="container text-center  my-3">
                <h1 style={{margin:"1em auto"}}>UNITED INDIA TIMES</h1>

                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>← previous</button>
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handleHomeClick}>Go to home</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 6)} className="btn btn-dark" onClick={this.handleNextClick}>next →</button>
                </div>
                <div className="row" style={{margin:"1em auto",display:"flex",alignItems: "center",justifyContent:"center"}}>
                    {this.state.loading && <Spinner />}
                    {!this.state.loading  && this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4 my-3" style={{ }} key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 50)+"..." : ""} description={element.description ? element.description.slice(0, 80)+"..." : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                        )

                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>← previous</button>
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handleHomeClick}>Go to home</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>next →</button>
                </div>
            </div>
        )
    }
}

export default News