import React from 'react'
import { FaGift } from 'react-icons/fa'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
const Sidebar = () => {
        const memberData = localStorage.getItem("userData");
        const storedMemberData = JSON.parse(memberData);
        const navigate = useNavigate();
        const handleLogout = () => {
                // Remove 'userData' from local storage
                localStorage.removeItem('userData');
                navigate('/login')
                // You can also perform other logout-related actions here, such as redirecting the user to a login page
        };
        // console.log(storedMemberData.Name);
        return (
                <div className="bg-white" id="sidebar-wrapper">
                        <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
                                className="fas fa-user-secret me-2"></i>{storedMemberData?.Name}</div>
                        <div className="list-group list-group-flush my-3">
                                <Link to={'/'} className="list-group-item list-group-item-action bg-transparent second-text active"><i
                                        className="fas fa-tachometer-alt me-2"></i>Dashboard</Link>
                                <Link to={'/activity'} className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                        className="fas fa-paperclip me-2"></i>Activity</Link>
                                <Link to={'/withdrawal'} className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                                        <BiMoneyWithdraw /> Withdrawal</Link>
                                <div style={{ cursor: "pointer" }} onClick={handleLogout} className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"><i
                                        className="fas fa-power-off me-2"></i>Logout</div>
                        </div>
                </div>
        )
}

export default Sidebar
