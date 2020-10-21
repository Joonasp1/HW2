$(document).ready(function(){
    $('body').on('click', '#like-button', function () {

        console.log("Button pressed!")
    
    });
})

let posts = null;

$(function () {
    $('#avatar').click(function(){
        $("#drop-down").toggle();

    });

    loadUserInfo()
        .then(function (user) {
            displayUserInfo(user)
        })
        .catch(function () {
            alert('Error loading user info')
        });

    loadPosts()
        .then(function (postsResponse) {
            console.log(postsResponse);
            posts = postsResponse;
            displayPosts(posts);
        })
        .catch(function () {
            alert('Error loading posts info')
        });
});

function loadUserInfo() {
    return $.get(
        {
            url: 'https://private-anon-500a36adbe-wad20postit.apiary-mock.com/users/1',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('error')
            }
        }
    );
}

function loadPosts() {
    return $.get(
        {
            url: 'https://private-anon-500a36adbe-wad20postit.apiary-mock.com/posts',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('error')
            }
        }
    );
}

function displayPosts(posts) {
    for (let i = 0; i < posts.length; i++) {

        if(posts[i].media != null){
            if (posts[i].media.type == "image"){
                $('.main-container').append(`
                <div class="post">
                <div class="post-author">
                <span class="post-author-info">
                <img src=${posts[i].author.avatar} alt="Post author">
                <small>${posts[i].author.firstname} ${posts[i].author.lastname}</small>
                </span>
                <small>${posts[i].createTime}</small>
                </div>
                <div class="post-image">
                <img src=${posts[i].media.url} alt="">
                </div>
                <div class="post-title">
                <h3>${posts[i].text}</h3>
                </div>
                <div class="post-actions">
                <button type="button" name="like" class="like-button" id="like-button">${posts[i].likes}</button>
                </div>
                </div>
            `);
            }
            else if (posts[i].media.type == "video"){
                $('.main-container').append(`
                <div class="post">
                <div class="post-author">
                <span class="post-author-info">
                <img src=${posts[i].author.avatar} alt="Post author">
                <small>${posts[i].author.firstname} ${posts[i].author.lastname}</small>
                </span>
                <small>${posts[i].createTime}</small>
                </div>
                <div class="post-image">
                <video controls>
                <source src=${posts[i].media.url} type="video/mp4">
                </video>
                </div>
                <div class="post-title">
                <h3>${posts[i].text}</h3>
                </div>
                <div class="post-actions">
                <button type="button" name="like" class="like-button" id="like-button">${posts[i].likes}</button>
                </div>
                </div>
            `);
            }

        }
        else{
            $('.main-container').append(`
            <div class="post">
            <div class="post-author">
            <span class="post-author-info">
            <img src=${posts[i].author.avatar} alt="Post author">
            <small>${posts[i].author.firstname} ${posts[i].author.lastname}</small>
            </span>
            <small>${posts[i].createTime}</small>
            </div>
            <div class="post-image">
            </div>
            <div class="post-title">
            <h3>${posts[i].text}</h3>
            </div>
            <div class="post-actions">
            <button type="button" name="like" class="like-button" id="like-button">${posts[i].likes}</button>
            </div>
            </div>
            `);
        }
    }
}

function displayUserInfo(user) {
    $('#drop-down #name').text(user.firstname + " " + user.lastname);
    $('#drop-down #email').text(user.email);
    $("#avatar").attr("src",user.avatar);
}