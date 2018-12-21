window.onload = function (e) {
    liff.init(data => {
        console.log("LIFF API was Called ")
        liff.getProfile().then((user) => {
          $(".profile").attr("src", user.pictureUrl);
        });
    }, err => {
        $(".profile").attr("src","https://i.imgur.com/ObBOmmq.png");
        console.log("LIFF initialization failed")
      }
    );
};

function send(data) {
  liff.sendMessages([ data ])
  .then(() => {
      console.log('message sent');
      liff.closeWindow();
  })
  .catch((err) => {
      console.log('error', err);
      liff.closeWindow();
  });
}
function sendFlex() {
  message = '';
  image = $("#image").val();
  url = $("#url").val();
  text = $("#text").val();
  video = $("#video").val();
  imageVideo =  $("#imageVideo").val();
  group = $("#group").val();
  image = image.replace(" ","");
  url = url.replace(" ","");
  $("#image").val("");
  $("#url").val("");
  $("#text").val("");
  $("#video").val("");
  $("#imageVideo").val("");
  $("#group").val("");
  if (text !== '') {
    console.log('has text')
    message = '>Text ' + text;
    log(message);
    send({ type: 'text', text: message })
  }
  if (image !== '' && url == '') {
    console.log('has image')
    message = '>Image ' + image + ' ' + image;
    log(message);
    send({ type: 'text', text: message })
  }
  if (image !== '' && url !== '') {
    console.log('has url')
    message = '>Image ' + image + ' ' + url;
    log(message);
    send({ type: 'text', text: message })
  }
  if (video !== '' && imageVideo !== ''){
    console.log('has video')
    message = '>Video ' + video + ' ' + imageVideo;
    log(message);
    send({ type: 'text', text: message })
  }
  if (group !== ''){
    console.log('has video')
    message = group;
    log(message);
    send({ type: 'text', text: message })
  }
}
function log(message) {
  $( "console" ).append( "<p>"+message+"</p>" );
}
function btnText() {
  closeMenu(true);
  closeBtn(false);
  addText(true);
  addImage(false);
  addVideo(false);
  addGroup(false);
}
function btnImage() {
  closeMenu(true);
  closeBtn(false);
  addText(false);
  addImage(true);
  addVideo(false);
  addGroup(false);
}
function btnVideo() {
  closeMenu(true);
  closeBtn(false);
  addText(false);
  addImage(false);
  addVideo(true);
  addGroup(false);
}
function btnGroup() {
  closeMenu(true);
  closeBtn(false);
  addText(false);
  addImage(false);
  addVideo(false);
  addGroup(true);
}
function btnAll() {
  addText(false);
  addImage(false);
  addVideo(false);
  addGroup(false);
}
function addText(check) {
  if(check) {
    $('#textInput').css("display","block");
  } else {
    $('#textInput').css("display","none");
  }
}
function addImage(check) {
  if(check) {
    $('#imageInput').css("display","block");
    $('#urlInput').css("display","block");
  } else {
    $('#imageInput').css("display","none");
    $('#urlInput').css("display","none");
  }
}
function addVideo(check) {
  if(check) {
    $('#imageVideoInput').css("display","block");
    $('#VideoInput').css("display","block");
  } else {
    $('#imageVideoInput').css("display","none");
    $('#VideoInput').css("display","none");
  }
}
function addGroup(check) {
  if(check) {
    $('#groupInput').css("display","block");
  } else {
    $('#groupInput').css("display","none");
  }
}
function closeBtn(check) {
  if (check)
    $('#btnSend').css("display","none");
  else
    $('#btnSend').css("display","block");
}
function closeMenu(check) {
  if (check)
    $('#menu').css("display","none");
  else
    $('#menu').css("display","flex");
}
function loginBot() {
  liff.openWindow({
    url: link,
    external:false
  });
}
function openWeb(link) {
  liff.openWindow({
    url: link,
    external:true
  });
}
function Profile() {
  liff.getProfile().then(profile => {
    const name = profile.displayName
    return profile;
  }).catch((err) => {
    return console.log('error', err);
  });
}
$('.profile').click(() => {
  closeMenu(false);
  closeBtn(true);
  btnAll();
});
$('.submit').click(() => {
  console.log("Hi");
  sendFlex();
});
$('#text').on('keypress', function (e) {
  if(e.which === 13){
    sendFlex();
  }
})
