import React, {Component} from 'react';
import {isLoggedIn, logout} from './auth';
import {CompanyDetail} from './CompanyDetail';
import {LoginForm} from './LoginForm';
import {JobBoard} from './JobBoard';
import {JobDetail} from './JobDetail';
import JobForm from './JobForm';
import {NavBar} from './NavBar';
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import {client} from "./graphql/queries.js";
import {Route, Routes} from 'react-router-dom';
import {useNavigate} from 'react-router';
import {useState} from 'react';

function App() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);

    const handleLogin = () => {
        setLoggedIn(true);
        navigate('/');
    };

    const handleLogout = () => {
        setLoggedIn(false);
        navigate('/');
    };

    return (
        <ApolloProvider client={client}>
            <NavBar loggedIn={loggedIn} onLogout={handleLogout}/>
            <main className="section">
                <Routes>
                    <Route path="/"
                           element={<JobBoard/>}
                    />
                    <Route path="/companies/:companyId"
                           element={<CompanyDetail/>}
                    />
                    <Route path="/jobs/new"
                           element={<JobForm/>}
                    />
                    <Route path="/jobs/:jobId"
                           element={<JobDetail/>}
                    />
                    <Route path="/login"
                           element={<LoginForm onLogin={handleLogin}/>}
                    />
                </Routes>
            </main>
        </ApolloProvider>
    );
}

export default App;
