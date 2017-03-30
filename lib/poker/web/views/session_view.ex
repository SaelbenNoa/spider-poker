defmodule Poker.Web.SessionView do
  use Poker.Web, :view

  def render("token.json", %{token: token}) do
    %{data: %{token: token}}
  end

  def render("show.json", %{session: session}) do
    %{data: render_one(session, Poker.Web.SessionView, "session.json")}
  end

  def render("session.json", %{session: session}) do
    %{id: session.id}
  end
end