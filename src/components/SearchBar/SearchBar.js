import './search.css';

export default function SearchBar({ list, selectHandler, randomBreed }) {
    return (
        <select value={randomBreed} onChange={(event) => selectHandler(event.target.value)}>
            <option disabled>Select a Breed</option>
            {list.map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
    )
}