import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Card, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ArticleContext } from '../context/ArticleContext';
import { Search } from './Search';

export const ArticleList = () => {

    const [articles, setArticles] = useState({data: [], loading: true, error: null});

    useEffect(() => {
        getArticles();
    }, []);

    const { setSelectedArticle } = useContext(ArticleContext);

    const navigate = useNavigate();

    const goToDetails = (event, article) => {
        event.preventDefault();
        setSelectedArticle(article);
        navigate('/details');
    }

    const getArticles = (filter = '') => {

        setArticles({
            ...articles,
            loading: true
        });

        const url = `${window.env.API_URL}:${window.env.API_PORT}`;

        fetch(`${url}/api/everything${filter && `?filter=${encodeURI(filter)}`}`)
        .then(resp => resp.json())
        .then(data => {
            setArticles({
                loading: false,
                error: null,
                data
            })
        })
        .catch(error => {
            setArticles({
                loading: false,
                data: [],
                error
            })
        });
    }
    
  return (
    <div>
        <Navbar bg='dark' variant='dark' className='px-5'>
            <Col>
            <Row className='d-flex align-items-between'>
                <Col xs={4}>
                    <Navbar.Brand>WorldWide News</Navbar.Brand>
                </Col>

                <Col xs={6}>
                    <Search onSubmit={getArticles}></Search>
                </Col>
            </Row>
            </Col>
            
        </Navbar>
        
        <Container className='p-3'>
            {
                articles.loading && 
                <Row className="d-flex flex-row justify-content-center align-items-center">
                    <Spinner animation="border" role="status" size="" variant="primary" className="m-0">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            }

            {
                !articles.loading && 
                <Row className="d-block d-md-flex align-items-stretch">
                    {articles.data.map((article, index) => (
                        <Col key={index} md={4} className='my-2' onClick={(e) => goToDetails(e, article)}>
                            <Card>
                                <Card.Header className='bg-dark text-white'>
                                    {article.title}
                                </Card.Header>

                                <Card.Body className='p-0'>
                                    <Card.Img src={article.urlToImage}></Card.Img>
                                    <div className='p-2'>
                                        {article.description}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            }
        </Container>
    </div>
  )
}
