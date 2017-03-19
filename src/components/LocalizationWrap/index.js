import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../utils/endpoints/localizationApi';
import { handleErrors } from '../../utils/handleErrors';
import * as LocalizationActions from '../../actions/LocalizationAction';
const { node } = PropTypes;

class LocalizationComponent extends Component {
    componentWillMount() {
        this.checkLocalization()
    }

    checkLocalization() {
        let localization = JSON.parse(localStorage.getItem('localization'));
        if (localization) {
            this.props.actions.localization_success(localization);
        } else {
            // GET default localization from server
            getCurrentUser()
                .then(handleErrors)
                .then(localization => {
                    localStorage.setItem('localization', JSON.stringify(localization.data));
                    this.props.actions.localization_success(localization.data)
                })
                .catch(error => {
                    console.log(error.message);
                    //TODO - create default localzation object and save it when connection problems
                });
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

const mapStateToProps = (state) => {
    return {
        localization: state.localization
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(LocalizationActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalizationComponent)