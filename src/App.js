import React, { useState } from 'react';
import "./popup.css";

export default function App() {
  const [modal, setModal] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ]);

  const [currentSchema, setCurrentSchema] = useState('');

  const togglePopup = () => {
    setModal(!modal);
  };
  // show and hide the popup model conditions
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  // Handle adding new schema
  const addNewSchema = () => {
    if (currentSchema !== '') {
      const schema = availableSchemas.find((s) => s.value === currentSchema);
      setSelectedSchemas([...selectedSchemas, schema]);

      // Remove the selected schema from the availableSchemas list
      setAvailableSchemas(availableSchemas.filter((s) => s.value !== currentSchema));

      // Reset the current schemas
      setCurrentSchema('');
    }
  };

  // Handle removing a schema
  const removeSchema = (index) => {
    const schemaToRemove = selectedSchemas[index];
    setAvailableSchemas([...availableSchemas, schemaToRemove]);

    // Remove the schema from selectedSchemas
    const updatedSchemas = [...selectedSchemas];
    updatedSchemas.splice(index, 1);
    setSelectedSchemas(updatedSchemas);
  };

  // Handle segment save
  let arraySegment
  const saveSegment = () => {
    arraySegment = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label
      }))
    };
    console.log(arraySegment);

    togglePopup();
  };
  
  return (
    <div>
      <button onClick={togglePopup} className="btn-modal">Open</button>

      {/* {JSON.stringify(arraySegment)}       */}
      {modal && (
        <div className="modal">
          <div onClick={togglePopup} className="overlay"></div>
          <div className="modal-content">
            <div className="model-header">
            <b>Saving Segment</b>
            <button className="close-modal" onClick={togglePopup}>X</button>
            </div>

          <label>Enter the Name of the Segment</label>
          <input type="text" value={segmentName} onChange={(e) => setSegmentName(e.target.value)} placeholder="Enter segment name"/>
          <p>To save your segment, yo need to add the swchemas to build the query</p>

          <div style={{ marginTop: '10px' }}>
            <select value={currentSchema} onChange={(e) => setCurrentSchema(e.target.value)}>
              <option value="" disabled>Add schema to segment</option>
              {availableSchemas.map((schema) => (
                <option key={schema.value} value={schema.value}>
                  {schema.label}
                </option>
              ))}
            </select>
            <button onClick={addNewSchema}>+ Add new schema</button>
          </div>

          <div className="blue-box" style={{ backgroundColor: 'lightblue', padding: '10px', marginTop: '10px', marginBottom:'20px'}}>
            {selectedSchemas.map((schema, index) => (
              <div key={index}>
                <select
                  value={schema.value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const updatedSchemas = [...selectedSchemas];
                    updatedSchemas[index] = availableSchemas.find((s) => s.value === newValue);
                    setSelectedSchemas(updatedSchemas);
                    setAvailableSchemas(availableSchemas.filter((s) => s.value !== newValue));
                  }}
                >
                  {availableSchemas.concat(selectedSchemas).map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <button onClick={() => removeSchema(index)} style={{ marginLeft: '10px' }}>-</button>
              </div>
            ))}
          </div>

          <button onClick={saveSegment}>Save the segment</button>
          <button onClick={togglePopup}>Cancel</button>
        </div>
        </div>
      )}
    </div>
  );
};