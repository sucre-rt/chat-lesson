class Api::MessagesController < ApplicationController

	def index
		last_message = params[:last_message].to_i
		@messages = Message.includes(:user).where("id > #{last_message}")
		@current_user = current_user.id
		respond_to do |format|
			format.json  #index.json.jbuilderに@messagesをわたす
			format.html
		end
	end

end
