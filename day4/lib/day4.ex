defmodule Day4 do
  @moduledoc """
  Documentation for Day4.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Day4.hello
      :world

  """
  def day4 do
    {:ok, i } = File.read("input_try2.txt")
    l = String.trim(i)
        |> String.split("\n")
        |> Enum.map(&(has_dups?(&1)))
    IO.puts Enum.join(l, ", ")
    IO.puts Enum.count(l)

    k = l
    |> Enum.filter(fn(b) -> b end)
    |> Enum.count

    IO.puts k

    r = String.trim(i)
        |> String.split("\n")
        |> Enum.map(&(has_anagrams?(&1)))
        |> Enum.filter(fn(b) -> !b end)
        |> Enum.count

    IO.puts r
  end

  def has_dups?(str) do
    coll = String.split(str)
    Enum.uniq(coll) |> Enum.count != coll |> Enum.count
  end

  defp isValid(line) do
    list = String.split(line)

    uniq = list
      |> Enum.uniq
      |> Enum.count == Enum.count(list) 
  end

  defp has_anagrams?(line) do
    list = String.split(line)
           |> Enum.map(&(String.graphemes(&1)))
           |> Enum.map(&Enum.sort(&1))

    list
    |> Enum.uniq
    |> Enum.count != Enum.count(list)
  end
     """ 
    t = list
      |> Enum.reduce(%{}, fn (el, acc) -> Dict.put(acc, el, Dict.get(acc, el, 0) + 1) end)
      |> Enum.filter(fn {key, val} -> val == 1 end)
      |> Enum.map(fn {key, val} -> key end)

    countUniq = Enum.count(uniq)
    len = Enum.count(list)
    if (len != countUniq) do
      IO.puts Enum.join(list, " ")
      IO.puts Enum.join(uniq, " ")
      IO.puts Enum.join(t, " ")
    end
    len == countUniq
    """
end
