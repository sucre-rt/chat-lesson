class ApplicationController < ActionController::Base
	helper_method :current_user
	before_action :login_required # 全こんとろーらの全アクションに適応

	private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

# ログインしていないユーザーをリダイレクトさせる
  def login_required
    redirect_to login_path unless current_user
  end
end
