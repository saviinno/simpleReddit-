import React, { Component } from 'react'
import axios from 'axios';
import Item from './Item'; 

class List extends Component {
    constructor(){
        super();
        this.state = {
            items: []
        };
    }

    async componentDidMount(){
        let url = 'http://www.reddit.com/r/reactjs.json'; 

        // fetch reddit data
        axios.request({
            url: url,
            method: 'GET',
        }).then((res)=>{              
            let items = [];          
            res.data.data.children.forEach(element => {
                // prepare data to show in component
                let voteItem = {
                    title: '',
                    voteCount: 0,
                    domain: '',
                    author: '',
                    commentsCount: 0,
                    url: '',
                    created: 0,
                    avatar: ''
                }  

                voteItem.title = element.data.title;
                voteItem.voteCount = element.data.ups + element.data.downs;
                voteItem.domain = element.data.domain;
                voteItem.author = element.data.author;
                voteItem.commentsCount = element.data.num_comments;
                voteItem.url = element.data.url;
                voteItem.created = element.data.created;

                if (typeof element.data.preview !== 'undefined'){
                    voteItem.avatar = element.data.preview.images[0].source.url;
                }

                items.push(voteItem);                
            }); 
            // sort by vote count
            items.sort(function(a, b){return b.voteCount - a.voteCount});   
            // update state variable  
            this.setState({
                items: items
            });   
        }).catch((err) => {
            console.log(err);
        });
    }

    render(){
        const { items } = this.state;
        return (
            <div className ="container">
                {
                    items.map((element, key) => (
                        <Item 
                            key={key}
                            title={element.title} 
                            url={element.url} 
                            vote={element.voteCount} 
                            domain={element.domain} 
                            author={element.author} 
                            avatar={element.avatar}
                            created={element.created}
                            num_comment={element.commentsCount}/>
                        )
                    )
                    
                }
            </div>
        )
    }
}

export default List;