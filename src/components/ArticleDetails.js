import moment from 'moment';
import React, { useContext } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ArticleContext } from '../context/ArticleContext';

export const ArticleDetails = () => {

    const {selectedArticle, setSelectedArticle} = useContext(ArticleContext);

    const navigate = useNavigate();
    const backToList = (event) => {
        event.preventDefault();
        setSelectedArticle({});
        navigate('/');
    }

  return (
    <Container className='p-3'>
        {
            selectedArticle && 
            <div>
                <h1>{ selectedArticle.title }</h1>
                <small className='mb-3'>{ selectedArticle.author } - { moment(selectedArticle.publishedAt).format('MM/DD/yyyy HH:mm')}</small>

                <div className='text-center my-2'>
                    <Image src={selectedArticle.urlToImage}></Image>                    
                </div>

                <h5>{selectedArticle.description}</h5>

                <p>{selectedArticle.content}</p>

                <Row className='d-flex justify-content-between'>
                    <Col md={3}>
                        <Button variant='primary' onClick={backToList}>Go back</Button>                    
                    </Col>

                    <Col md={3} className='d-flex justify-content-end'>
                        <a className='btn btn-success' href={selectedArticle.url} target='_blank'>
                            Read more
                        </a>
                    </Col>
                </Row>
            </div>
        }
    </Container>);
}
