Rails.application.routes.draw do

	root 'messages#index'
	get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
	get '/signup', to: 'sessions#signup'
  post '/signup', to: 'sessions#create'

  resources :messages, only: [:index, :create, :update, :destroy, :edit]

  namespace :api do
  	get '/messages', to: 'messages#index', defaults: { format: 'json' }
  end
end
