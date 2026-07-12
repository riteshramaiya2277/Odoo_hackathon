import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuCheck, LuArrowRight, LuArrowLeft, LuMapPin, LuPackage, LuTruck, LuClipboardCheck } from 'react-icons/lu';

const steps = [
  { id: 1, name: 'Route Details', icon: LuMapPin },
  { id: 2, name: 'Cargo Details', icon: LuPackage },
  { id: 3, name: 'Assignment', icon: LuTruck },
  { id: 4, name: 'Review', icon: LuClipboardCheck },
];

export default function CreateTrip() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    distance: '',
    weight: '',
    cargoType: '',
    vehicle: '',
    driver: '',
    notes: ''
  });

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would POST to the backend
    console.log('Dispatching trip:', formData);
    navigate('/trips');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Create Trip</h1>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Follow the steps to configure and dispatch a new trip.</div>
      </div>

      {/* Stepper */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <React.Fragment key={step.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  backgroundColor: isActive || isCompleted ? 'var(--primary-color)' : 'var(--background-color)',
                  color: isActive || isCompleted ? 'white' : 'var(--text-secondary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 600, border: isActive || isCompleted ? 'none' : '1px solid var(--border-color)'
                }}>
                  {isCompleted ? <LuCheck size={16} /> : step.id}
                </div>
                <div style={{ 
                  fontWeight: isActive ? 600 : 500,
                  color: isActive || isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)'
                }}>
                  {step.name}
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div style={{ flex: 1, height: '2px', backgroundColor: isCompleted ? 'var(--primary-color)' : 'var(--border-color)', margin: '0 1rem' }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Form Content */}
        <div className="card">
          <form onSubmit={currentStep === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            
            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Route Configuration</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Source Location</label>
                  <input type="text" name="source" value={formData.source} onChange={handleChange} required
                    style={{ padding: '0.75rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', outline: 'none' }} 
                    placeholder="e.g. Logistics Hub Terminal A" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Destination Location</label>
                  <input type="text" name="destination" value={formData.destination} onChange={handleChange} required
                    style={{ padding: '0.75rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', outline: 'none' }} 
                    placeholder="e.g. Westside Distribution Center" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Planned Distance (km)</label>
                  <input type="number" name="distance" value={formData.distance} onChange={handleChange} required
                    style={{ padding: '0.75rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', outline: 'none' }} 
                    placeholder="e.g. 450" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Cargo Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Cargo Type</label>
                  <select name="cargoType" value={formData.cargoType} onChange={handleChange} required
                    style={{ padding: '0.75rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'transparent' }}>
                    <option value="">Select cargo type...</option>
                    <option value="General Freight">General Freight</option>
                    <option value="Refrigerated Goods">Refrigerated Goods</option>
                    <option value="Hazardous Materials">Hazardous Materials</option>
                    <option value="Oversized Load">Oversized Load</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Total Weight (kg)</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleChange} required
                    style={{ padding: '0.75rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', outline: 'none' }} 
                    placeholder="e.g. 24000" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Special Instructions</label>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3"
                    style={{ padding: '0.75rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', outline: 'none', fontFamily: 'inherit' }} 
                    placeholder="Optional notes for driver or dispatch..." />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Asset Assignment</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Assign Vehicle</label>
                  <select name="vehicle" value={formData.vehicle} onChange={handleChange} required
                    style={{ padding: '0.75rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'transparent' }}>
                    <option value="">Select an available vehicle...</option>
                    <option value="TX-9921">Freightliner Cascadia (TX-9921)</option>
                    <option value="CA-4410">Volvo VNL 860 (CA-4410)</option>
                    <option value="FL-2291">Peterbilt 579 (FL-2291)</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Assign Driver</label>
                  <select name="driver" value={formData.driver} onChange={handleChange} required
                    style={{ padding: '0.75rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'transparent' }}>
                    <option value="">Select an available driver...</option>
                    <option value="Marcus Chen">Marcus Chen (Hours: 42/70)</option>
                    <option value="Sarah Jenkins">Sarah Jenkins (Hours: 12/70)</option>
                    <option value="David Miller">David Miller (Hours: 65/70)</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Review & Dispatch</h3>
                <div style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--border-radius)', color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <LuCheck size={20} />
                  <span>All checks passed. Vehicle and driver are ready for dispatch.</span>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>Review the summary on the right to ensure all trip details are correct before dispatching.</p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" className="outline" onClick={handleBack} disabled={currentStep === 1} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: currentStep === 1 ? 0.5 : 1 }}>
                <LuArrowLeft size={16} /> Back
              </button>
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {currentStep === 4 ? 'Dispatch Trip' : 'Next Step'} {currentStep !== 4 && <LuArrowRight size={16} />}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="card" style={{ backgroundColor: 'var(--background-color)', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Trip Summary</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>1. Route</div>
              <div style={{ fontSize: '0.875rem' }}>
                <strong>Source:</strong> {formData.source || <span style={{ color: 'var(--text-secondary)' }}>Not set</span>}<br />
                <strong>Destination:</strong> {formData.destination || <span style={{ color: 'var(--text-secondary)' }}>Not set</span>}<br />
                <strong>Distance:</strong> {formData.distance ? `${formData.distance} km` : <span style={{ color: 'var(--text-secondary)' }}>Not set</span>}
              </div>
            </div>
            
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />
            
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>2. Cargo</div>
              <div style={{ fontSize: '0.875rem' }}>
                <strong>Type:</strong> {formData.cargoType || <span style={{ color: 'var(--text-secondary)' }}>Not set</span>}<br />
                <strong>Weight:</strong> {formData.weight ? `${formData.weight} kg` : <span style={{ color: 'var(--text-secondary)' }}>Not set</span>}
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />
            
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>3. Assignment</div>
              <div style={{ fontSize: '0.875rem' }}>
                <strong>Vehicle:</strong> {formData.vehicle || <span style={{ color: 'var(--text-secondary)' }}>Not set</span>}<br />
                <strong>Driver:</strong> {formData.driver || <span style={{ color: 'var(--text-secondary)' }}>Not set</span>}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
