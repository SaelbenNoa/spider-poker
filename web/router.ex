defmodule Poker.Router do
  use Poker.Web, :router
  use Plug.ErrorHandler

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json-api"]
    plug JaSerializer.ContentTypeNegotiation
    plug JaSerializer.Deserializer
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Poker do
    pipe_through :api

    resources "/users", UserController, param: "username", except: [:new, :edit] do
      resources "/notifications", NotificationController, only: [:index, :update]
      resources "/messages", MessageController, only: [:index, :update]
    end
    resources "/messages", MessageController, only: [:create]
    resources "/organizations", OrganizationController, except: [:new, :edit] do
      resources "/projects", ProjectController, except: [:new, :edit]
    end

    get "/sessions/me", SessionController, :me
    post "/sessions/create", SessionController, :create
  end

  scope "/", Poker do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

  defp handle_errors(conn, %{reason: %Bodyguard.NotAuthorizedError{}}) do
    send_resp conn, 403, ""
  end
  defp handle_errors(conn, _reason) do
    send_resp conn, conn.status, ""
  end
end
