const thumbsUpCount = 0;
const heartCount = 0;
const dislikeCount = 0;

function handleSubmit(e) {
  e.preventDefault();

  // using FormData API
  const data = new FormData(e.target);

  // gets entered values from inputs (textarea)
  const allInputValues = Object.fromEntries(data.entries());

  // gets entered values from radio btns
  allInputValues.emojis = data.getAll("emojis");

  const results = document.getElementById("results");
  results.innerText = JSON.stringify(allInputValues, null, 2);

  console.log(allInputValues);
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
