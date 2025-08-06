const blogList = document.getElementById("blog-list");

const createPostCards = (post) => {
  return `
    <div class="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden flex flex-col">
      <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover" />
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold mb-1">${post.title}</h3>
          <p class="text-sm text-gray-500 mb-2">${post.date}</p>
          <p class="text-sm text-gray-700 mb-3">${post.summary}</p>
        </div>
        <a href="./post.html?id=${post.id}" class="text-blue-600 font-medium hover:underline mt-auto">Read More →</a>
      </div>
    </div>
  `;
};

const loadPosts = async () => {
  try {
    const response = await fetch("./data/posts.json");
    const posts = await response.json();

    blogList.innerHTML = posts.map(createPostCards).join("");
  } catch (error) {
    blogList.innerHTML = `<p class="text-red-500">Failed to load blog posts.</p>`;
    console.error("Error loading posts:", error);
  } 
};

loadPosts();