export function analyzeTitle(title: string, keyword = '') {
  if (!title.trim()) throw new Error('Enter a title to check.');
  if (title.length > 2000) throw new Error('Keep your draft under 2,000 character units.');
  const length = title.length; const letters = [...title].filter((char) => /\p{L}/u.test(char) && char.toUpperCase() !== char.toLowerCase());
  const uppercase = letters.filter((char) => char === char.toUpperCase()).length;
  const notes: string[] = [];
  if (length > 100) notes.push('Over 100 character units. Shorten the title before uploading.');
  if (title !== title.trim() || /\s{2,}/u.test(title)) notes.push('Extra whitespace detected. Trim the ends and review repeated spaces.');
  if (/[!?]{2,}/u.test(title)) notes.push('Repeated exclamation or question marks detected. Consider simplifying punctuation.');
  if (letters.length >= 8 && uppercase / letters.length > .6) notes.push('Most cased letters are uppercase. Review whether the emphasis helps readability.');
  if (/[<>]/u.test(title)) notes.push('Angle brackets detected. Review these characters in YouTube Studio before publishing.');
  const phrase = keyword.trim(); const position = phrase ? title.toLocaleLowerCase().indexOf(phrase.toLocaleLowerCase()) : -1;
  if (phrase) notes.push(position < 0 ? 'The exact topic phrase was not found (case-insensitive). Synonyms are not checked.' : `The exact topic phrase begins at character unit ${position + 1}. Check that the wording reads naturally.`);
  if (!notes.length) notes.push('No issues flagged by these basic checks. Review accuracy and relevance yourself.');
  return { length, characters: [...title].length, words: title.trim().split(/\s+/u).length, withinLimit: length <= 100, notes };
}
