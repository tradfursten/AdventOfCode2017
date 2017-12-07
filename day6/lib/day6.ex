defmodule Day6 do
  @moduledoc """
  Documentation for Day6.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Day6.hello
      :world

  """



  def day6 do
    {:ok, i} = File.read("input.txt")

    memoryBanks = String.trim(i)
    |> String.split("\t")
    |> Enum.map(fn(i) -> 
      {p, _} = Integer.parse(i)
      p
    end)
    result = []

    iterations = do_step(memoryBanks, result)

    answer1 = Enum.count(elem(iterations, 0))

    IO.puts answer1

    IO.puts answer1 - elem(iterations, 1) - 1


  end

  defp do_step(memory, result) do
    largestBlock = memory
    |> Enum.with_index
    |> Enum.max_by(fn(i) -> elem(i, 0) end)

    clearedMemory = List.replace_at(memory, elem(largestBlock, 1), 0)

    defragdMemory = defrag(clearedMemory, (elem(largestBlock, 1) + 1), elem(largestBlock,0))
    if Enum.member?(result, defragdMemory) do
      newRes = result ++ [defragdMemory]
      { newRes, Enum.find_index(result, fn(i) -> i == defragdMemory end) }
    else
      do_step(defragdMemory, result ++ [defragdMemory])
    end
  end

  defp defrag(memory, _, 0) do
    memory
  end

  defp defrag(memory, index, blocks) do
    if Enum.count(memory) <= index do
      index = 0
    end
    old = Enum.at(memory, index)
    defragdMemory = List.replace_at(memory, index, old + 1)
    defrag(defragdMemory, (index + 1), (blocks - 1))
  end

end
