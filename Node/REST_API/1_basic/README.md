## Status Code-
- 200: Susscessful
- 201: Successful and is created the resouce
- 422: Validation failed
- 404: Not Found
- 401: Not authenticated
- 403: Authorization issues

```js
const getButton = document.getElementById('get');
const postButton = document.getElementById('post');

getButton.addEventListener('click', () => {
  fetch('http://localhost:8080/feed/posts')
    .then(res => res.json())
    .then(resData => console.log(resData))
    .catch(err => {console.log(err)});
});

postButton.addEventListener('click', () => {
  fetch('http://localhost:8080/feed/post', {
    method: 'POST',
    body: JSON.stringify({
      title: 'A Codepen Post',
      content: 'Created by codepen'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(resData => console.log(resData))
  .catch(err => {console.log(err)});
});
```