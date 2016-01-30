
export default (constants) => {
  Object.keys(constants).map((type) => {
    Object.keys(constants[type]).map((action) => {
      constants[type][action] = `${type}__${action}`;
    });
  });
  return constants;
};
