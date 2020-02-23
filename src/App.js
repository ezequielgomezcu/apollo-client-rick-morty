import React from 'react';
import { Container, Form, Image, Divider } from 'semantic-ui-react';

import './App.css';

const genderOptions = [
  { key: 'any', text: 'Anyone', value: '' },
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
];

const statusOptions = [
  { key: 'any', text: 'Anyone', value: '' },
  { key: 'a', text: 'Alive', value: 'Alive' },
  { key: 'd', text: 'Dead', value: 'Dead' },
  { key: 'u', text: 'Unknown', value: 'Unknown' },
];

function App() {
  return (
    <Container>
      <Image
          centered
          width="250"
          src="https://www.stickpng.com/assets/images/58f37720a4fa116215a9240f.png"
      />
      <Divider />
      <Form>
        <Form.Group >
          <Form.Input
            label='Character name'
            placeholder='Type a character name...'
            icon='search'
          />
          <Form.Select
            label='Gender'
            options={genderOptions}
            placeholder='Gender'
          />
          <Form.Select
            label='Status'
            options={statusOptions}
            placeholder='Status'
          />
        <Form.Button
          positive
          content='Search'
          style={{marginTop: "24px"}}
        />
        </Form.Group>
      </Form>
      <Divider />
    </Container>
  );
}

export default App;
