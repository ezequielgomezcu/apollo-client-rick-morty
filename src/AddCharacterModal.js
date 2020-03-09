import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Form, Modal } from 'semantic-ui-react';

import {
  CREATE_CHARACTER,
  GET_LOCATIONS,
} from './QueriesAndMutations'

function AddCharacterModal({ modalOpen, setModalOpen }) {
  let locationOptions = [];
  const [formData, setFormData] = useState({ name: '', gender: 'male', status: 'Alive', image: '', location: null });
  const { data: locations } = useQuery(GET_LOCATIONS)
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

  if (locations) {
    locationOptions = locations.locations.map(loc => ({
      key: loc.id,
      text: loc.name,
      value: loc.id
    }))
  }

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
                name="location"
                value={formData.location}
                label='Location'
                onChange={onChange}
                options={locationOptions}
                placeholder='Select location'
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