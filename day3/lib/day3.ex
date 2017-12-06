defmodule Day3 do
  @moduledoc """
  Documentation for Day3.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Day3.hello
      :world

  """

  def day3 do
    IO.puts "Generating spiral"

    input = 368078
    ring = round(Float.ceil(:math.sqrt(368078)))
    IO.puts ring
    numR = (ring - 1) / 2
    cycle = input - round(:math.pow((ring - 2), 2))
    innerOffset = rem(cycle, (ring - 1))
    taxi = numR + abs(innerOffset - numR)
    IO.puts taxi
  end
end
