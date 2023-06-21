function fetchPosts() {
  const blogContent = document.getElementById("blogContent");

  fetch("blogs.json")
    .then((response) => response.json())
    .then((data) => {
      const { author, title, posts } = data.blog;
      const postTemplate = document.getElementById("blogPost");
      const titleArea = document.getElementById("title");
      titleArea.textContent = title;

      posts.forEach((post) => {
        const { id, title, date, content } = post;

        if (postTemplate) {
          const postElement = postTemplate.content.cloneNode(true);

          const titleElement = postElement.querySelector(
            ".post div:nth-child(1)"
          );
          const dateElement = postElement.querySelector(
            ".post div:nth-child(2)"
          );
          const contentElement = postElement.querySelector(".post button");

          titleElement.textContent = title;
          dateElement.textContent = date;

          if (content) {
            contentElement.innerHTML = content;
          } else {
            contentElement.remove();
          }

          const readMoreButton = postElement.querySelector(".post button");
          readMoreButton.addEventListener("click", () => {
            const authorArray = author.split(" ");
            window.location.href = `/pages/${authorArray[0].toLowerCase()}/post.html?id=${id}`;
          });

          blogContent.appendChild(postElement);
        }
      });
    })
    .catch((error) => console.error(error));
}

function fetchBlogPost() {
  const titleArea = document.getElementById("title");

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
        const authorArray = author.split(" ");
        window.location.href = `/pages/${authorArray[0].toLowerCase()}`;
      }

      const profileImgElement = document.getElementById("profileImg");
      profileImgElement.src = profileImg;
      profileImgElement.alt = author;
    })
    .catch((error) => console.error(error));
}

if (
  window.location.href.includes("joemar") ||
  window.location.href.includes("adrian")
) {
  document.addEventListener("DOMContentLoaded", fetchPosts);
}

if (window.location.href.includes("post")) {
  document.addEventListener("DOMContentLoaded", fetchBlogPost);
}
