export default function reduceProps(props, keys) {
  if (!props) {
    return {};
  }

  if (!keys || (Array.isArray(keys) && !keys.length)) {
    return props;
  } else if (!Array.isArray(keys)) {
    keys = [keys];
  }

  return Object.keys(props).filter(key => keys.indexOf(key) === -1).reduce((newProps, key) => {
    newProps[key] = props[key];

    return newProps;
  }, {});
}
