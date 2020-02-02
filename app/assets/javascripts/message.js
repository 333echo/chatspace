$(function(){ 
  function buildHTML(message){
  //  console.log(message)
   if ( message.image ) {
     var html =
      `<div class="chat-main__timeline__upper">
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
         <p class="timeline__image">
           <img class="timeline__image" src= ${message.image}>
         </p>
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main__timeline__upper">
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
     return html;
   };
  }
$('#new_message').on('submit', function(e){
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
  .done(function(data){
    var html = buildHTML(data);
  $('.chat-main__timeline').append(html);
  $('form')[0].reset();
  $('.chat-main__timeline').animate({ scrollTop: $('.chat-main__timeline')[0].scrollHeight});
  $('.chat-main__post-form__send-button').attr('disabled',false);
  })
  .fail(function(){
    alert("メッセージ送信に失敗しました");
  })
})
});