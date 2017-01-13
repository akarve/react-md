import { PropTypes } from 'react';
import headerContextTypes from './headerContextTypes';
import reduceProps from '../utils/reduceProps';

const rowContextTypes = reduceProps(Object.assign({}, headerContextTypes, {
  rowId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}), 'baseId');

export default rowContextTypes;
