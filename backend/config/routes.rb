Rails.application.routes.draw do
  resources :session, only: [:index]
  resources :users, except: [:new, :edit]
end
