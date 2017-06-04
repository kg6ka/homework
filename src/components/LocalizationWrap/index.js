import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentLocalization } from '../../utils/endpoints/localizationApi';
import { handleErrors } from '../../utils/handleErrors';

import * as LocalizationActions from '../../actions/LocalizationAction';

const { node } = PropTypes;

class LocalizationComponent extends Component {
    componentWillMount() {
        this.checkLocalization()
    }

    checkLocalization() {
        this.props.localizationActions.localization_request();

        const localization = JSON.parse(localStorage.getItem('localization'));
        if (localization) {
            this.props.localizationActions.localization_success(localization);
        } else {
            // GET default localization from server
          getCurrentLocalization()
            .then(handleErrors)
            .then(response => {
                localStorage.setItem('localization', JSON.stringify(response.data));
                this.props.localizationActions.localization_success(response.data)
            })
            .catch(() => {
              this.props.localizationActions.localization_fail();
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
      localizationActions: bindActionCreators(LocalizationActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalizationComponent)