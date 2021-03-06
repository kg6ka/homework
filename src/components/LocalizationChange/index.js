import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../utils/endpoints/localizationApi';
import { handleErrors } from '../../utils/handleErrors';
import * as LocalizationActions from '../../actions/LocalizationAction';

class LocalizationChangeComponent extends Component {

    changeLocalization(lang) {
        console.log(lang);
        getCurrentUser(lang)
                .then(handleErrors)
                .then(localization => {
                    localStorage.setItem('localization', JSON.stringify(localization.data));
                    this.props.actions.localization_set(localization.data)
                })
                .catch(error => {
                    console.log(error.message);
                    //TODO - create default localzation object and save it when connection problems
                });
    }

    render() {
        const { className } = this.props;
        //change arg to real constatns with lang path
        return (
            <div className="btn-group" role="group">
                <button className={className}
                    type='button'
                    onClick={::this.changeLocalization.bind(this, 'eng')}>
                    {this.props.localization.LOCALIZATION.eng}
                </button>
                <button className={className}
                    type='button'
                    onClick={::this.changeLocalization.bind(this, 'rus')}>
                    {this.props.localization.LOCALIZATION.rus}
                </button>
                <button className={className}
                    type='button'
                    onClick={::this.changeLocalization.bind(this, 'tr')}>
                    {this.props.localization.LOCALIZATION.tr}
                </button>
            </div>
        )
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(LocalizationChangeComponent)