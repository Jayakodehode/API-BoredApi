/* this function is for BoredAPI*/
function getIdea() {
  fetch("https://apis.scrimba.com/bored/api/activity")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const activity = data.activity;
      console.log(activity);
      const idea = document.getElementById("idea");
      idea.textContent = activity;
    });
}

let slicedData = [];
function createAndUpdate() {
  slicedData.forEach((post) => {
    const blogSpace = document.getElementsByClassName("blogspace")[0]; // Assuming you have a single element with the class "blogspace"

    const blogTitle = document.createElement("h2");
    blogTitle.textContent = post.title;

    const blogBody = document.createElement("p");
    blogBody.textContent = post.body;

    // Append the title and body to the blog space
    blogSpace.appendChild(blogTitle);
    blogSpace.appendChild(blogBody);
  });
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    slicedData = data.slice(0, 5);

    createAndUpdate();
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

/* taking input data posting it to the api*/
document.getElementById("new-post").addEventListener("submit", function (e) {
  e.preventDefault();

  const inputTitle = document.getElementById("input-title").value;
  const inputBody = document.getElementById("input-body").value;

  const postData = {
    title: inputTitle,
    body: inputBody,
  };
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      slicedData.unshift(data);
      createAndUpdate(data);
    });
});
