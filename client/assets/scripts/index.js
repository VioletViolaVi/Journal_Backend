const thumbsUpCount = 0;
const heartCount = 0;
const dislikeCount = 0;

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const value = Object.fromEntries(data.entries());

  const results = document.getElementById("results");
  results.innerText = JSON.stringify(value, null, 2);

  console.log({ value });
  console.log({ value }.value);
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
