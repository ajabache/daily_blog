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

        const folderUrl = blog.img_path;
        console.error(folderUrl);
        const xhr = new XMLHttpRequest();
        xhr.open("GET", folderUrl);
        xhr.onload = () => {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(xhr.responseText, "text/html");
          const imageLinks = Array.from(
            htmlDoc.querySelectorAll(
              'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]'
            )
          ).map((link) => {
            const folderName = folderUrl.split(",").pop();
            return `${folderName}${link.href.split("/").pop()}`;
          });

          if (imageLinks.length > 0) {
            const extraImage = document.querySelector(".extraImage");
            extraImage.remove();
            document
              .getElementById("animation-carousel")
              .classList.remove("hidden");
            const container = document.getElementById("imgContainer");

            imageLinks.forEach((src) => {
              const div = document.createElement("div");
              div.classList.add("hidden", "duration-200", "ease-linear");
              div.setAttribute("data-carousel-item", "");

              const img = document.createElement("img");
              img.classList.add(
                "absolute",
                "block",
                "w-full",
                "-translate-x-1/2",
                "-translate-y-1/2",
                "top-1/2",
                "left-1/2"
              );

              img.alt = "...";
              img.src = 'https://media.sproutsocial.com/uploads/meme-example.jpg';

              div.appendChild(img);
              container.appendChild(div);
            });
          } else {
            document
              .getElementById("animation-carousel")
              .classList.add("hidden");
          }
        };
        xhr.send();
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
