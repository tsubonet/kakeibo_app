class HomeController < ApplicationController
  def index
    render_for_react()
  end
end