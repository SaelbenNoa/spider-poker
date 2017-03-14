defmodule Poker.Web do
  def model do
    quote do
      use Ecto.Schema

      import Ecto
      import Ecto.Changeset
      import Ecto.Query
    end
  end

  def controller do
    quote do
      use Phoenix.Controller, namespace: Poker.Web

      alias Poker.Repo
      import Ecto
      import Ecto.Query

      import Poker.Web.Router.Helpers
      import Poker.Web.Gettext
      import Guardian, only: [encode_and_sign: 2]
      import Poker.Web.Plugs.SessionPlug
      import Poker.Web.Plugs.AuthorizationPlug
      import Poker.Web.Helpers.Controller
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "lib/poker/web/templates",
                        namespace: Poker.Web

      import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

      use Phoenix.HTML

      import Poker.Web.Router.Helpers
      import Poker.Web.ErrorHelpers
      import Poker.Web.Gettext
      import Bodyguard.ViewHelpers
    end
  end

  def router do
    quote do
      use Phoenix.Router
      import Poker.Web.Plugs.SessionPlug, only: [preload_session: 2]
    end
  end

  def channel do
    quote do
      use Phoenix.Channel

      alias Poker.Repo
      import Ecto
      import Ecto.Query
      import Poker.Web.Gettext
    end
  end

  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
