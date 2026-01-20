// 🔹 IMPORTS (TOP ONLY)
import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  increment,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot
} from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


// 🔹 FIREBASE SETUP
const firebaseConfig = {
  apiKey: "AIzaSyDtXJPC8kFLQ--LcRNAQ_FeIdJRsSnkVj0",
  authDomain: "layaan-blogs.firebaseapp.com",
  projectId: "layaan-blogs",
  storageBucket: "layaan-blogs.firebasestorage.app",
  messagingSenderId: "873328011340",
  appId: "1:873328011340:web:aae62fc25f217d60726ce9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 ADMIN MODE
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

// 🔹 LOAD POSTS
function loadPosts() {
  const q = query(
    collection(db, "posts"),
    orderBy("created", "desc")
  );

  onSnapshot(q, (snapshot) => {
    postsContainer.innerHTML = "";

    snapshot.forEach((docSnap) => {
      const post = docSnap.data();

      const article = document.createElement("article");
      article.className = "post";

      article.innerHTML = `
        <h2>${post.title}</h2>
        <p class="date">${post.created?.toDate().toDateString() || ""}</p>
        ${post.image ? `<img src="${post.image}">` : ""}
        <p>${post.content}</p>

        <button onclick="likePost('${docSnap.id}')">
          💗 ${post.likes || 0}
        </button>

        ${isAdmin ? `<button onclick="deletePost('${docSnap.id}')">Delete</button>` : ""}
      `;

      postsContainer.appendChild(article);
    });
  });
}


// 🔹 ADD POST
window.addPost = async function () {
  const titleInput = document.getElementById("postTitle");
  const contentInput = document.getElementById("postContent");
  const imageInput = document.getElementById("imageUrl");

  if (!titleInput.value || !contentInput.value) {
    alert("Title and content required!");
    return;
  }

  await addDoc(collection(db, "posts"), {
    title: titleInput.value,
    content: contentInput.value,
    image: imageInput.value,
    created: serverTimestamp(),
    likes: 0
  });

  titleInput.value = "";
  contentInput.value = "";
  imageInput.value = "";

  loadPosts();
};

// 🔹 DELETE POST
window.deletePost = async function (id) {
  if (!confirm("Delete this post?")) return;

  await deleteDoc(doc(db, "posts", id));
  loadPosts();
};

// 🔹 LIKE POST
window.likePost = async function (id) {
  const ref = doc(db, "posts", id);
  await updateDoc(ref, {
    likes: increment(1)
  });
};

// 🔹 LOAD ON START
loadPosts();

// 🔹 BUBBLES + SOUNDS
const sounds = {
  pop: new Audio("pop.mp3"),
  fahh: new Audio("fahh.mp3")
};

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





