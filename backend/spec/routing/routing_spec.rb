require "rails_helper"
require "route_mechanic"

RSpec.describe "Rails.application", type: :routing do
  it "fails if application does not have valid routes" do
    expect(Rails.application).to have_valid_routes
  end
end
