$(function() {
	console.log('a');
	// ビューに反映させるHTMLを返す関数

	function buildHTML(message) {
		var content = (message.content !== null) ? `${ message.content }`: "";
		var name = (message.user_name !== null) ? `${ message.user_name }`: "";
		var date = (message.date !== null) ? `${ message.date }`: "";
		var id = (message.id !== null) ? `${ message.id }`: "";
		var link = (message.user_id == message.current_user_id) ? `<div class="message-right">
																								                <ul>
																								                  <li>
																								            		    <a data-method="get" href="/messages/${id}/edit">edit</a>
																								                  </li>
																								                  <li>
																								                		<a rel="nofollow" data-method="delete" href="/messages/${id}">delete</a>
																								                  </li>
																								                </ul>
																								              </div>` : "";
		var html = `<div class="message-box" data-message-id="${ id }">
			            <div class="message-left">
			              <p class="message-info">
			                ${name}
			                <span>
			                  ${date}
			                </span>
			              </p>
			          		<p class="message-content">${content}</p>
			            </div>
			            ${link}
			      		</div>`
		return html
	}

	// メッセージ送信
	$('#new_message').on('submit', function(e) {
		e.preventDefault();
		// console.log(this);  →  フォームのDOM要素
		// フォームの送信内容格納
		var messageContent = new FormData(this);
		// 送信先URL定義（現在のページを取得）
		var url = ($(window.location).attr('pathname') == '/') ? (window.location) + "messages" : (window.location.href); // http://ipアドレス:3000/messagesが入る
		// POST /messagesにフォームデータを送る
		$.ajax( {
			url: url,
			type: 'POST',
			data: messageContent,
			dataType: 'json',
			processData: false,
			contentType: false
		})


		// ajax通信に成功した場合
		.done(function(message) {		// 引数のmessageにはcreate.json.jbuilderからのデータが入っている
			console.log('ok');
			// inputフォームの中身を消す
			$('#chat-form').val('');
			// 送信したメッセージを反映
			var html = buildHTML(message);
			$('#chat-box').append(html);
			// 最新メッセージまでスクロール
			$('#chat-box').scrollTop($('#chat-index')[0].scrollHeight);

		})

		// 通信に失敗した場合
		.fail(function(e) {
        alert('送信できませんでした')
    })

    return false;		// POSTが2回実行されるのを防ぐために必要
	});


	// 自動更新
	var reloadMessages = function(message) {
		// リロードするページを限定する
		if ($(window.location).attr('pathname') == '/' || $(window.location).attr('pathname') == '/messages') {
			// 表示中の最新のメッセージのidを取得
			var last_message_id = $('.message-box:last').data('message-id');

			// api/messagesにアクセス
			$.ajax({
				url: 'api/messages',
				type: 'GET',
				dataType: 'json',
				data: {last_message: last_message_id}
			})

			.done(function(messages) {
				// index.json.jbuilderからjsonに変換されたデータがmessagesに入っている
				var html = '';
				$(messages).each(function(i, message) {
					html = buildHTML(message);
					$('#chat-box').append(html);
					$('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
				})
			})

			.fail(function(e) {
				alert('error')
	    })
		} else {
			clearInterval
		}
	}
	// 5秒毎にapiをたたいてデータの更新をさせる
	setInterval(reloadMessages, 5000);
})