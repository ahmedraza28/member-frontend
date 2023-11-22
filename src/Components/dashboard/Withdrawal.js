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
import { useNavigate } from 'react-router-dom';

const Withdrawal = () => {
  const navigate = useNavigate();
  useEffect(() => {
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
  const memberData = localStorage.getItem("userData");
  const storedMemberData = JSON.parse(memberData);
  const AvailableBalance = storedMemberData?.AvailableBalance
  const Balance = storedMemberData?.Balance
  const Level = storedMemberData?.Level;
  const memberId = storedMemberData?.MemberID;
  const [withdrawalMode, setWithdrawalMode] = useState('cash');
  const [pendingRequests, setPendingRequests] = useState([]);
  
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate('/login')
    }
  }, []);


  // const getMemberRedemptionRequest = async () => {
  //   const data = {
  //     memberId: MemberID, // Replace with your actual memberId

  //   };

  //   try {
  //     const response = await axios.post('http://localhost:3000/redemption/member-redemption-requests', data);
  //     // Handle the response here
  //     console.log('API Response:', response.data);
  //     setPendingRequests(response.data);
  //   } catch (error) {
  //     // Handle errors here
  //     console.error('API Error:', error);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://mlm-backend-mx3k.onrender.com/redemption/member-redemption-requests/${memberId}`);
      // Set the pending requests in the state
      setPendingRequests(response.data.pendingRequests);
    } catch (error) {
      // Handle errors here
      console.error('API Error:', error);
    }
  };


  useEffect(() => {
    // Define a function to fetch data


    // Call the fetchData function when the component mounts
    fetchData()
    // getMemberRedemptionRequest
  }, []);

  let availableBalance;

  if (withdrawalMode === 'cash') {
    if (Level === 1) {
      availableBalance = Balance * 0.6;
    } else if (Level === 2) {
      availableBalance = Balance * 0.7;
    }
    else if (Level === 3) {
      availableBalance = Balance * 0.8;
    }
    else {
      // Handle other cases here if needed
      availableBalance = Balance;
    }
  }

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const currentDate = new Date().toDateString();
  const [requestedAmount, setRequestedAmount] = useState('');
  const handleRequestedAmountChange = (e) => {
    const amount = e.target.value;

    if (isNaN(amount)) {
      // Handle invalid input (non-numeric values) here
      return;
    }

    if (amount > availableBalance) {
      // Handle the case where the requested amount exceeds the available balance
      alert('Requested amount exceeds available balance');
    } else {
      // Set the requested amount in the state
      setRequestedAmount(amount);
    }
  };

  const handleModeChange = (e) => {
    setWithdrawalMode(e.target.value);
  };

  const handleSubmitRedemptionRequest = async () => {
    const data = {
      memberId: memberId, // Replace with your actual memberId
      pointsRequested: requestedAmount,
      requestType: withdrawalMode,
    };

    try {
      const response = await axios.post('https://mlm-backend-mx3k.onrender.com/redemption/submit-redemption-request', data);
      // Handle the response here
      console.log('API Response:', response.data);
    } catch (error) {
      // Handle errors here
      console.error('API Error:', error);
    }
  };



  return (
    <div className="d-flex" id="wrapper">

      <Sidebar />


      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
          <div className="d-flex align-items-center">
            <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
            <h2 className="fs-2 m-0">Withdrawal</h2>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            </ul>
          </div>
        </nav>

        <div className="row my-4 p-4">
          <h2 className="fs-4 mb-3">Withdrawal Request
            <button className='btnn' type='submit' onClick={togglePopup}>View all</button>
          </h2>
          <Dialog open={isPopupOpen} onClose={togglePopup} className="custom-dialog">
            <DialogTitle className="text-xl font-semibold">Add Payment and Images</DialogTitle>
            <DialogContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="currentDate">Date</label>
                  <div id="currentDate" className="input-field">{currentDate}</div>
                </div>
                <div>
                  <label className="label" htmlFor="withdrawalMode">
                    Mode of Withdrawal
                  </label>
                  <select
                    id="withdrawalMode"
                    className="input-field"
                    value={withdrawalMode}
                    onChange={handleModeChange}
                  >
                    <option value="cash">Cash</option>
                    <option value="credit">Store Credit</option>
                  </select>
                </div>
                {withdrawalMode === 'cash' ? (
                  <div>
                    <label className="label" htmlFor="reqAmou">
                      Amount Avaiable
                    </label>
                    <div id="availableBalance" className="input-field">
                      {availableBalance}
                    </div>

                    <label className="label" htmlFor="reqAmou">
                      Requested Amount
                    </label>
                    <input
                      type="text"
                      id="reqAmou"
                      className="input-field"
                      value={requestedAmount}
                      onChange={handleRequestedAmountChange}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="label" htmlFor="reqAmou">
                      Points Avaiable
                    </label>
                    <div id="currentDate" className="input-field">
                      {Balance}
                    </div>
                    <div>
                      <label className="label" htmlFor="imageInput"> Requested Points</label>
                      <input
                        type="text"
                        id="reqAmou"
                        className="input-field"
                        placeholder="5000"
                      />
                    </div>
                  </div>
                )}


              </div>
            </DialogContent>
            <DialogActions className="button-container">
              <Button onClick={togglePopup} color="primary">
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitRedemptionRequest}
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
                  <th scope="col">Req Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((request) => (
                  <tr key={request.RequestID}>
                    <td>{request.RequestID}</td>
                    {/* <td>{request.RequestDate}</td> */}
                    <td>{new Date(request.RequestDate).toLocaleDateString("en-US")}</td>
                    <td>{request.PointsRequested}</td>
                    <td>{request.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>





















      </div>

    </div >
  )
}

export default Withdrawal
