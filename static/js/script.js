const titleArea = document.getElementById("title");
const authorArea = document.getElementById("author");
const blogContent = document.getElementById("blogContent");

if (window.location.href.includes("joemar") || window.location.href.includes("adrian")) {
  fetch("blogs.json")
    .then((response) => response.json())
    .then((data) => {
      const { author, title, posts } = data.blog;

      authorArea.textContent = author;
      titleArea.textContent = title;

      const postTemplate = document.createElement("template");
      postTemplate.innerHTML = `
        <div class="post">
          <div class="text-2xl font-bold text-gray-800"></div>
          <div class="date"></div>
          <button class="prose"></button>
        </div>
      `;

      posts.forEach((post) => {
        const { id, title, date, content } = post;

        const postElement = postTemplate.content.cloneNode(true);
        const titleElement = postElement.querySelector(".text-2xl");
        const dateElement = postElement.querySelector(".date");
        const contentElement = postElement.querySelector(".prose");

        titleElement.textContent = title;
        dateElement.textContent = date;
        contentElement.innerHTML = content;

        contentElement.addEventListener("click", () => {
          const authorArray = author.split(" ");
          window.location.href = `/pages/${authorArray[0].toLowerCase()}/post.html?id=${id}`;
        });

        blogContent.appendChild(postElement);
      });
    })
    .catch((error) => console.error(error));
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.href.includes("post")) {
    fetch("blogs.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const { posts, author, title, profileImg } = data.blog;
        const urlParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlParams.get("id"));
        const blog = posts.find((blog) => blog.id === id);

        const blogTitle = document.getElementById("blogTitle");
        const blogAuthor = document.getElementById("blogAuthor");
        const blogContent = document.getElementById("blogContent");
        const dateElement = document.querySelector("time");

        if (blog) {
          blogTitle.textContent = blog.title;
          blogAuthor.textContent = author;
          blogContent.innerHTML = blog.content;
          titleArea.textContent = `${title} | ${blogTitle.textContent}`;

          dateElement.textContent = blog.date;
          dateElement.setAttribute("datetime", blog.date);
          dateElement.setAttribute("title", blog.title);
        } else {
          console.error(`Blog post with id ${id} not found`);
        }

        const profileImgElement = document.getElementById("profileImg");
        profileImgElement.src = profileImg;
        profileImgElement.alt = author;
      })
      .catch((error) => console.error(error));
  }
});