import React, { useState } from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';

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

function AddCharacterModal() {
  const [formData, setFormData] = useState({ name: '', gender: '', status: '', image: '' });

  const handleAddCharacter = () => {
    console.log('TCL: handleAddCharacter -> handleAddCharacter', formData);
  }

  const onChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal
      centered={false}
      trigger={
        <Button
          type="button"
          className="addCharacterButton"
          color="blue"
        >
          Add Character
        </Button>
      }
    >
      <Modal.Header>Add new character</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                name="name"
                value={formData.name}
                onChange={onChange}
                label='Name'
                placeholder='Type a name'
              />
              <Form.Select
                name="gender"
                value={formData.gender}
                label='Gender'
                onChange={onChange}
                options={genderOptions}
                placeholder='Select gender'
              />
              <Form.Select
                name="status"
                value={formData.status}
                label='Status'
                onChange={onChange}
                options={statusOptions}
                placeholder='Select status'
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                name="image"
                value={formData.image}
                onChange={onChange}
                label='Image'
                placeholder='Image URL...'
              />
            </Form.Group>
            <Form.Group>
              <Form.Button
                positive
                type="button"
                content='Add'
                style={{ marginTop: "24px" }}
                onClick={handleAddCharacter}
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default AddCharacterModal;