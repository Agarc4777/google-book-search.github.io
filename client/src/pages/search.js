import react, { useState} from "react";
import results from "./components/results";
import API from "./utils/API";

function Search() {
    const [books, setBooks] = useState([])
    const [formObject, setFormObject] = useState({})

    useEffect(() => {
        searchBooks()

    }, [])

    function searchBooks() {
        API.getBooks()
        .then(res => 
            setBooks(res.data)
        )
        .catch(err => console.log(err));
    };

    function deleteBook(id) {
        API.deleteBook(id)
        .then(res => searchBooks())
        .catch(err => console.log(err));
    };
    
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name] : value})
    };
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.title && formObject.author) {
            API.saveBook({
                title: formObject.title,
                author: formObject.author,
            })
            .then(res => searchBooks())
            .catch(err => console.log(err));
        };
    };
    return (
        <Results></Results>
    )
}

export default Search;