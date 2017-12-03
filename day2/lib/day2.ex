defmodule Day2 do
  @moduledoc """
  Documentation for Day2.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Day2.hello
      :world

  """
  def hello do
    :world
  end

  def day2 do
    l = File.stream!("input1")
    |> Enum.map(&(lineValue(&1)))
    |> Enum.reduce(0, &(&1+&2))

    IO.puts l
    o = File.stream!("input1")
    |> Enum.map(&(divisible(&1)))
    |> Enum.reduce(0, &(&1+&2))

    IO.puts o
  end

  defp lineValue(line) do
    list = String.split(line, "\t")
           |> Enum.map(&(Integer.parse(&1,10)))

    {max, _} = Enum.max(list)
    {min, _} = Enum.min(list)
    
    max-min
  end

  defp doStuff([x | []]) do
    [{0,0}]
  end

  defp doStuff([x | [j| tail]]) do
    if rem(j, x) == 0 do
      [{j, x}]
    else
      [doStuff([x|tail])| doStuff([j|tail])]
    end
  end


  defp divisible(line) do
    list = String.split(line, "\t")
           |> Enum.map(fn(i) -> 
             {x, _y} =Integer.parse(i,10)
             x
           end)
          |> Enum.sort
    IO.puts Enum.join(list, ", ")


    a = doStuff(list)
    |> List.flatten
    |> Enum.find(fn ({x, y}) -> x != 0 end)

    IO.puts Enum.join(Tuple.to_list(a), ", ")

    {max, min} = a

    max / min
  end
end
