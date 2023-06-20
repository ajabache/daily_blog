fetch("blogs.json")
    .then(response => response.json())
    .then(data => {

        const titleArea = document.getElementById('title');
        const authorArea = document.getElementById('author');
        const blogContent = document.getElementById('blogContent');
        const author = data.blog.author + "'s Blogs";
        const title = data.blog.author + "'s Blogs";
        const posts = data.blog.posts;

        authorArea.textContent = author;
        titleArea.textContent = title;

        posts.forEach(post => {
            const { title, date, content } = post;

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

            const contentElement = document.createElement('div');
            contentElement.className = 'prose';
            contentElement.innerHTML = content;
            postElement.appendChild(contentElement);

            blogContent.appendChild(postElement);
        });
    })
    .catch(error => console.error(error));