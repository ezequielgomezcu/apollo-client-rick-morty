import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, Modal } from 'semantic-ui-react';

import {
  CREATE_CHARACTER,
} from './QueriesAndMutations'

const genderOptions = [
  { key: 'any', text: '', value: '' },
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Unknown', value: 'unknown' },
];

const statusOptions = [
  { key: 'any', text: '', value: '' },
  { key: 'a', text: 'Alive', value: 'Alive' },
  { key: 'd', text: 'Dead', value: 'Dead' },
  { key: 'u', text: 'Unknown', value: 'unknown' },
];

function AddCharacterModal({ modalOpen, setModalOpen }) {
  const [formData, setFormData] = useState({ name: '', gender: '', status: '', image: '' });
  const [createCharacter, { loading }] = useMutation(CREATE_CHARACTER);

  const handleAddCharacter = () => {
    createCharacter({
      notifyOnNetworkStatusChange: true,
      variables: { ...formData },
    });

    setModalOpen(false);
  }

  const onChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal
      open={modalOpen}
      centered={false}
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
                loading={loading}
                disabled={Object.values(formData).some(field => !field) || loading}
                content='Add'
                style={{ marginTop: "24px" }}
                onClick={handleAddCharacter}
              />
              <Form.Button
                color="red"
                type="button"
                content='Cancel'
                disabled={loading}
                style={{ marginTop: "24px" }}
                onClick={() => setModalOpen(false)}
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default AddCharacterModal;