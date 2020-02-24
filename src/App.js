import React, { useState } from 'react';
import { Container, Form, Image, Divider } from 'semantic-ui-react';

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

function App() {
  const [formData, setFormData] = useState({ name: '', gender: '', status: '' });
  const onChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (e, v) => {
    setFormData({ name: '', gender: '', status: '' });
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
    </Container>
  );
}

export default App;
