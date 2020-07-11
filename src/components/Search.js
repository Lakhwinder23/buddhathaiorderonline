import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div className="search-area">
                <div className="container">
                <div className="row">
                    <div className="offset-md-2 col-md-8">
                    <div className="search-dishes text-center">
                        <form action="#" method="POST">
                        <input type="text" name="search" placeholder="Search for Dishes and Restaurent" />
                        <input type="submit" value="Search" />
                        </form>
                    </div>
                    </div>       
                </div>          
                </div>
      </div>
        )
    }
}

export default Search;