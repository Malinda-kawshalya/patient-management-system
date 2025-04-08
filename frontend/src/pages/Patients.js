import React, { useState, useEffect } from 'react';
import '../css/patient.css';

const PatientPage = () => {
  // State for patient form
  const [newPatient, setNewPatient] = useState({
    fullName: '',
    patientId: '',
    nic: '',
    dateOfBirth: '',
    telephone: '',
    allergies: '',
    diseases: []
  });

  // State for all patients list
  const [patients, setPatients] = useState([]);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Common diseases for multi-select
  const commonDiseases = [
    'Hypertension', 'Diabetes', 'Asthma', 'Arthritis', 
    'Heart Disease', 'COPD', 'Depression', 'Anxiety'
  ];

  // Generate a unique patient ID
  useEffect(() => {
    const generateId = () => {
      const prefix = "PT";
      const random = Math.floor(10000 + Math.random() * 90000);
      return `${prefix}${random}`;
    };
    
    setNewPatient(prev => ({...prev, patientId: generateId()}));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({
      ...newPatient,
      [name]: value
    });
  };

  // Handle disease selection
  const handleDiseaseToggle = (disease) => {
    if (newPatient.diseases.includes(disease)) {
      setNewPatient({
        ...newPatient,
        diseases: newPatient.diseases.filter(d => d !== disease)
      });
    } else {
      setNewPatient({
        ...newPatient,
        diseases: [...newPatient.diseases, disease]
      });
    }
  };

  // Save new patient
  const handleSavePatient = (e) => {
    e.preventDefault();
    const newPatientWithId = {
      ...newPatient,
      id: patients.length + 1, // Simple ID for demonstration
    };
    
    setPatients([...patients, newPatientWithId]);
    
    // Reset form
    setNewPatient({
      fullName: '',
      patientId: `PT${Math.floor(10000 + Math.random() * 90000)}`,
      nic: '',
      dateOfBirth: '',
      telephone: '',
      allergies: '',
      diseases: []
    });
  };

  // Handle search
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setSelectedPatient(null);
      return;
    }
    
    const results = patients.filter(patient => {
      if (searchBy === 'name') {
        return patient.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchBy === 'id') {
        return patient.patientId.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
    
    setSearchResults(results);
    if (results.length === 1) {
      setSelectedPatient(results[0]);
    } else {
      setSelectedPatient(null);
    }
  };

  // Delete patient
  const handleDeletePatient = (patientId) => {
    setPatients(patients.filter(patient => patient.id !== patientId));
  };

  // Get patient age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="patient-page">
      
      <div className="content-container">
        {/* Add New Patient Section */}
        <section className="add-patient-section">
          <h2>Add New Patient</h2>
          
          <form onSubmit={handleSavePatient}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                value={newPatient.fullName} 
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Patient ID</label>
                <input 
                  type="text" 
                  name="patientId" 
                  value={newPatient.patientId} 
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              
              <div className="form-group">
                <label>NIC (Optional)</label>
                <input 
                  type="text" 
                  name="nic" 
                  value={newPatient.nic} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input 
                  type="date" 
                  name="dateOfBirth" 
                  value={newPatient.dateOfBirth} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Age</label>
                <input 
                  type="text" 
                  value={calculateAge(newPatient.dateOfBirth)}
                  readOnly 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Telephone</label>
              <input 
                type="tel" 
                name="telephone" 
                value={newPatient.telephone} 
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Allergies</label>
              <textarea 
                name="allergies" 
                value={newPatient.allergies} 
                onChange={handleInputChange}
                placeholder="List any allergies here..."
              />
            </div>
            
            <div className="form-group">
              <label>Diseases / Conditions</label>
              <div className="diseases-container">
                {commonDiseases.map(disease => (
                  <div key={disease} className="disease-checkbox">
                    <input
                      type="checkbox"
                      id={`disease-${disease}`}
                      checked={newPatient.diseases.includes(disease)}
                      onChange={() => handleDiseaseToggle(disease)}
                    />
                    <label htmlFor={`disease-${disease}`}>{disease}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <button type="submit" className="save-btn">Save Patient</button>
          </form>
        </section>
        
        {/* View All Patients Section */}
        <section className="view-patients-section">
          <h2>All Patients</h2>
          
          {patients.length === 0 ? (
            <p className="no-records">No patient records found.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(patient => (
                    <tr key={patient.id}>
                      <td>{patient.patientId}</td>
                      <td>{patient.fullName}</td>
                      <td>{patient.telephone}</td>
                      <td className="action-buttons">
                        <button className="view-btn">View</button>
                        <button className="edit-btn">Edit</button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeletePatient(patient.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
        
        {/* Search Existing Patient Section */}
        <section className="search-patient-section">
          <h2>Search Patient</h2>
          
          <div className="search-container">
            <div className="search-inputs">
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <div className="search-filters">
                <div className="filter-option">
                  <input
                    type="radio"
                    id="by-name"
                    name="searchBy"
                    value="name"
                    checked={searchBy === 'name'}
                    onChange={() => setSearchBy('name')}
                  />
                  <label htmlFor="by-name">By Name</label>
                </div>
                
                <div className="filter-option">
                  <input
                    type="radio"
                    id="by-id"
                    name="searchBy"
                    value="id"
                    checked={searchBy === 'id'}
                    onChange={() => setSearchBy('id')}
                  />
                  <label htmlFor="by-id">By ID</label>
                </div>
              </div>
            </div>
            
            <button onClick={handleSearch} className="search-btn">Search</button>
          </div>
          
          {searchResults.length > 0 && !selectedPatient && (
            <div className="search-results">
              <h3>Search Results</h3>
              <ul>
                {searchResults.map(patient => (
                  <li key={patient.id} onClick={() => setSelectedPatient(patient)}>
                    {patient.fullName} ({patient.patientId})
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {selectedPatient && (
            <div className="patient-details">
              <h3>Patient Details</h3>
              <div className="details-container">
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{selectedPatient.fullName}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Patient ID:</span>
                  <span className="detail-value">{selectedPatient.patientId}</span>
                </div>
                
                {selectedPatient.nic && (
                  <div className="detail-row">
                    <span className="detail-label">NIC:</span>
                    <span className="detail-value">{selectedPatient.nic}</span>
                  </div>
                )}
                
                <div className="detail-row">
                  <span className="detail-label">Age:</span>
                  <span className="detail-value">{calculateAge(selectedPatient.dateOfBirth)} years</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedPatient.telephone}</span>
                </div>
                
                {selectedPatient.allergies && (
                  <div className="detail-row">
                    <span className="detail-label">Allergies:</span>
                    <span className="detail-value">{selectedPatient.allergies}</span>
                  </div>
                )}
                
                {selectedPatient.diseases && selectedPatient.diseases.length > 0 && (
                  <div className="detail-row">
                    <span className="detail-label">Conditions:</span>
                    <span className="detail-value">{selectedPatient.diseases.join(', ')}</span>
                  </div>
                )}
              </div>
              
              <div className="patient-actions">
                <button className="prescription-btn">Add Prescription</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PatientPage;