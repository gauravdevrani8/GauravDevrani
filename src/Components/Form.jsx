import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Personal Info', 'Address Info', 'Review & Confirm'];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    city: '',
    state: '',
    zipcode: '',
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData')) || {};
    setFormData(prev => ({ ...prev, ...savedData }));
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (activeStep === 0) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
        valid = false;
      }
      if (!formData.email) {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
        valid = false;
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
        valid = false;
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
        valid = false;
      }
    }

    if (activeStep === 1) {
      if (!formData.address1) {
        newErrors.address1 = 'Address Line 1 is required';
        valid = false;
      }
      if (!formData.city) {
        newErrors.city = 'City is required';
        valid = false;
      }
      if (!formData.state) {
        newErrors.state = 'State is required';
        valid = false;
      }
      if (!formData.zipcode) {
        newErrors.zipcode = 'Zipcode is required';
        valid = false;
      } 
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (validate()) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => setActiveStep(prev => prev - 1);
  const handleSubmit = () => {
    console.log('Submitted data:', formData);
    localStorage.clear();
    setActiveStep(0);
  };

  const isStepInvalid = () => {
    switch (activeStep) {
      case 0:
        return !formData.name || !formData.email || !formData.phone;
      case 1:
        return !formData.address1 || !formData.city || !formData.state || !formData.zipcode;
      default:
        return false;
    }
  };

  return (
    <Box className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-md">
      <Typography variant="h4" align="center" gutterBottom>Multi-Step Form</Typography>
      
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ mt: 2 }}>
        {activeStep === 0 && (
          <Box>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <TextField
              label="Address Line 1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.address1)}
              helperText={errors.address1}
            />
            <TextField
              label="Address Line 2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.city)}
              helperText={errors.city}
            />
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.state)}
              helperText={errors.state}
            />
            <TextField
              label="Zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.zipcode)}
              helperText={errors.zipcode}
            />
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>Review Information</Typography>
            <Typography><strong>Name:</strong> {formData.name}</Typography>
            <Typography><strong>Email:</strong> {formData.email}</Typography>
            <Typography><strong>Phone:</strong> {formData.phone}</Typography>
            <Typography><strong>Address Line 1:</strong> {formData.address1}</Typography>
            <Typography><strong>Address Line 2:</strong> {formData.address2}</Typography>
            <Typography><strong>City:</strong> {formData.city}</Typography>
            <Typography><strong>State:</strong> {formData.state}</Typography>
            <Typography><strong>Zipcode:</strong> {formData.zipcode}</Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={isStepInvalid() && activeStep !== steps.length - 1}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MultiStepForm;
