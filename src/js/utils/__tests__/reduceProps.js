/* eslint-env jest */
jest.unmock('../reduceProps');

import reduceProps from '../reduceProps';

const PROPS = {
  value: 'Hello',
  onClick: jest.fn(),
  woop: 'woop',
};

describe('reduceProps', () => {
  it('returns an empty object if props is falseish', () => {
    expect(reduceProps(undefined, [])).toEqual({});
    expect(reduceProps(null, [])).toEqual({});
    expect(reduceProps(false, [])).toEqual({});
  });

  it('creates a new object from the props object that only contains keys not provided', () => {
    const props = Object.assign({}, PROPS);
    const reduced = reduceProps(props, []);
    expect(reduced).toEqual(PROPS);
    expect(props).toEqual(PROPS);
  });

  it('returns a new object with the original values', () => {
    const props = Object.assign({}, PROPS);
    let reduced = reduceProps(props, ['value']);

    expect(reduced.value).toBeUndefined();
    expect(reduced.onClick).toBe(PROPS.onClick);
    expect(reduced.woop).toBe(PROPS.woop);

    reduced = reduceProps(props, ['onClick', 'woop']);

    expect(reduced.value).toBe(PROPS.value);
    expect(reduced.onClick).toBeUndefined();
    expect(reduced.woop).toBeUndefined();
  });

  it('allows for keys to be a single string', () => {
    const reduced = reduceProps(PROPS, 'value');
    expect(reduced.value).toBeUndefined();
    expect(reduced.onClick).toBe(PROPS.onClick);
    expect(reduced.woop).toBe(PROPS.woop);
  });

  it('returns the unmodified props if there are no keys', () => {
    const reduced = reduceProps(PROPS, undefined);
    expect(reduced).toEqual(PROPS);
  });
});
