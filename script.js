var onPC = false;
window.onload = function (e) {
  liff.init(data => {
      console.log("LIFF API was Called ")
      liff.getProfile().then((user) => {
        $(".profile").attr("src", user.pictureUrl);
      });
  }, err => {
      onPC = true;
      $(".profile").attr("src","https://i.imgur.com/ObBOmmq.png");
      console.log("LIFF initialization failed");
    }
  );
};
function send(data) {
  if (onPC) {
    let msg = data.text;
    let body = { "message": msg };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(body),
        dataType: "json",
        contentType: 'application/json',
        url: 'https://razerforce.herokuapp.com/api',	
        success: function(body) {
            console.log('success');
            console.log(JSON.stringify(body));
        }
    });
  } else {
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
}
function sendFlex() {
  message = '';
  image = $("#image").val();
  url = $("#url").val();
  text = $("#text").val();
  video = $("#video").val();
  imageVideo =  $("#imageVideo").val();
  time = $("#datetime").val();
  image = image.replace(" ","");
  url = url.replace(" ","");
  $("#image").val("");
  $("#url").val("");
  $("#text").val("");
  $("#video").val("");
  $("#imageVideo").val("");
  $("#datetime").val("");
  if (time !== '' && text !== '') {
    message = '>AutoText ' + text + '[[TIME]]' + time;
    log(message);
    send({ type: 'text', text: message })
  }
  else if (text !== '') {
    message = '>Text ' + text;
    log(message);
    send({ type: 'text', text: message })
  }
  if (image !== '' && url == '') {
    message = '>Image ' + image + ' ' + image;
    log(message);
    send({ type: 'text', text: message })
  }
  if (time !== '' && image !== '' && url !== '') {
    message = '>AutoImage ' + image + ' ' + url + ' ' + time;
    log(message);
    send({ type: 'text', text: message })
  }
  else if (image !== '' && url !== '') {
    message = '>Image ' + image + ' ' + url;
    log(message);
    send({ type: 'text', text: message })
  }
  if (time !== '' && video !== '' && imageVideo !== '') {
    message = '>AutoVideo ' + video + ' ' + imageVideo + ' ' + time;
    log(message);
    send({ type: 'text', text: message })
  }
  else if (video !== '' && imageVideo !== '') {
    message = '>Video ' + video + ' ' + imageVideo;
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
  addAuto(false);
  setTitle("ข้อความ");
}
function btnText2() {
  closeBtn(false);
  addGroup(false);
  addAuto(true);
  addText(true);
  setTitle("ออโต้ส่งข้อความ");
}
function btnImage() {
  closeMenu(true);
  closeBtn(false);
  addText(false);
  addImage(true);
  addVideo(false);
  addGroup(false);
  addAuto(false);
  setTitle("รูปภาพ");
}
function btnImage2() {
  closeBtn(false);
  addGroup(false);
  addAuto(true);
  addImage(true);
  setTitle("ออโต้ส่งรูปภาพ");
}
function btnVideo() {
  closeMenu(true);
  closeBtn(false);
  addText(false);
  addImage(false);
  addVideo(true);
  addGroup(false);
  addAuto(false);
  setTitle("วิดีโอ");
}
function btnGroup() {
  closeMenu(true);
  addText(false);
  addImage(false);
  addVideo(false);
  addGroup(true);
  addAuto(false);
  setTitle("ออโต้ส่งแชท");
}
function btnAll() {
  addText(false);
  addImage(false);
  addVideo(false);
  addGroup(false);
  addAuto(false);
  setTitle("เมนู");
}
function setTitle(name){
  document.title = "MENU | " + name;
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
    $('#imgur').css("display","block");
  } else {
    $('#imageInput').css("display","none");
    $('#urlInput').css("display","none");
    $('#imgur').css("display","none");
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
function addAuto(check) {
  if (check) {
    $('#autoMsg').css("display","block");
  } else {
    $('#autoMsg').css("display","none");
  }
}
function closeBtn(check) {
  if (check) {
    $('#btnSend').css("display","none");
  } else {
    $('#btnSend').css("display","block");
  }
}
function closeMenu(check) {
  if (check) {
    $('#menu').css("display","none");
  } else {
    $('#menu').css("display","flex");
  }
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
  sendFlex();
  openModal();
});
$('#text').on('keypress', function (e) {
  if(e.which === 13){
    //sendFlex();
  }
});
$("document").ready(function() {
  $('input[type=file]').on("change", function() {
    var $files = $(this).get(0).files;
    $("#image").val("กำลังอัพโหลดรูป...");
    if ($files.length) {
      if ($files[0].size > $(this).data("max-size") * 1040) {
        console.log("รูปภาพใหญ่เกินไป");
        $("#image").val("รูปภาพใหญ่เกินไป");
        return false;
      }
      console.log("กำลังอัพโหลดรูป");
      var apiUrl = 'https://api.imgur.com/3/image';
      var apiKey = '43905ab7492a794';
      var settings = {
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        url: apiUrl,
        headers: {
          Authorization: 'Client-ID ' + apiKey,
          Accept: 'application/json'
        },
        mimeType: 'multipart/form-data'
      };
      var formData = new FormData();
      formData.append("image", $files[0]);
      settings.data = formData;
      $.ajax(settings).done(function(response) {
      console.log(response);
      let link = JSON.parse(response).data.link;
      $("#imgururl").attr("src", link);
        $("#image").val(link);
      });
    }
  });
  tpick.attach("datetime");
});
function openModal() {
  $(".overlay").css("display", "flex");
  setTimeout( function(){ 
    $(".overlay").css("display", "none");
  }, 1350);
}