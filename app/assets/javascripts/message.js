$(function(){ 
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html =
        `<div class="chat-main__timeline__upper", data-message-id=${message.id}>
           <div class="current-member">
             ${message.user_name}
           </div>
           <div class="datetime">
             ${message.created_at}
           </div>
         </div>
         <div class="timeline-text">
           <p class="timeline__content">
             ${message.content}
           </p>
           <p class="timeline__content">
             <img src="${message.image}", class="timeline_image">
           </p>
         </div>`
    } else if (message.content) {
      var html =
        `<div class="chat-main__timeline__upper", data-message-id=${message.id}>
           <div class="current-member">
             ${message.user_name}
           </div>
           <div class="datetime">
             ${message.created_at}
           </div>
         </div>
         <div class="timeline-text">
           <p class="timeline__content">
             ${message.content}
           </p>
         </div>`
    } else if (message.image) {
      var html = 
        `<div class="chat-main__timeline__upper", data-message-id=${message.id}>
           <div class="current-member">
             ${message.user_name}
           </div>
           <div class="datetime">
             ${message.created_at}
           </div>
         </div>
         <div class="timeline-text">
           <p class="timeline__content">
             <img src="${message.image}", class="timeline_image">
           </p>
         </div>`
    };
    return html;
  };
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__timeline').append(html);
      $('form')[0].reset();
      $('.chat-main__timeline').animate({ scrollTop: $('.chat-main__timeline')[0].scrollHeight});
      $('.chat-main__post-form__send-button').attr('disabled',false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  });
  var reloadMessages = function() {
    last_message_id = $('.chat-main__timeline__upper:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__timeline').append(insertHTML);
        $('.chat-main__timeline').animate({ scrollTop: $('.chat-main__timeline')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});