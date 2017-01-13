import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import shallowEqual from 'shallowequal';
import { connectAdvanced } from 'react-redux';

import { showSearch, hideSearch, search, searchNext } from 'actions/search';
import Search from 'components/Search';

@connectAdvanced(dispatch => {
  let result;
  const actions = bindActionCreators({ search, searchNext, showSearch, hideSearch }, dispatch);

  return ({ search }, props) => {
    const nextResult = { ...search, ...actions, ...props };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})
export default class SearchContainer extends PureComponent {
  static propTypes = Search.propTypes;

  render() {
    return <Search {...this.props} />;
  }
}
