export function newsRequest(type) {
  const url = `https://newsapi.org/v2/top-headlines?category=${type}&pageSize=50&apiKey=b7c3f0f6c0af4deba6fe7141ab9c97e9`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        resolve(response.json());
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function topNewsRequest() {
  const url =
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=b7c3f0f6c0af4deba6fe7141ab9c97e9';
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        resolve(response.json());
      })
      .catch(err => {
        reject(err);
      });
  });
}
