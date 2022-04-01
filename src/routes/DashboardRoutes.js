import React, { useState } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { ArticleDetails } from "../components/ArticleDetails";
import { ArticleList } from '../components/ArticleList';
import {ArticleContext} from '../context/ArticleContext';

export const DashboardRoutes = () => {

    const [selectedArticle, setSelectedArticle] = useState();

    return (
        <BrowserRouter>
            <ArticleContext.Provider value={{selectedArticle, setSelectedArticle}}>
                <Routes>
                    <Route exact path='/' element={<ArticleList />} />
                    <Route exact path='/details' element={selectedArticle ? <ArticleDetails /> : <Navigate to='/'/>} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </ArticleContext.Provider>
        </BrowserRouter>
    );
}