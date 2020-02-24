import React, { useState } from 'react';
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";
import { Container, Grid, Card, Form, Image, Divider } from 'semantic-ui-react';

import './App.css';

const genderOptions = [
  { key: 'any', text: '', value: '' },
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
];

const statusOptions = [
  { key: 'any', text: '', value: '' },
  { key: 'a', text: 'Alive', value: 'Alive' },
  { key: 'd', text: 'Dead', value: 'Dead' },
  { key: 'u', text: 'Unknown', value: 'Unknown' },
];

const GET_CHARACTERS = gql`
  query GetCharacters(
      $name: String!,
      $status: String!,
      $gender: String!
    ){
    characters(name: $name, status: $status, gender: $gender) {
      id
      name
      status
      image
      gender
    }
  }
`;

function App() {
  const [formData, setFormData] = useState({ name: '', gender: '', status: '' });
  const [getCharacters, { loading, data }] = useLazyQuery(GET_CHARACTERS);

  const onChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (e, v) => {
    getCharacters({
      variables: {
        name: formData.name,
        gender: formData.gender,
        status: formData.status,
      }
    });
  }

  return (
    <Container>
      <Image
        centered
        width="250"
        src="https://www.stickpng.com/assets/images/58f37720a4fa116215a9240f.png"
      />
      <Divider />
      <Form onSubmit={handleSearch}>
        <Form.Group >
          <Form.Input
            name="name"
            value={formData.name}
            onChange={onChange}
            label='Character name'
            placeholder='Type a character name...'
            icon='search'
          />
          <Form.Select
            name="gender"
            value={formData.gender}
            label='Gender'
            onChange={onChange}
            options={genderOptions}
            placeholder='Gender'
          />
          <Form.Select
            name="status"
            value={formData.status}
            label='Status'
            onChange={onChange}
            options={statusOptions}
            placeholder='Status'
          />
          <Form.Button
            positive
            content='Search'
            style={{ marginTop: "24px" }}
          />
        </Form.Group>
      </Form>
      <Divider />
      <Grid columns={5}>
        {
          !loading && data && <Grid.Row>
            {data.characters && (
              data.characters.map(item => <Grid.Column key={item.name} className="card-result">
                <Card>
                  <Image src={item.image} />
                  <Card.Content>
                    <Card.Header>{item.name} ({item.gender})</Card.Header>
                    <Card.Meta>
                      <span>{item.status}</span>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              </Grid.Column>
              ))
            }
          </Grid.Row>
        }
      </Grid>
    </Container>
  );
}

export default App;
