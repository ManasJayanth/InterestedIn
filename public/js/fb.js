function sendDetails (details) {

    $.ajax({
        type: "POST",
        url: "/authentication",
        data: details,
        success: function () {

            window.location = window.location + 'welcome';
            console.log('Details received'); 
        },
        error: function (err) {
            console.log(err);
        }
    });
    
}
function fbLogin(){
    FB.login(function(response) {

        if (response.authResponse) {
            accessToken = response.authResponse.accessToken; //get access token
            userId = response.authResponse.userID; //get FB UID
            
            sendDetails({
                id: userId,
                accessToken: accessToken
            });

           
        } else {
            //user hit cancel button
            alert('You have cancelled login or did not fully authorize.');
        }
    },{ scope: 'friends_status,user_photos' });
}

function initFbSDK() {

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1541497706075482',
            status     : true, // check login status
            cookie     : true, // enable cookies to allow the server to access the session
            xfbml      : true  // parse XFBML
        });

    };

    // Load the SDK asynchronously
    (function(d){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

}

$(document).ready(function () {

    initFbSDK();

    $('#signin').on('click', fbLogin);
});
