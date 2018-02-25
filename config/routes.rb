Rails.application.routes.draw do

  root :to                    => 'calendar#month'
  get 'month/:year/:month'    => 'calendar#month'
  get 'year/:year'            => 'calendar#year'
  get 'day/:year/:month/:day' => 'calendar#day'

  resources :records
  resources :budgets

  get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
