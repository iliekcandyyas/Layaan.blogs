/*************** FIREBASE SETUP (TOP OF FILE) ***************/
const firebaseConfig = {
  apiKey: "AIzaSyDtXJPC8kFLQ--LcRNAQ_FeIdJRsSnkVj0",
  authDomain: "layaan-blogs.firebaseapp.com",
  projectId: "layaan-blogs",
  storageBucket: "layaan-blogs.firebasestorage.app",
  messagingSenderId: "873328011340",
  appId: "1:873328011340:web:aae62fc25f217d60726ce9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/*************** ADMIN MODE ***************/
const PASSWORD = "layan123";
let clickCount = 0;
let isAdmin = false;

const title = document.getElementById("secretTitle");
const adminPanel = document.getElementById("adminPanel");
const postsContainer = document.getElementById("posts");

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

/*************** LOAD POSTS (FROM FIREBASE) ***************/
async function loadPosts() {
  postsContainer.innerHTML = "";

  const snapshot = await db
    .collection("posts")
    .orderBy("created", "desc")
    .get();

  snapshot.forEach(doc => {
    const post = doc.data();
    const article = document.createElement("article");
    article.className = "post";

    article.innerHTML = `
      <h2>${post.title}</h2>
      <p class="date">${new Date(post.created.seconds * 1000).toDateString()}</p>
      ${post.image ? `<img src="${post.image}">` : ""}
      <p>${post.content}</p>
      ${isAdmin ? `<button onclick="deletePost('${doc.id}')">Delete</button>` : ""}
    `;

    postsContainer.appendChild(article);
  });
}

/*************** ADD POST (FIREBASE) ***************/
async function addPost() {
  const titleInput = document.getElementById("postTitle");
  const contentInput = document.getElementById("postContent");
  const imageInput = document.getElementById("imageUrl");

  if (!titleInput.value || !contentInput.value) {
    alert("Title and content required!");
    return;
  }

  await db.collection("posts").add({
    title: titleInput.value,
    content: contentInput.value,
    image: imageInput.value,
    created: firebase.firestore.FieldValue.serverTimestamp()
  });

  titleInput.value = "";
  contentInput.value = "";
  imageInput.value = "";

  await addDoc(collection(db, "posts"), {
  title,
  content,
  image,
  date: new Date().toDateString(),
  likes: 0
  });
  loadPosts();
}

/*************** DELETE POST ***************/
async function deletePost(id) {
  if (!confirm("Delete this post?")) return;

  await db.collection("posts").doc(id).delete();
  loadPosts();
}

/*************** LOAD ON PAGE START ***************/
loadPosts();

/*************** BUBBLES + SOUNDS ***************/
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

import { doc, updateDoc, increment } from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

async function likePost(postId) {
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    likes: increment(1)
  });
}


