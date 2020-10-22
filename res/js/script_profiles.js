$(function () {
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