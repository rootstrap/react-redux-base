export default () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('fake username'), 2000);
  });
};
