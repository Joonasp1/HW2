$(document).ready(function(){
    $('body').on('click', '#like-button', function () {

        if($(this).hasClass('liked')){
            $(this).removeClass('liked')
        }
        else{
            $(this).addClass('liked')
        }
    
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
        let addBody = (`<div class="post">
        <div class="post-author">
        <span class="post-author-info">
        <img src=${posts[i].author.avatar} alt="Post author">
        <small>${posts[i].author.firstname} ${posts[i].author.lastname}</small>
        </span>
        <small>${posts[i].createTime}</small>
        </div>
        `);
        if(posts[i].media != null){

            if(posts[i].media.type == "image"){
                addBody += (`
            <div class="post-image">
            <img src=${posts[i].media.url} alt="">
            </div>
            `)
            }
            else{
                addBody += (`
            <video controls>
            <source src=${posts[i].media.url} type="video/mp4">
            </video>
            `)
            }

        }
        if(posts[i].text != null){
            addBody += (`
            <div class="post-title">
            <h3>${posts[i].text}</h3>
            </div>
            `)
        }
        else {
            addBody += (`
            <div class="post-title">
            </div>
            `)
        }
        addBody += (`
            <div class="post-actions">
            <button type="button" name="like" class="like-button" id="like-button">${posts[i].likes}</button>
            </div>
            </div>
            `)
        $('.main-container').append(addBody)
        console.log(addBody)
    }
}

function displayUserInfo(user) {
    $('#drop-down #name').text(user.firstname + " " + user.lastname);
    $('#drop-down #email').text(user.email);
    $("#avatar").attr("src",user.avatar);
}