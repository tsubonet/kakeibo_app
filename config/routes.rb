Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to                    => 'calendar#month'
  get 'month/:year/:month'    => 'calendar#month'
  get 'year/:year'            => 'calendar#year'
  get 'day/:year/:month/:day' => 'calendar#day'

  resources :records

end
