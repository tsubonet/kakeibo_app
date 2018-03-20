class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :null_session

  private

  def action_path
    "#{controller_path}##{action_name}"
  end

  def common_props
    {
      #actionPath: action_path,
      #currentUser: current_user,
    }
  end

  def render_for_react(props: {}, status: 200)
    puts "####################"
    puts user_signed_in?
    puts "####################"
    if request.format.json?
      response.headers["Cache-Control"] = "no-cache, no-store"
      response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
      response.headers["Pragma"] = "no-cache"
      render(
        json: common_props.merge(props),
        status: status,
      )
    else
      render(
        html: view_context.react_component(
          "App",
          prerender: false,
          props: common_props.merge(props).as_json,
        ),
        layout: true,
        status: status,
      )
    end
  end

end
