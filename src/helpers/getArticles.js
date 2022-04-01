
export const getArticles = async(filter = '') => {
  // const resp = await fetch(`http://localhost:8000/api/everything?filter=${encodeURI(filter)}`);
  const resp = await fetch(`https://www.breakingbadapi.com/api/quotes`);
  const data = await resp.json();
  return data;
}
