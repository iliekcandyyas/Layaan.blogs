const PASSWORD = "layan123";
let clickCount = 0;
let isAdmin = false;

const title = document.getElementById("secretTitle");
const adminPanel = document.getElementById("adminPanel");
const postsContainer = document.getElementById("posts");

/* ---------------- SECRET ADMIN MODE ---------------- */

title.addEventListener("click", () => {
  clickCount++;
  if (clickCount === 5) {
    const input = prompt("🌸 ARE YOU A COOL PERSON?");
    if (input === PASSWORD) {
      isAdmin = true;
      adminPanel.style.display = "block";
      adminPanel.classList.add("show");
      loadPosts();
      alert("HAII COOL PERSON!! 💖");
    } else {
      alert("SUBU YOU AINT COOL!!");
    }
    clickCount = 0;
  }
});

/* ---------------- POSTS STORAGE ---------------- */

function getPosts() {
  return JSON.parse(localStorage.getItem("posts")) || [];
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}
if (!localStorage.getItem("posts")) {
  savePosts([
    {
      title: "Hello",
      content: "Hai this is Ilan, you will see this when you first open this! you can delete this and add a new post! Bai",
      image: "",
      date: new Date().toDateString()
    }
  ]);
}


/* ---------------- LOAD POSTS ---------------- */

function loadPosts() {
  postsContainer.innerHTML = "";
  const posts = getPosts();

  posts.forEach((post, index) => {
    const article = document.createElement("article");
    article.className = "post";

    article.innerHTML = `
      <h2>${post.title}</h2>
      <p class="date">${post.date}</p>
      ${post.image ? `<img src="${post.image}">` : ""}
      <p>${post.content}</p>
      ${isAdmin ? `<button onclick="deletePost(${index})">Delete</button>` : ""}
    `;

    postsContainer.appendChild(article);
  });
}

/* ---------------- ADD POST ---------------- */

function addPost() {
  const titleInput = document.getElementById("postTitle");
  const contentInput = document.getElementById("postContent");
  const imageInput = document.getElementById("imageUrl");

  if (!titleInput.value || !contentInput.value) {
    alert("Title and content required!");
    return;
  }

  const posts = getPosts();

  posts.unshift({
    title: titleInput.value,
    content: contentInput.value,
    image: imageInput.value,
    date: new Date().toDateString()
  });

  savePosts(posts);
  loadPosts();

  titleInput.value = "";
  contentInput.value = "";
  imageInput.value = "";
}

/* ---------------- DELETE POST ---------------- */

function deletePost(index) {
  if (!confirm("Delete this post?")) return;

  const posts = getPosts();
  posts.splice(index, 1);
  savePosts(posts);
  loadPosts();
}

/* ---------------- LOAD ON PAGE START ---------------- */

loadPosts();

const sounds = {
  pop: new Audio("pop.mp3"),
  fahh: new Audio("fahh.mp3")
};

function playSound(name) {
  if (sounds[name]) {
    sounds[name].pause();
    sounds[name].currentTime = 0;
    sounds[name].play();
  }
}
function createBubble() {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.left = Math.random() * 100 + "vw";
  bubble.style.width = bubble.style.height = Math.random() * 30 + 10 + "px";
  bubble.style.animationDuration = Math.random() * 5 + 8 + "s";

  document.body.appendChild(bubble);

  setTimeout(() => bubble.remove(), 15000);
}

setInterval(createBubble, 800);



