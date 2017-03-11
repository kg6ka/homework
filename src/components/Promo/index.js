import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as pageActions from '../actions/PageActions';
// import * as countActions from '../actions/CountActions';

export default class Promo extends Component {
    /*componentWillMount() {
     const { getPhotos } = this.props.pageActions;
     console.log(getPhotos())
     }*/
    componentDidMount() {
    }
    render() {
        return (
            <section className='promo'>
                <header className='sub-header row white-bg'>
                    <div className='col-lg-12'>
                        <h1 className='title pull-left'>Главная</h1>
                    </div>
                </header>
                <div className='wrapper border-bottom white-bg page-heading animated fadeInRight'>
                    <div className='ibox-content' id='program-page'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur consequuntur cum debitis doloremque explicabo facilis id
                        illo itaque laboriosam laborum maiores nemo nesciunt perferendis placeat quam quibusdam rerum, soluta, suscipit vero. Accusamus adipisci
                        aperiam esse eum exercitationem fuga illo iure laborum mollitia officia reiciendis sit, sunt voluptatum? Eius iure non provident quod reprehenderit.
                        Alias aliquam beatae corporis, cum eveniet fuga labore laboriosam, laudantium minus molestiae nihil officia perspiciatis placeat quae quo quod rem,
                        similique sint voluptas voluptate? Accusantium aliquid asperiorescumque dolor error maiores nam nostrum, placeat porro quibusdam quo, quod soluta
                        tempora velit voluptatem! Dolores maxime nihil sint.
                    </div>
                </div>
            </section>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         user: state.user,
//         page: state.page,
//         count: state.count
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         pageActions: bindActionCreators(pageActions, dispatch),
//         countActions: bindActionCreators(countActions, dispatch)
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);