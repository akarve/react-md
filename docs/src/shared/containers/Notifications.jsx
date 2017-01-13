import React, { PureComponent, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import Snackbar from 'react-md/lib/Snackbars';
import { dismissNotification } from 'actions/notifications';

@connectAdvanced(dispatch => {
  let result;
  const actions = bindActionCreators({ onDismiss: dismissNotification }, dispatch);

  return ({ notifications }, props) => {
    const nextResult = { toasts: notifications, ...actions, ...props };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})
export default class Notifications extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    toasts: Snackbar.propTypes.toasts,
    onDismiss: PropTypes.func.isRequired,
  };

  render() {
    return <Snackbar {...this.props} />;
  }
}
