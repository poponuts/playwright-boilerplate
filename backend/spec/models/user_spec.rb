require "rails_helper"

RSpec.describe User do
  it "is valid" do
    user = User.new(full_name: "John Smith")
    expect(user).to be_valid
  end
end
