export function convertToSerializedObject(leanDocument) {
  if (leanDocument == null) {
    return leanDocument;
  }

  for (const key of Object.keys(leanDocument)) {
    if (
      leanDocument[key] != null &&
      typeof leanDocument[key]?.toJSON === 'function' &&
      typeof leanDocument[key]?.toString === 'function'
    ) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }
  return leanDocument;
}
