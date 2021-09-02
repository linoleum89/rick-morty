import React, { Component } from 'react';


const WithCharacters = (WrappedComponent, props) => {
    class Characters extends Component {
        constructor() {
            super();
            this._isMounted = false;
        }
        baseUrl = 'https://rickandmortyapi.com/api/character';

        state = {
            characters: [],
        }

        getCharactersFromPage = async () => {
            const response = await fetch(`${this.baseUrl}/1,2,3,4,5`);
            const data = await response.json();
            return data;
        }

        componentDidMount() {
            this._isMounted = true;
            this.getCharactersFromPage().then(data => {
                if (this._isMounted) {
                    this.setState({ characters: [...data] });
                }
            }).catch(error => console.log(error));
        }

        componentWillUnmount() {
            this._isMounted = false;
        }
        render() {
            return (<>
                <WrappedComponent {...props} characters={this.state.characters} />
            </>);
        }
    }

    return Characters;
}

export default WithCharacters;