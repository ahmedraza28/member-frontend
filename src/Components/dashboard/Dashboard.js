import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Badge } from '@mui/material';

const Dashboard = () => {
    // const memberData = localStorage.getItem("userData");
    // const storedMemberData = JSON.parse(memberData);

    // const [anchorEl, setAnchorEl] = useState(null);
    // const [notification, setNotification] = useState(null);
    // // Retrieve the memberId from localStorage
    // const memberId = storedMemberData.MemberID
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!localStorage.getItem("userData")) {
    //         navigate('/login')
    //     }
    // }, []);

    const memberData = localStorage.getItem("userData");
    const storedMemberData = JSON.parse(memberData);

    const [anchorEl, setAnchorEl] = useState(null);
    const [notification, setNotification] = useState(null);
    const [referal, setReferal] = useState(null);

    const memberId = storedMemberData?.MemberID;
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!localStorage.getItem("userData")) {
    //         navigate('/login');
    //     }
    // }, []);
    useEffect(() => {
        const userData = localStorage.getItem("userData");
        // Check if userData is not present or does not have the expected structure
        if (!userData) {
            navigate('/login');
        }
    }, []);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };




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

    // useEffect(() => {
    //     // Make a GET request to the API using Axios
    //     axios.get(`http://localhost:3000/notification/${memberId}`)
    //         .then((response) => {
    //             setNotification(response.data); // Set the notification data when the response is received
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('An error occurred:', error);
    //         });
    // }, []);

    useEffect(() => {
        // Make a GET request to the API using Axios
        axios.get(`https://mlm-backend-mx3k.onrender.com/notification/${memberId}`)
            .then((response) => {
                setNotification(response.data); // Set the notification data when the response is received
                console.log(response.data);
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });

        // Check if memberId exists (you should handle cases where it doesn't exist)
        if (memberId) {
            const apiUrl = `https://mlm-backend-mx3k.onrender.com/members/total-recruits/${memberId}`;

            axios.get(apiUrl)
                .then((response) => {
                    setReferal(response.data.totalRecruits);
                    // console.log(referal);

                })
                .catch((error) => {
                    console.error('API Error:', error);
                });
        } else {
            navigate('/login');
            console.error('memberId not found in localStorage');
        }
    }, [memberId, navigate]);


    // Check if memberId exists (you should handle cases where it doesn't exist)
    // if (memberId) {
    //     const apiUrl = `http://localhost:3000/members/total-recruits/${memberId}`;

    //     axios.get(apiUrl)
    //         .then((response) => {
    //             setReferal(response.data.totalRecruits);
    //             // console.log(referal);

    //         })
    //         .catch((error) => {
    //             console.error('API Error:', error);
    //         });
    // } else {
    //     navigate('/login')
    //     console.error('memberId not found in localStorage');
    // }



    return (
        <div className="d-flex" id="wrapper">

            <Sidebar />


            <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex  align-items-center" >
                        <div className="d-flex align-items-center">
                            <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                            <h2 className="fs-2 m-0">Dashboard</h2>
                        </div>
                        {/* <div > */}

                        <Box sx={{ flexGrow: 1 }}>
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <Badge badgeContent={notification ? notification.length : 0} color="error">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px' }} className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.640 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                        </svg> {/* Use your custom SVG here */}
                                    </Badge>
                                </IconButton>

                                <Menu
                                    style={{ marginTop: '40px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <div >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <MenuItem onClick={handleClose}>
                                                <div style={{ marginLeft: '10px' }}>
                                                    {notification && notification.length > 0 ? (
                                                        notification.map((item) => (
                                                            <div key={item.id}>
                                                                {item.message}&nbsp;&nbsp;&nbsp;
                                                                {new Date(item.timestamp).toLocaleDateString("en-US")}
                                                                <br />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        'No notifications'
                                                    )}
                                                </div>
                                            </MenuItem>
                                        </div>
                                    </div>
                                </Menu>
                            </div>
                        </Box>
                        {/* </div> */}
                    </div>
                </nav>

                <div className="container-fluid px-4">
                    <div style={{ display: 'flex', justifyContent: "space-between" }} >
                        <div>
                            <h5 className="">Hello, {storedMemberData?.Name}</h5>
                        </div>
                        <div className=""> {storedMemberData?.Email}</div>
                    </div>
                    {/* </div> */}

                    <div className="row my-4">

                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm" >
                                <div className="card-body">
                                    <h5 className="card-title">Member id </h5>
                                    <div className="card-text">{storedMemberData?.MemberID}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm" >
                                <div className="card-body">
                                    <h5 className="card-title">Number of Referal </h5>
                                    <div className="card-text">{referal}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm" >
                                <div className="card-body">
                                    <h5 className="card-title">Balance</h5>
                                    <div className="card-text">{storedMemberData?.Balance}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm" >
                                <div className="card-body">
                                    <h5 className="card-title">Direct Commission</h5>
                                    <div className="card-text">{storedMemberData?.DirectCommision}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm" >
                                <div className="card-body">
                                    <h5 className="card-title">Level</h5>
                                    <div className="card-text">{storedMemberData?.Level}</div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Dashboard
