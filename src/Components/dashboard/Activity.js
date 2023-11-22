import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const Activity = () => {
  React.useEffect(() => {
    const el = document.getElementById('wrapper');
    const toggleButton = document.getElementById('menu-toggle');

    if (toggleButton) {
      toggleButton.onclick = function () {
        el.classList.toggle('toggled');
        localStorage.setItem('toggleState', el.classList.contains('toggled'));
      };
    }

    if (localStorage.getItem('toggleState') === 'true') {
      el.classList.add('toggled');
    } else {
      el.classList.remove('toggled');
    }
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const currentDate = new Date().toDateString();

  const memberData = localStorage.getItem("userData");
  const storedMemberData = JSON.parse(memberData);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate('/login')
    }
  }, []);

  // Retrieve the memberId from localStorage
  const MemberID = storedMemberData?.MemberID

  const [OdometerPicture, setOdometerPicture] = useState(""); // Replace with your data
  const [SubmissionDate, setSubmissionDate] = useState(new Date().toDateString()); // Replace with your data
  const [ReasonForRejection, setReasonForRejection] = useState(''); // Replace with your data
  const [Distance, setDistance] = useState(''); // Replace with your data

  const [selectedFile, setSelectedFile] = useState(null);

 
  const [base64, setBase64] = useState(null);
  const [error, setError] = useState(null);



  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64Data = await convertBase64(file);
    setBase64(base64Data);
  };
  console.log(base64);

  const handleFormSubmit = async () => {
    try {
      const requestData = {
        MemberID, // Include other fields here
        OdometerPicture: base64,
        ReasonForRejection,
        Distance,
      };

      const response = await axios.post('https://mlm-backend-mx3k.onrender.com/odometer/addOdometerPicture', requestData);
      setIsPopupOpen(!isPopupOpen);

      console.log('API Response:', response);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 413) {
          setError('Payload Too Large: The file you are trying to upload is too large.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('Payload Too Large: The file you are trying to upload is too large.');
      }
    }
  };

  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    // Fetch the data from the API
    axios.get(`https://mlm-backend-mx3k.onrender.com/odometer/records/${MemberID}`)
      .then((response) => {
        setPendingData(response.data); // Assuming the API response is an array of data
        console.log(pendingData)
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, []);



  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
          <div className="d-flex align-items-center">
            <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
            <h2 className="fs-2 m-0">Activity</h2>

          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            </ul>
          </div>
        </nav>
        <div className="row my-4 p-4">
          <h2 className="fs-4 mb-3">Recent Activity
            <button className='btnn' type='submit' onClick={togglePopup}>View all</button>
          </h2>
          <Dialog open={isPopupOpen} onClose={togglePopup} className="custom-dialog">
            <DialogTitle className="text-xl font-semibold">Add Activity</DialogTitle>
            <DialogContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="imageInput">
                    Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="imageInput"
                    className="input-field"
                    onChange={e => handleFileRead(e)}
                  />
                </div>
                {error && (
                  <div>
                    <p style={{ color: "red", fontSize: "13px" }}>{error}</p>
                  </div>
                )}
                <div>
                  <label className="label" htmlFor="distance">
                    Distance
                  </label>
                  <input
                    type="text"
                    id="distance"
                    className="input-field"
                    placeholder="Enter distance"
                    value={Distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions className="button-container">
              <Button onClick={togglePopup} color="primary">
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFormSubmit}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>


          <div className="col">
            <table className="table bg-white rounded shadow-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Date</th>
                  <th scope="col">Distance</th>
                  <th scope="col">Status</th>
                  <th scope='col'>Image</th>
                </tr>
              </thead>
              <tbody>
                {pendingData.map((item) => (
                  <tr key={item.id}>
                    <td>{item?.MemberID}</td>
                    <td>{new Date(item?.SubmissionDate).toLocaleDateString("en-US")}</td>
                    <td>{item?.Distance}</td>
                    <td>{item?.ApprovalStatus}</td>
                    <td><img width={100} height={50} src={item?.DataURI} alt='images' /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Activity
