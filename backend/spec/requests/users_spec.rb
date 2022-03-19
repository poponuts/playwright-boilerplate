require "rails_helper"

RSpec.describe "/users", type: :request do
  let(:valid_attributes) {
    {
      full_name: "Joe Smith"
    }
  }

  let(:invalid_attributes) {
    {
      full_name: ""
    }
  }

  let(:headers) {
    {"ACCEPT" => "application/json"}
  }

  describe "GET /index" do
    it "renders a successful response" do
      User.create! valid_attributes
      get users_url, headers: headers
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      user = User.create! valid_attributes
      get user_url(user), headers: headers
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new User" do
        expect {
          post users_url, params: {user: valid_attributes}, headers: headers
        }.to change(User, :count).by(1)
      end

      it "renders a created response" do
        post users_url, params: {user: valid_attributes}, headers: headers
        expect(response).to be_created
      end
    end

    context "with invalid parameters" do
      it "does not create a new User" do
        expect {
          post users_url, params: {user: invalid_attributes}, headers: headers
        }.to change(User, :count).by(0)
      end

      it "renders an unprocessable entity response" do
        post users_url, params: {user: invalid_attributes}, headers: headers
        expect(response).to be_unprocessable
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        {
          full_name: "Joe Smith",
          avatar_url: "https://i.pravatar.cc/150?u=joe.smith@example.com",
          email: "joe.smith@example.com",
          phone_number: "0412345678"
        }
      }

      it "updates the requested user" do
        user = User.create! valid_attributes
        patch user_url(user), params: {user: new_attributes}, headers: headers
        user.reload
        expect(user.attributes).to include new_attributes.stringify_keys
      end

      it "renders a successful response" do
        user = User.create! valid_attributes
        patch user_url(user), params: {user: new_attributes}, headers: headers
        user.reload
        expect(response).to be_successful
      end
    end

    context "with invalid parameters" do
      it "renders an unprocessable entity response" do
        user = User.create! valid_attributes
        patch user_url(user), params: {user: invalid_attributes}, headers: headers
        expect(response).to be_unprocessable
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested user" do
      user = User.create! valid_attributes
      expect {
        delete user_url(user), headers: headers
      }.to change(User, :count).by(-1)
    end

    it "renders a no content response" do
      user = User.create! valid_attributes
      delete user_url(user), headers: headers
      expect(response).to be_no_content
    end
  end
end
