liff.init(data => {
    console.log("LIFF API was Called ")
    const userId = data.context.userId;
  },
  err => {
    console.log("LIFF initialization failed")
  }
);
function sendFlex() {
  message = '';
  image = $("#image").val();
  url = $("#url").val();
  text = $("#text").val();
  if (text !== '') {
    console.log('has text')
    message = text;
  }
  if (image !== '') {
    console.log('has image')
    message = image + ' ' + image + ' ' + text;
  }
  if (url !== '') {
    console.log('has url')
    message = image + ' ' + url + ' ' + text;
  }
  body = { "to": "U47776c2cab6edb0d632c2ed21b3ea6b8", "message": message };
  $.ajax({
      type: 'POST',
      data: JSON.stringify(body),
      dataType: "json",
      contentType: 'application/json',
      url: 'https://razerforce.herokuapp.com/push',	
      success: function(body) {
          console.log('success');
          console.log(JSON.stringify(body));
      }
  });
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
$('.submit').click(() => {
  console.log("Hi");
  sendFlex();
});
