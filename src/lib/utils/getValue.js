/**
 * get object value
 * @param {Object | Array} form 
 * @param  {...any} selectors 
 * @returns 
 */
function getValue(form, ...selectors) {
  const res = selectors.map(s => {
    return s
      .replace(/\[(\w+)\]/g, '.$1')
      .split('.')
      .reduce((prev, cur) => {
        return prev && prev[cur];
      }, form);
  })
  return res;
}

export {
  getValue
}