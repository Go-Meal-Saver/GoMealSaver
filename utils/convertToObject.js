export function convertToSerializedObject(leanDocument) {
  if (!leanDocument) {
    return leanDocument;
  }

  for (const key of Object.keys(leanDocument)) {
    if (
      leanDocument[key] &&
      typeof leanDocument[key].toJSON === 'function' &&
      typeof leanDocument[key].toString === 'function'
    ) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }
  return leanDocument;
}
