class SessionController < ApplicationController
  def index
    # this is where we would have a session check so that
    # the user can get sent to a sign in flow
    render json: {
      user_id: 1
    }, status: :ok
  end
end
