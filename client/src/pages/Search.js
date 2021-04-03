import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title) {
      API.bookSearch(
        formObject.title
      )
        .then(res => setBooks(res.data.items))
        .catch(err => console.log(err));
    }
  };
  function saveBook(book) {
    if (formObject.title) {
      API.saveBook({
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors.join(),
        synopsis: book.volumeInfo.description,
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }
  
    return (
      <Container fluid>
        <Row>
          <Col size="sm-12">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
             <Link to={"/books/"}>Save Books
            </Link>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(formObject.title)}
                onClick={handleFormSubmit}
              >
                Search Book
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book.id}>
                      <strong>
                        {book.volumeInfo.title} by {book.volumeInfo.authors}
                      </strong>
                    <button onClick={() => saveBook(book)}>Save</button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;
