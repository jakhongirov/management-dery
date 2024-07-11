import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { BrowserQRCodeReader } from '@zxing/library';

const QrCodeScannerForm = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [camera, setCamera] = useState(null); // 'user' for front camera, 'environment' for back camera
  const [formData, setFormData] = useState({
    selectValue: '',
    inputValue: '',
  });

  const webcamRef = useRef(null);
  const qrCodeReader = new BrowserQRCodeReader();

  const capture = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        try {
          const result = await qrCodeReader.decodeFromImage(undefined, imageSrc);
          setResult(result.text);
        } catch (err) {
          setError('No QR code found');
        }
      }
    }
  }, [qrCodeReader]);

  const toggleCamera = () => {
    if (camera) {
      setCamera(null); // Turn off camera
    } else {
      setCamera('environment'); // Switch to back camera
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, including formData and result (scanned QR code)
    console.log('Form Data:', formData);
    console.log('Scanned QR Code:', result);
    // Reset form or perform further actions
  };

  return (
    <div>
      <h1>QR Code Scanner Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select:</label>
          <select name="selectValue" value={formData.selectValue} onChange={handleInputChange}>
            <option value="">Select Option...</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div>
          <label>Input:</label>
          <input type="text" name="inputValue" value={formData.inputValue} onChange={handleInputChange} />
        </div>
        <div>
          <label>QR Code Scanner:</label>
          {camera && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={320}
              height={240}
              videoConstraints={{ facingMode: camera }}
              onUserMediaError={(err) => setError('Camera access error: ' + err.message)}
            />
          )}
          <button type="button" onClick={toggleCamera}>
            {camera ? 'Turn Off Camera' : 'Open Back Camera'}
          </button>
          {camera && (
            <>
              <button type="button" onClick={capture}>
                Scan QR Code
              </button>
              <p>Scanned Code: {result}</p>
              {error && <p>{error}</p>}
            </>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QrCodeScannerForm;