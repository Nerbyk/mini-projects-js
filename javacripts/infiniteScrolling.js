const postsElement = document.getElementById("posts")
const loading = document.querySelector('.loader')
const form = document.getElementById('filter')

let limit = 5;
let page = 1;

function generateParagraph(post) {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h3 class="post-title">${post.title}</h3>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    postsElement.appendChild(postEl);
}

// imitation of request on DB & response
async function getPosts() {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    let data = await response.json()

    return data;
};

async function showPosts() {
    let posts = await getPosts();
    posts.forEach(post => {
        generateParagraph(post)
    })
}

function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post')

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 300)
    }, 1000)
}

showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
})

form.addEventListener('input', filterPosts)