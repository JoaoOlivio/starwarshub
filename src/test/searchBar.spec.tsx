import React from "react"
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import SearchBar from "../components/search/searchBar"
import { useSearch } from "@/contexts/searchContext"
import { useTranslations } from "next-intl"
import { fetchGlobalSearch } from "@/lib/action"

jest.mock("@/contexts/searchContext")
jest.mock("next-intl")
jest.mock("@/lib/action")
jest.mock("@/hooks/useDebounce", () => ({
  useDebounce: jest.fn((value) => value),
}))

jest.mock("lucide-react", () => ({
  Search: () => <div data-testid="search-icon" />,
  Filter: () => <div data-testid="filter-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
}))

describe("SearchBar", () => {
  const mockSetSearchTerm = jest.fn()
  const mockSetIsFilterVisible = jest.fn()
  const mockSetGlobalSearchResults = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useSearch as jest.Mock).mockReturnValue({
      setSearchTerm: mockSetSearchTerm,
      isFilterVisible: false,
      setIsFilterVisible: mockSetIsFilterVisible,
      globalSearchResults: [],
      setGlobalSearchResults: mockSetGlobalSearchResults,
    })
    ;(useTranslations as jest.Mock).mockReturnValue((key: string) => key)
    ;(fetchGlobalSearch as jest.Mock).mockResolvedValue([])
  })

  it("Renderiza o input de busca e o botão de filtro", () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText("search.placeholder")).toBeInTheDocument()
    expect(screen.getByTestId("filter-icon")).toBeInTheDocument()
  })

  it("Atualiza o valor do input ao digitar", () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText("search.placeholder") as HTMLInputElement
    fireEvent.change(input, { target: { value: "Luke Skywalker" } })
    expect(input.value).toBe("Luke Skywalker")
  })

  it("Chama setSearchTerm quando o valor do input muda", async () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText("search.placeholder")
    await act(async () => {
      fireEvent.change(input, { target: { value: "Luke Skywalker" } })
    })
    await waitFor(() => expect(mockSetSearchTerm).toHaveBeenCalledWith("Luke Skywalker"))
  })

  it("Alterna a visibilidade do filtro quando o botão de filtro é clicado", () => {
    render(<SearchBar />)
    const filterButton = screen.getByRole("button", { name: "search.filters" })
    fireEvent.click(filterButton)
    expect(mockSetIsFilterVisible).toHaveBeenCalledWith(true)
  })

  it("Busca resultados globais quando o valor do input muda", async () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText("search.placeholder")
    await act(async () => {
      fireEvent.change(input, { target: { value: "Luke Skywalker" } })
    })
    await waitFor(() => expect(fetchGlobalSearch).toHaveBeenCalledWith("Luke Skywalker"))
  })

  it("Exibe o indicador de carregamento enquanto busca resultados", async () => {
    ;(fetchGlobalSearch as jest.Mock).mockImplementation(() => new Promise(() => {})) 
    render(<SearchBar />)
    const input = screen.getByPlaceholderText("search.placeholder")
    await act(async () => {
      fireEvent.change(input, { target: { value: "Luke Skywalker" } })
    })
    await waitFor(() => expect(screen.getByTestId("loader-icon")).toBeInTheDocument())
  })
})

