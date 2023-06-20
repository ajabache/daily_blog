fetch("blogs.json")
    .then(response => response.json())
    .then(data => {

        const titleArea = document.getElementById('title');
        const authorArea = document.getElementById('author');
        const blogContent = document.getElementById('blogContent');
        const author = data.blog.author;
        const title = data.blog.author;
        const posts = data.blog.posts;

        authorArea.textContent = author + "'s Blogs";
        titleArea.textContent = title  + "'s Blogs";

        posts.forEach(post => {
            const { id, title, date, content } = post;

            const postElement = document.createElement('div');
            postElement.className = 'post';

            const titleElement = document.createElement('div');
            titleElement.className = 'text-2xl font-bold text-gray-800';
            titleElement.textContent = title;
            postElement.appendChild(titleElement);

            const dateElement = document.createElement('div');
            dateElement.className = 'date';
            dateElement.textContent = date;
            postElement.appendChild(dateElement);

            const contentElement = document.createElement('button');
            contentElement.className = 'prose';
            contentElement.innerHTML = content;
            contentElement.addEventListener('click', () => {
                window.location.href = `/pages/${author.toLowerCase()}/post.html?id=${id}`;
            });
            postElement.appendChild(contentElement);

            blogContent.appendChild(postElement);
        });
    })
    .catch(error => console.error(error));