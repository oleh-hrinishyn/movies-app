import React from 'react';
import './App.css';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import {MoviesRoute} from "./views/Movies/MoviesRoute";
import {MoviesNestedRouter} from "./views/Movies/MoviesNestedRouter";
import Redirect from "./routing/Redirect";
const history = createBrowserHistory({ window });

function App() {
  return (
      <HistoryRouter
          // @ts-ignore
          history={history}
      >
          <Routes>
              <Route path={'/'} element={<Redirect to={'/movies'} />} />
              <Route path={'/'} element={<MoviesRoute />}>
                  <Route path={'/movies/*'} element={<MoviesNestedRouter />} />
              </Route>
          </Routes>
      </HistoryRouter>
  );
}

export default App;
