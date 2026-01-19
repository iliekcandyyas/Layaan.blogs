const PASSWORD = "Il0veVaresa";

document.getElementById("secretTitle").onclick = () => {
  const input = prompt("Password?");
  if (input === PASSWORD) {
    document.getElementById("adminPanel").style.display = "block";
    alert("A Layaan detected");
  }
};

function addPost() {
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;
  const image = document.getElementById("imageUrl").value;

  if (!title || !content) return alert("Title & content required!");

  const post = document.createElement("article");
  post.className = "post";

  post.innerHTML = `
    <h2>${title}</h2>
    ${image ? `<img src="${image}" style="max-width:100%; border-radius:10px;">` : ""}
    <p>${content}</p>
  `;

  document.querySelector("main").prepend(post);
}
