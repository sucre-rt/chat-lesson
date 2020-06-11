// ActionCableでの非同期
// App.chat = App.cable.subscriptions.create("ChatChannel", {
//   connected: function(){
//     //called when the subscription is ready for use on the server
//   },

//   disconnected: function(){
//     //called when the subscription has been terminated by the server
//   },

//   received: function(data){
//     return $('#chat-index').append('<li>' + data['data']['message'] + '</li>');
//   },

//   post: function(data) {
//   	// app/channels/chat_channel#postにmessageのデータを渡す
//     return this.perform('post', { data: data });
//   }

// }, $(document).on('submit', '#new_message', function(e){
//     e.preventDefault();
//     var chatForm = $('#chat-form');
//     var data = {
//     	message: chatForm.val(),
//     	user: chatForm.data('user')
//     }
//     App.chat.post(data);
//     chatForm.val('');
//     return data;
//   })
// );