// INTERFACE
const postsContainer = document.getElementById("posts-container");
const loader = document.getElementById("loader");
const filter = document.getElementById("filter");



// GLOBAL
let limit = 3;
let page = 1;



// FUNCTIONS

// Fetch posts from API
async function fetchPosts() {
    // fetch
    const response = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    // get data
    const data = await response.json();
    // return
    return data;
}

// Display posts
async function displayPosts() {
    // get posts
    const posts = await fetchPosts();
    // loop
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Load more posts
function loadMorePosts() {
    // show loader
    loader.classList.add("show");
    // hide loader adter 1 second
    setTimeout(() => {
        // remove class
        loader.classList.remove("show");
        // display more posts
        setTimeout(() => {
            page++;
            displayPosts();
        }, 300);
    }, 1000);
}

// Filter posts
function filterPosts(eventObject) {
    // get search term
    const term = eventObject.target.value.toUpperCase();
    // get posts
    const posts = document.querySelectorAll(".post");
    // loop
    posts.forEach(post => {
        // get title and body
        const title = post.querySelector(".post-title").innerText.toUpperCase();
        const body = post.querySelector(".post-body").innerText.toUpperCase();
        // if found
        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            // show
            post.style.display = "flex";
        } else {
            post.style.display = "none";
        }
    });
}



// EVENT LISTENERS

// Scroll
window.addEventListener("scroll", () => {
    // get scroll values
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // check for scrolling to bottom
    if (window.innerHeight + Math.ceil(window.scrollY) === document.body.clientHeight) {
        loadMorePosts();
    }
});

// Filter
filter.addEventListener("input", filterPosts);



// CALLS
displayPosts();
