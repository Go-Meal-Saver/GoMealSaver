// /utils/convertToObject.js
export function convertToObjectCheckout(doc) {
  // Convert MongoDB document to plain object
  const plainObject = JSON.parse(JSON.stringify(doc));

  // Handle any Buffer objects recursively
  const processBuffers = (obj) => {
    for (let key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        if (obj[key].type === 'Buffer') {
          // Convert Buffer to string or remove it
          delete obj[key];
        } else {
          processBuffers(obj[key]);
        }
      }
    }
    return obj;
  };

  return processBuffers(plainObject);
}
