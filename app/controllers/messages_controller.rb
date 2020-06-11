class MessagesController < ApplicationController

	def index
		@message = Message.new
		@messages = Message.all
	end

	# ActionCableのときはcreateアクション不要
	def create
		@message = Message.new(create_params)
		@current_user = current_user.id
		if @message.save
			respond_to do |format|
				format.html { redirect_back(fallback_location: messages_path, notice: 'メッセージを送信しました') }
				format.json
			end
		else
			redirect_back(fallback_location: messages_path, notice: 'メッセージの送信に失敗しました')
		end
	end

	def edit
		@message = Message.find(params[:id])
		unless @message.user_id == current_user.id
			redirect_to root_path, notice: '不正なアクセスです'
		end
	end

	def update
		@message = Message.find(params[:id])
		if @message.user_id == current_user.id && @message.update(update_params)
			redirect_to messages_path, notice: '変更しました'
		else
			redirect_to root_path, notice: '変更に失敗しました'
		end
	end\

	def destroy
		@message = Message.find(params[:id])
		if @message.user_id == current_user.id && @message.delete
			redirect_to messages_path, notice: '削除しました'
		else
			redirect_to root_path, notice: '削除に失敗しました'
		end
	end

	private

	def create_params
		params.require(:message).permit(:content).merge(created_at: Time.now, updated_at: Time.now, user_id: current_user.id)
	end

	def update_params
		params.require(:message).permit(:content).merge(updated_at: Time.now)
	end

end
