import { FC } from "react"

interface CitySuggestion{
   name: string,
   country: string,
   state?: string,
   lat: number,
   lon: number
}

interface SearchSuggestionsProps{
   suggestions: CitySuggestion[]
   handleSelectSuggestions: (suggestion: CitySuggestion) => void,
}

const SearchSuggestions: FC<SearchSuggestionsProps> = ({ suggestions, handleSelectSuggestions }) => {
  return (
    <div>
      {suggestions.length > 0 && (
         <ul className="absolute top-full rounded-xl left-0 w-80 bg-white text-black">
            {suggestions.map((suggestion, index) => (
               <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-blue-100"
                  onClick={() => handleSelectSuggestions(suggestion)}
               >
                  {suggestion.name}, {suggestion.country},
                  {suggestion.state? (` ${suggestion.state}`) : ""}   
               </li>
            ))}
         </ul>
      )}
    </div>
  )
}

export default SearchSuggestions