import React, { useState } from 'react';
import { useLazyQuery } from "@apollo/react-hooks";
import {
  Container,
  Grid,
  Card,
  Form,
  Button,
  Image,
  Icon,
  Loader,
  Segment,
  Header,
  Divider,
} from 'semantic-ui-react';

import { GET_CHARACTERS } from './QueriesAndMutations'

import AddCharacterModal from './AddCharacterModal';

import './App.css';

const genderIconName = {
  male: 'mars',
  female: 'venus',
  unknown: 'question',
};

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [getCharacters, { loading, data }] = useLazyQuery(GET_CHARACTERS);

  const onChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (e, v) => {
    getCharacters({
      variables: {
        name: formData.name,
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
        <Form.Group>
          <Form.Input
            name="name"
            value={formData.name}
            onChange={onChange}
            label='Character name'
            placeholder='Type a character name...'
            icon='search'
          />
          <Form.Button
            positive
            content='Search'
            style={{ marginTop: "24px" }}
          />
          <Button
            type="button"
            className="addCharacterButton"
            color="blue"
            onClick={() => setModalOpen(true)}
          >
            Add Character
          </Button>
        </Form.Group>
      </Form>
      <Divider />
      <Grid columns={5}>
        {
          loading
            ? <Loader active inline='centered' />
            : data && <Grid.Row>
              {data.characters && (
                data.characters.map(character => <Grid.Column key={character.name} className="card-result">
                  <Card>
                    <Image src={character.image} />
                    <Card.Content>
                      <Card.Header>
                        {character.name}
                        <Icon color='grey' name={genderIconName[character.gender]} />
                      </Card.Header>
                      <Card.Meta>
                        <span>{character.status}</span>
                      </Card.Meta>
                      <Card.Meta>
                        <Icon color="grey" name="globe" />
                        <span>{character.location && character.location.name}</span>
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                ))
              }
            </Grid.Row>
        }
      </Grid>
      {
        data && !data.characters.length && (
          <Segment placeholder>
            <Header icon>
              <Icon name='search' />
              We don't have any character matching your query.
            </Header>
            <Segment.Inline>
              <Button primary onClick={() => setModalOpen(true)}>Add Character</Button>
            </Segment.Inline>
          </Segment>
        )
      }
      <AddCharacterModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Container>
  );
}

export default App;
