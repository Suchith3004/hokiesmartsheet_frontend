import React from "react";

let CONTACTS = [
    {
        id: 1,
        name: 'Natarajah',
        phoneNumber: '0938073320',
        image: 'http://accounts-cdn.9gag.com/media/avatar/14368888_100_1.jpg'
    },
    {
        id: 2,
        name: 'Krot',
        phoneNumber: '0945565655',
        image: 'http://forums.animeboston.com/download/file.php?avatar=11355_1455595397.png'

    },
    {
        id: 3,
        name: 'Mandala',
        phoneNumber: '0975149873',
        image: 'http://avatars-cdn.9gag.com/avatar/erickson8903_14899765_100.jpg'
    },
    {
        id: 4,
        name: 'Shiva',
        phoneNumber: '0638546385',
        image: 'https://38.media.tumblr.com/4249a67e76729e9126ef3f70e741c323/tumblr_inline_mixcyvIPd81qz4rgp.jpg'
    },
    {
        id: 5,
        name: 'Ashvattha',
        phoneNumber: '0506549879',
        image: 'http://supertalk.superfuture.com/uploads/profile/photo-thumb-142296.jpg?_r=1424512169'
    }
]

let Contact = React.createElement({
    render () {
        return (
            <li>
                <img src={this.props.image} alt="img"/>
                <span>{this.props.name}</span>
                <span className="phone">{this.props.phone}</span>
            </li>
        )
    }
})


export default class Column extends React.Component{
    constructor(props) {
        super(props);
        this.state = {displayedContacts: CONTACTS}
    }

    searchHandler (event) {
        let searcjQery = event.target.value.toLowerCase(),
            displayedContacts = CONTACTS.filter((el) => {
                let searchValue = el.name.toLowerCase();
                return searchValue.indexOf(searcjQery) !== -1;
            })
        console.log("here")
        console.log(displayedContacts)
        this.setState({
            displayedContacts: displayedContacts
        })
    }
    render () {
        let contacts = this.state.displayedContacts;
        return (
            <div className="holder">
                <input type="text" classNAme="search" onChange={this.searchHandler}/>
                <ul>
                    {/*{*/}
                    {/*    contacts.map((el) => {*/}
                    {/*        return <Contact key={el.id}*/}
                    {/*                        name={el.name}*/}
                    {/*                        image={el.image}*/}
                    {/*                        phone={el.phoneNumber}*/}
                    {/*        />*/}
                    {/*    })*/}
                    {/*}*/}
                </ul>
            </div>
        )
    }

}
