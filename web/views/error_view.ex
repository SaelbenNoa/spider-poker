defmodule Poker.ErrorView do
  use Poker.Web, :view
  import JaSerializer.ErrorSerializer, only: [format: 1]

  # 400

  def render("400.html", _assigns) do
    "Bad request"
  end

  def render("400.json-api", assigns) do
    api_error(assigns, 400, "Bad request")
  end

  # 401

  def render("401.json-api", assigns) do
    api_error(assigns, 401, "Unauthorized")
  end

  def render("401.html", _assigns) do
    "Unauthorized"
  end

  # 403

  def render("403.json-api", assigns) do
    api_error(assigns, 403, "Forbidden")
  end

  def render("403.html", _assigns) do
    "Forbidden"
  end

  # 404

  def render("404.html", _assigns) do
    "Page not found"
  end

  def render("404.json-api", assigns) do
    api_error(assigns, 404, "Not Found")
  end

  # 406

  def render("406.json-api", assigns) do
    api_error(assigns, 406, "Not acceptable")
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    api_error(assigns, 500, "Internal server error")
  end

  # Helpers

  defp api_error(assigns, status, default_message) do
    message =
      assigns
      |> Map.get(:message, default_message)

    %{
      status: status,
      title: message
    }
    |> format
  end
end
