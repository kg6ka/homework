import React, { Component, PropTypes } from 'react';
const { node } = PropTypes;

export default class LocalizationComponent extends Component {
    componentWillMount() {
        this.checkLocalization()
    }

    checkLocalization() {
        let localization = JSON.parse(localStorage.getItem('localization'));
        if (localization) {
            console.log(1);
        } else {
            //TODO fetch localization
            localStorage.setItem('localization', JSON.stringify({}));
        }
    }

    render() {
        let self = this;
        return (
            <div id="wrapper">
                {self.props.children}
            </div>
        )
    }
}

LocalizationComponent.contextTypes = {
    children: node
};

// const mapStateToProps = (state) => {
//     return {
//         user: state.user
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         actions: bindActionCreators(UserActions, dispatch)
//     }
// };

// export default connect(mapStateToProps,mapDispatchToProps)(LocalizationComponent)