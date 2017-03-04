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
    render() {
        return (
            <section className="animated fadeInDown col-md-12">
                <div className="wrapper border-bottom white-bg page-heading">
                    <div className="ibox-title">
                        <h2>Promo</h2>
                    </div>
                    <div className="ibox-content" id="program-page">
                        <div className="tabs-container">
                        </div>
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