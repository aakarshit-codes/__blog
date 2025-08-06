import { getUser } from "./util.js";

const postContainer = document.getElementById("post-content");
const commentSection = document.getElementById("comment-section");
const commentForm = document.getElementById("comment-form");
const commentText = document.getElementById("comment-text");
const commentList = document.getElementById("comment-list");

const getPostIdFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
};

const renderPost = async (id) => {
  try {
    const response = await fetch("./data/posts.json");
    const posts = await response.json();
    const post = posts.find(p => p.id === parseInt(id));

    if (!post) {
      postContainer.innerHTML = "<p class='text-red-500'>Post not found.</p>";
      return;
    }

    postContainer.innerHTML = `
    <article class="bg-white shadow-md rounded-lg overflow-hidden p-6">
      <h1 class="text-3xl font-bold mb-2">${post.title}</h1>
      <p class="text-sm text-gray-500 mb-4">${post.date}</p>
      <img src="${post.image}" class="w-full h-64 object-cover rounded mb-6" />
      <p class="text-gray-700 text-lg leading-relaxed">${post.content}</p>
    </article>
`;

    const user = getUser();
    if (user) {
      commentSection.classList.remove("hidden");
      loadComments(id);
    }

  } catch (error) {
    postContainer.innerHTML = "<p class='text-red-500'>Error loading post.</p>";
  }
}

const loadComments = (postId) => {
  const key = `comments_post_${postId}`;
  const comments = JSON.parse(localStorage.getItem(key)) || [];
  const currentUser = getUser();

  commentList.innerHTML = comments.map((c, index) => {
    const isUser = c.username === currentUser;
    return `
      <div class="bg-white p-4 shadow rounded border ${isUser ? 'border-blue-500' : 'border-transparent'}">
        <p class="text-sm text-gray-600 mb-1">
          <span class="${isUser ? 'font-semibold text-blue-600' : ''}">${c.username}</span>
          • <span class="text-xs">${c.time}</span>
        </p>
        <p class="text-gray-800">${c.text}</p>
        ${isUser
        ? `<button onclick="deleteComment(${index})" class="mt-2 text-red-500 text-xs hover:underline">Delete</button>`
        : ""}
      </div>
    `;
  }).join("");
};


window.deleteComment = (index) => {
  const postId = getPostIdFromURL();
  const key = `comments_post_${postId}`;
  let comments = JSON.parse(localStorage.getItem(key)) || [];

  if (confirm("Are you sure you want to delete this comment?")) {
    comments.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(comments));
    loadComments(postId);
  }
};

const handleCommentSubmit = (event) => {
  event.preventDefault();
  const text = commentText.value.trim();
  const user = getUser();
  const postId = getPostIdFromURL();

  if (!text) return;

  const newComment = {
    username: user,
    text,
    time: new Date().toLocaleString(),
  };

  const key = `comments_post_${postId}`;
  const existing = JSON.parse(localStorage.getItem(key)) || [];
  existing.push(newComment);
  localStorage.setItem(key, JSON.stringify(existing));

  commentText.value = "";
  loadComments(postId);
}

// init
const postId = getPostIdFromURL();
if (postId) {
  renderPost(postId);
  commentForm?.addEventListener("submit", handleCommentSubmit);
} else {
  postContainer.innerHTML = "<p class='text-red-500'>No post selected.</p>";
}