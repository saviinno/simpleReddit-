import React, { Component } from 'react';
import moment from 'moment';

class VoteItem extends Component {
    constructor(){
        super();
        this.state = {
            voteCounts: 0,
            title: '', 
            url: '', 
            created: 0, 
            domain: '',
            commentsCount: 0, 
            author: '',
            avatar: ''
        }

        this.voteDown = this.voteDown.bind(this);
        this.voteUp = this.voteUp.bind(this);
    }

    componentDidMount(){
        this.setState({
            voteCounts: this.props.vote,
            title: this.props.title, 
            url: this.props.url, 
            created: moment(this.props.created * 1000).fromNow(), 
            domain: this.props.domain,
            commentsCount: this.props.num_comment, 
            author: this.props.author,
            avatar: this.props.avatar 
        });
    }
    
    /**
     * Increase Vote Count (vote up)
     */
    voteUp(){
        this.setState({
            voteCounts: this.state.voteCounts + 1
        });
    }

    /**
     * Decrease Vote Count (vote down)
     */
    voteDown(){
        // if vote count is 0, lock to change
        if (this.state.voteCounts === 0){
            return;
        }
        this.setState({
            voteCounts: this.state.voteCounts - 1
        });
    }

    render(){
        const { title, url, created, domain, commentsCount, author, voteCounts, avatar  } = this.state;
        return (
            <div className ="row mt-4">
                <div className="col-md-3 col-sm-4 img-group">
                    <div>
                        <div className="btn-group-vertical">
                        <button 
                            type="button" 
                            className="btn btn-arrow-up" 
                            onClick={e => {
                                e.preventDefault();
                                this.voteUp();                            
                            }}>
                            <i className="fa fa-arrow-up"></i>
                        </button>
                        <label> {voteCounts}</label>
                        <button 
                            type="button" 
                            className="btn btn-arrow-down" 
                            onClick={e => {
                                e.preventDefault();
                                this.voteDown();                            
                            }}>
                            <i className="fa fa-arrow-down"></i>
                        </button>
                    </div>
                    </div>
                    <img src={avatar} alt={author}></img>
                </div>
                <div className="col-md-9 col-sm-8 pb-4 border-bottom">
                    <div className="list-title"><a href={url} className= "color-brown">{title} <span className="domain">{domain}</span></a></div>
                    <div className="list-content">
                        <p>Submitted {created} by <span>{author}</span></p>
                        <div>
                            <nav className="navbar ">
                                <p className="navbar-text color-brown">{commentsCount} comments</p>
                                <p className="navbar-text">share</p>
                                <p className="navbar-text">save</p>
                                <p className="navbar-text">hide</p>
                                <p className="navbar-text">report</p>
                                <p className="navbar-text">pocket</p>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VoteItem;