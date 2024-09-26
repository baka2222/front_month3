const postsBlock = document.querySelector('.posts > .container');

const getData = async () => {
    try {
        const request = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await request.json();

        data.forEach((post) => {
            postsBlock.innerHTML += `
                <div class="block">
                    <span>${post.id}</span>
                    <span>${post.title}</span>
                    <span>${post.body}</span>
                </div>
            `;
        });
    } catch (e) {
        console.log(e);
    }
}

getData();
