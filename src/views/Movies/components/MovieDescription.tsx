import React from 'react';
import styled from 'styled-components';
import {IMovie} from "../../../api/features/movie/types";
import {Link} from "react-router-dom";
import {serverUrl} from "../../../api";

const Card = styled.div<{basicBackground: string, alternativeBackground: string}>`
  display: block;
  width: 200px;
  padding: 20px;
  text-decoration: none;
  color: black;
  background-image: url(${props => props.basicBackground});
  transition: background-image 0.3s ease-in-out;

  &:hover {
    background-image: url(${props => props.alternativeBackground});
  }
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 10px 0;
`;

const Description = styled.p`
  font-size: 16px;
`;

export const CardComponent = ({ id, title, backdrop, poster, overview }: IMovie) => (
    <Link to={`/movies/${id}`}>

        <Card basicBackground={poster} alternativeBackground={backdrop}>
            <Title>{title}</Title>
            <Description>{overview}</Description>
        </Card>
    </Link>
);

