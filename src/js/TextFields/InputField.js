import { PureComponent, PropTypes, createElement } from 'react';
import cn from 'classnames';

import reduceProps from '../utils/reduceProps';
import TextArea from './TextArea';

const REMOVED_KEYS = ['maxRows', 'onHeightChange'];

/**
 * This component either renders a base `input` tag or the `TextArea` component.
 */
export default class InputField extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    rows: PropTypes.number,
    maxRows: PropTypes.number,
    label: PropTypes.string,
    fullWidth: PropTypes.bool,
    customSize: PropTypes.string,
    passwordVisible: PropTypes.bool,
    inlineIndicator: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.getValue = this.getValue.bind(this);
    this.getField = this.getField.bind(this);
    this.focus = this.focus.bind(this);
    this._setField = this._setField.bind(this);
  }

  getField() {
    return typeof this.props.rows === 'undefined'
      ? this._field
      : this._field.getField();
  }

  getValue() {
    if (typeof this.props.rows === 'undefined') {
      return this._field.value;
    }

    return this._field.getValue();
  }

  focus() {
    this._field.focus();
  }

  _setField(field) {
    this._field = field;
  }

  render() {
    const {
      className,
      rows,
      label,
      customSize,
      fullWidth,
      type,
      passwordVisible,
      block,
      inlineIndicator,
      ...remaining
    } = this.props;

    const multiline = typeof rows !== 'undefined';
    const Component = multiline ? TextArea : 'input';
    const props = reduceProps(remaining, multiline ? null : REMOVED_KEYS);
    if (!multiline) {
      props.type = passwordVisible ? 'text' : type;
    } else {
      props.label = label;
      props.block = block;
    }

    return createElement(Component, {
      ...props,
      rows,
      ref: this._setField,
      className: cn('md-text-field', {
        'md-text': !props.disabled,
        'md-text--disabled': props.disabled,
        'md-text-field--inline-indicator': inlineIndicator || (!multiline && type === 'password'),
        'md-text-field--multiline': multiline,
        'md-full-width': fullWidth,
        'md-text-field--margin': !block && !multiline && !label,
        'md-text-field--floating-margin': !block && !multiline && label,
        [`md-text-field--${customSize}`]: customSize,
      }, className),
    });
  }
}
