import shallowEqual from 'shallowequal';
import { connectAdvanced } from 'react-redux';

import AppFooter from 'components/AppFooter';

export default connectAdvanced(() => {
  let result;

  return ({ ui: { quickNavigation, drawer: { mobile } } }, props) => {
    const nextResult = { ...quickNavigation, mobile, ...props };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(AppFooter);
