defmodule Poker.Web.Helpers.GuardianSerializer do
  @moduledoc false
  @behaviour Guardian.Serializer

  alias Poker.Accounts
  alias Poker.Accounts.User

  def for_token(%User{} = user), do:
    {:ok, "User: #{user.id}"}
  def for_token(_), do:
    {:error, "Unknown resource type"}

  def from_token("User: " <> id), do:
    Accounts.get(id)
  def from_token(_), do:
    {:error, "Unknown resource type"}
end
