import React from 'react'
import Sidebar from './Sidebar'
import './Commision.css'
const Commission = () => {
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
  return (
    <div className="d-flex" id="wrapper">
        
   <Sidebar/>
        
      
        <div id="page-content-wrapper">
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                <div className="d-flex align-items-center">
                    <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                    <h2 className="fs-2 m-0">Commision</h2>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      
                    </ul>
                </div>
            </nav> */}
            <h2 className='total'>Total No of Commision: <span className='spann'>4567</span></h2>
            <p>There are 3 Levels</p>
            
            <div className="container contains">

	<div className="table tab">
		<div className="table-header">
			<div className="header__item"><a id="name" class="filter__link" href="#">referal Members</a></div>
			<div className="header__item"><a id="wins" class="filter__link filter__link--number" href="#">Commision</a></div>

		</div>
		<div className="table-content">	
			<div className="table-row">		
				<div className="table-data">Hira</div>
				<div className="table-data">1500</div>
			
			</div>
			
		
		</div>	
	</div>
</div>
















            </div>

            </div>
  )
}

export default Commission
