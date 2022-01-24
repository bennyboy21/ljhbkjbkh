const checker = document.getElementById("checker")

var imgURL = "random gmail profile pic.jpg"
var previousName = ""

var myName = "Ben Smith"

const observer = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting == false) {
        document.getElementById("button-Container").classList.add("open")
    } else {
        document.getElementById("button-Container").classList.remove("open")
    }
})
observer.observe(checker)

document.getElementById("profile-Image-Holder").addEventListener("click", function() {
    console.log("Profile Clicked")
}) 

var chats = 1;

document.getElementById("button-One").addEventListener("click", function() {
    if(chats == 0) {
        document.getElementById("group-Chat-Holder").style.display = "none"
        document.getElementById("chat-Icon").style.fill = "rgb(0, 132, 255)"
        document.getElementById("group-Icon").style.fill = "black"
        const chatsPage = document.getElementById("chats-Holder").style
        chatsPage.display = "flex"
        chatsPage.flexDirection = "column"
        const chatbox = document.getElementById("normal-Group-Chats")
        chatbox.scrollTo({ bottom: 0, behavior: 'auto' });
        const chatbox2 = document.getElementById("group-Chat-Holder")
        chatbox2.scrollTo({ bottom: 0, behavior: 'auto'});
        chats = 1;
    }
})

document.getElementById("button-Two").addEventListener("click", function() {
    if(chats == 1) {
        document.getElementById("chats-Holder").style.display = "none"
        document.getElementById("chat-Icon").style.fill = "black"
        document.getElementById("group-Icon").style.fill = "rgb(0, 132, 255)"
        const chatsPage = document.getElementById("group-Chat-Holder").style
        chatsPage.display = "grid"
        chatsPage.flexDirection = "column"
        chats = 0
    }
})


document.getElementById("send-Message-Textbox").addEventListener("keyup", function(){
    const sendTextbox = document.getElementById("send-Message-Textbox").value
    if(sendTextbox != "") {
        document.getElementById("send-Icon").style.fill = "rgb(0, 132, 255)"
    } else {
        document.getElementById("send-Icon").style.fill = "rgb(100, 100, 100)"
    }
})

var typing = 1;

document.getElementById("group-Chat-Holder").addEventListener("click", function() {
    console.log("Click")
    if(typing == 1) {
        document.getElementById("all-Send-Box-Container").style.border = "10px"        
        typing = 0
    }
})

document.getElementById("all-Send-Box-Container").addEventListener("click", function() {
    if(typing == 0) {
        document.getElementById("all-Send-Box-Container").style.border = "3px solid rgb(0, 132, 200)"        
        typing = 1
    }
})






var email;
var name;
var ImageURL;

// var checkUserSignIn = 0;

// setTimeout(function() {
//     if(checkUserSignIn == 0) {
//         window.location = "Welcome Page.html"
//     }
// }, 1000)


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $("#name").text(profile.getName())
    $("#email").text(profile.getEmail())
    document.getElementById("image").setAttribute("src", profile.getImageUrl())
    checkUserSignIn = 1
    // $(".data").css("display", "block");
    // $(".g-signin2").css("display", "none");


    imgURL = profile.getImageUrl()
    myName = profile.getName()

    document.getElementById("profile-Img").setAttribute("src", profile.getImageUrl())
    document.getElementById("profile-Name").textContent = myName
    document.getElementById("profile-Email").textContent = profile.getName()

    console.log(profile)
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // style.display = "none"
    const allowedEmailDomain = 'student.tdsb.on.ca';

    email = profile.getEmail();
    name = profile.getName();
    ImageURL = profile.getImageUrl();

    // // firebase.database().ref("Users/" + name).set({
    // //     "Name": name,
    // //     "Email": email,
    // //     "Profile": ImageURL
    // // })

    if (email.split('@')[1] === allowedEmailDomain) {
        
firebase.database().ref("TDSB/groupChatMessages/").on("child_added", function (snapshot) {
    var html2 = "";
    // give each message a unique ID
    // show delete button if message is sent by me
    if(previousName == "") {
        if(snapshot.val().Name == myName) {
            html2 += '<div class="sent-Message-Container">'
            html2 +=    '<div class="sent-Message-Name">'+snapshot.val().Name+'</div>'
            html2 +=        '<div class="sent-Content-Img-Holder">'
            html2 +=            '<div class="sent-Message-Content">'+snapshot.val().Message+'</div>'
            html2 +=            '<div class="sent-Img-Holder">'
            html2 +=                '<img class="sent-Profile-Img" src="'+snapshot.val().profileIMGURL+'">'
            html2 +=            '</div>'
            html2 +=        '</div>'
            html2 +=    '</div>'
            html2 += '</div>'
        } 
        if(snapshot.val().Name != myName) {
            html2 += '<div class="rec-Message-Container">'
            html2 +=    '<div class="rec-Message-Name">'+snapshot.val().Name+'</div>'
            html2 +=        '<div class="rec-Content-Img-Holder">'
            html2 +=            '<div class="rec-Message-Content">'+snapshot.val().Message+'</div>'
            html2 +=            '<div class="rec-Img-Holder">'
            html2 +=                '<img class="rec-Profile-Img" src="'+snapshot.val().profileIMGURL+'">'
            html2 +=            '</div>'
            html2 +=        '</div>'
            html2 +=    '</div>'
            html2 += '</div>'
            console.log("Name change")
        }
        previousName = snapshot.val().Name
    } else if(previousName != "") {
        if(snapshot.val().Name == myName) {
            if(previousName == myName) {
                html2 += '<div class="sent-Message-Container">'
                html2 +=    '<div class="sent-Content-Img-Holder">'
                html2 +=        '<div class="sent-Message-Content" id="sent-Message-Alr">'+snapshot.val().Message+'</div>'
                html2 +=    '</div>'
                html2 += '</div>'
            } else {
                html2 += '<div class="sent-Message-Container">'
                html2 +=    '<div class="sent-Message-Name">'+snapshot.val().Name+'</div>'
                html2 +=        '<div class="sent-Content-Img-Holder">'
                html2 +=            '<div class="sent-Message-Content">'+snapshot.val().Message+'</div>'
                html2 +=            '<div class="sent-Img-Holder">'
                html2 +=                '<img class="sent-Profile-Img" src="'+snapshot.val().profileIMGURL+'">'
                html2 +=            '</div>'
                html2 +=        '</div>'
                html2 +=    '</div>'
                html2 += '</div>'
            }
        } else {
            if(previousName == snapshot.val().Name) {
                html2 += '<div class="rec-Message-Container">'
                html2 +=    '<div class="rec-Content-Img-Holder">'
                html2 +=        '<div class="rec-Message-Content" id="sent-Message-Alr">'+snapshot.val().Message+'</div>'
                html2 +=    '</div>'
                html2 += '</div>'
            } else {
                html2 += '<div class="rec-Message-Container">'
                html2 +=    '<div class="rec-Message-Name">'+snapshot.val().Name+'</div>'
                html2 +=        '<div class="rec-Content-Img-Holder">'
                html2 +=            '<div class="rec-Message-Content">'+snapshot.val().Message+'</div>'
                html2 +=            '<div class="rec-Img-Holder">'
                html2 +=                '<img class="rec-Profile-Img" src="'+snapshot.val().profileIMGURL+'">'
                html2 +=            '</div>'
                html2 +=        '</div>'
                html2 +=    '</div>'
                html2 += '</div>'
            }
        }
        previousName = snapshot.val().Name
    }
    chatMessageCount++;
    document.getElementById("messages").innerHTML += html2;
    const chatbox = document.getElementById("normal-Group-Chats")
    chatbox.scrollTo({ top: 9999999999999, behavior: 'auto' });
    const chatbox2 = document.getElementById("messages")
    chatbox2.scrollTo({ top: 9999999999999, behavior: 'auto' });
});
    } else {
        window.location = "emailNotAccepted.html"
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      window.location = "Welcome Page.html"
    });
}

function options() {
    alert("click")
}

var userChatbox = 0

function add() {
    var html = ""
    html += '<div class="chat-Container">'
    html +=     '<div class="profile-Picture-Holder">'
    html +=         '<img class="dummy-Profile-Pic" src="Profile Img 2.png"/>'
    html +=     '</div>'
    html +=     '<div class="users-Name">Daivd Grater</div>'
    html +=     '<div class="options" onclick="options()">'
    html +=         '<svg class="options-Icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">'
    html +=             '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>'
    html +=         '</svg>'
    html +=     '</div>'
    html += '</div>' 

    userChatbox++;
    
    if(userChatbox > 0) {
        document.getElementById("start-Chatting-Container").style.display = "none"
    }

    document.getElementById("chats-Holder").innerHTML += html
}

function sendGroupChatMessage() {
    console.log("Message Sent");
    const groupChatTextBox = document.getElementById("send-Message-Textbox")
    console.log(groupChatTextBox.value)

    // if(previousName != "") {
    //     var html2 = ""
    //     html2 += '<div class="sent-Message-Container">'
    //     html2 +=    '<div class="sent-Content-Img-Holder">'
    //     html2 +=        '<div class="sent-Message-Content" id="sent-Message-Alr">'+groupChatTextBox.value+'</div>'
    //     html2 +=    '</div>'
    //     html2 += '</div>'
    //     document.getElementById("messages").innerHTML += html2
    // }
    // if(previousName == "") {
    //     previousName = "Lily Smith"
    //     var html2 = ""
    //     html2 += '<div class="sent-Message-Container">'
    //     html2 +=    '<div class="sent-Message-Name">'+currentName+'</div>'
    //     html2 +=        '<div class="sent-Content-Img-Holder">'
    //     html2 +=            '<div class="sent-Message-Content">'+groupChatTextBox.value+'</div>'
    //     html2 +=            '<div class="sent-Img-Holder">'
    //     html2 +=                '<img class="sent-Profile-Img" src="Profile Img.png">'
    //     html2 +=            '</div>'
    //     html2 +=        '</div>'
    //     html2 +=    '</div>'
    //     html2 += '</div>'
    //     document.getElementById("messages").innerHTML += html2
    // }

    firebase.database().ref("TDSB/groupChatMessages/").push().set({
        "Name": myName,
        "Message": groupChatTextBox.value,
        "profileIMGURL":imgURL
    })
    const chatbox = document.getElementById("normal-Group-Chats")
    chatbox.scrollTo({ top: 9999999999999, behavior: 'auto' });
    const chatbox2 = document.getElementById("messages")
    chatbox2.scrollTo({ top: 9999999999999, behavior: 'auto' });
    groupChatTextBox.value = ""
    return false
}

document.getElementById("search-Holder").addEventListener("click", function() {
    const chatsPage = document.getElementById("search-Page-Holder").style
    chatsPage.display = "grid"
    chatsPage.flexDirection = "column"
    var navbar = document.getElementById("button-Container");
    navbar.style.display = "none"
    console.log("Search")
})

document.getElementById("close-Icon").addEventListener("click", function() {
    const chatsPage = document.getElementById("search-Page-Holder").style
    chatsPage.display = "none"
    chatsPage.flexDirection = "column"
    var navbar = document.getElementById("button-Container");
    navbar.style.display = "flex"
})

var chatMessageCount = 0;

var profileClick = 0;

document.getElementById("profile-Image-Holder").addEventListener("click", function() {
    if(profileClick == 0) {
        document.getElementById("profile-Page").style.display = "flex"
        profileClick = 1
    } else {

    }
})

document.getElementById("hole-Background").addEventListener("click", function() {
    if(profileClick == 1) {
        document.getElementById("profile-Page").style.display = "none"
        profileClick = 0
    } else {

    }
})