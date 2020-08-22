export function findTags(text) {
  let tags = [];
  let substr = text;
  while (substr) {
    const start = substr.indexOf("[");
    const end = substr.indexOf("]");

    if (end > start && start !== -1) {
      tags.push(substr.slice(start + 1, end));
      substr = substr.slice(end + 1);
    } else {
      substr = "";
    }
  }
  return tags;
}

export function removeTags(text, tags) {
  let noTags = text;
  if (tags.length) {
    tags.forEach((tag) => {
      const tagStr = "[" + tag + "]";
      noTags = noTags.replace(tagStr, "");
    });
  }
  return noTags.trim();
}
