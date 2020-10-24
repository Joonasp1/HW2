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


    loadProfiles()
        .then(function (profilesResponse) {
            console.log(profilesResponse);
            profiles = profilesResponse;
            displayProfiles(profiles);
        })
        .catch(function () {
            alert('Error loading profiles info')
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

function loadProfiles() {
    return $.get(
        {
            url: 'https://private-anon-68a469624e-wad20postit.apiary-mock.com/profiles',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('error')
            }
        }
    );
}

function displayProfiles(profiles) {
    for (let i = 0; i < profiles.length; i++) {
        let addBody = (`
        <div class="profile">
            <div class="profile-cropper">
                <img src=${profiles[i].avatar}>
            </div>
            <br>
            <b>${profiles[i].firstname} ${profiles[i].lastname}</b>
            <br><br>
            <button type="button" name="follow" class="follow-button" id="like-button">Follow</button>
        </div>
        `);

        $('.main-container').append(addBody)
    }
}


function displayUserInfo(user) {
    $('#drop-down #name').text(user.firstname + " " + user.lastname);
    $('#drop-down #email').text(user.email);
    $("#avatar").attr("src",user.avatar);
}