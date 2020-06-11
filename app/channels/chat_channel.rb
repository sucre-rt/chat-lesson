# ActionCableでの非同期
# class ChatChannel < ApplicationCable::Channel
#   def subscribed
#     stream_from "chat_channel"
#   end

#   def unsubscribed
#     # Any cleanup needed when channel is unsubscribed
#   end

#   def post(data)
#   	Message.create!(
#   		content: data['data']['message'],
#   		created_at: Time.now,
#   		updated_at: Time.now,
#   		user_id: data['data']['user']
# 		)
#   	ActionCable.server.broadcast('chat_channel', data)
#   end
# end
