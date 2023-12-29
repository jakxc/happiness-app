import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import DataRow from "../../components/DataRow";

const HappinessFactors = ({ apiUrl, isLoggedIn }) => {
  // const [country, setCountry] = useState("");
  const [factors, setFactors] = useState([]);
  const [year, setYear] = useState(2015);
  const [limit, setLimit] = useState(20);
  const [currentPage, setCurrentPage] = useState('0-20');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const years = [2015, 2016, 2017, 2018, 2019, 2020];
  const limits = Array.from({ length : 10 }, (_, i) => {return (i + 1) * 20 > 195 ? 195 : (i + 1) * 20})
  const pagination = Array.from({ length : Math.ceil(limit/20) }, (_, i) => {return { 'lower': i === 0 ? 0 : i * 20, 'upper': (i + 1) * 20 < limit ? (i + 1) * 20 : limit}})

  const getFactors = async(c, y, l) => {
    const url = `${apiUrl}/factors/${y}?limit=${l}${c.length > 0 ? `&country=${c}` : ""}`;
    const token = localStorage.getItem("token");
    
    return fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV"
     }
    })
    .then(res => res.json())
    .then(data => {
          return data;
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    setIsLoading(true);
    getFactors("", year, limit)
    .then(data => {
      if (data.error) {
        setError(true);
        setMessage(data.message);
      } else {
        setFactors(data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [year, limit]);

  const onYearChanged = (e) => {
    const { value } = e.target;
    setYear(value);
  }
  
  const onLimitChanged = (e) => {
    const { value } = e.target;
    setLimit(value);
    setCurrentPage('0-20'); // Reset to page 1
  }

  const onPageChanged = (e) => {
    const { value } = e.target;
    setCurrentPage(value);
  }

  const yearElements = years.map(el => {
    return <option value={el} style={{color: "hsl(216, 37%, 16%)"}}>{el}</option>
  })

  const limitElements = limits.map(el => {
    return <option value={el} style={{color: "hsl(216, 37%, 16%)"}}>{el}</option>
  })

  const paginationElements = pagination.map(el => {
    return <option value={`${el['lower']}-${el['upper']}`} style={{color: "hsl(216, 37%, 16%)"}}>{`${el['lower'] + 1}-${el['upper']}`}</option>
  })

  const factorElements = factors.slice(currentPage.split('-')[0], currentPage.split('-')[1]).map((el, i) => {
    const dataElements = [
    el['rank'], el['country'], el['score'], 
    el['economy'], el['family'], el['health'], 
    el['freedom'], el['generosity'], el['trust']
  ]
    return <DataRow 
      data={dataElements}
      styles={{backgroundColor: `${i % 2 ? "hsl(25, 76%, 63%)" : "hsl(25, 76%, 63%, 0.9)"}`, fontSize: "0.75rem"}}
    />
  })

  return (
      <Container fluid="sm" className="my-5">
         <Link to="/country-rankings" className="fw-bold">View Country Rankings <span><FontAwesomeIcon icon={faArrowRight} style={{color: "hsl(25, 76%, 63%)"}} /></span></Link>
          <h3 className="mt-3 fw-bold">Happiness Factor Rankings</h3>
          { isLoggedIn ? 
            <>
              { message &&  <Alert type={error ? "error" : "success"} message={message} onClose={() => setMessage("")}></Alert>}
              <div className="d-flex justify-content-between">
                <div className="d-flex gap-3 me-5">
                  <div className="d-flex flex-column gap-1">
                      <label htmlFor="years">Select a year:</label>
                      <select 
                        id="years" 
                        name="years"
                        value={year}
                        className="p-2"
                        onChange={onYearChanged}
                      >
                          {yearElements}
                      </select>
                  </div>
                  <div className="d-flex flex-column gap-1">
                      <label htmlFor="limit">Limit maximum results to:</label>
                      <select 
                        id="limit" 
                        name="limit"
                        value={limit}
                        className="p-2"
                        onChange={onLimitChanged}
                      >
                          {limitElements}
                      </select>
                  </div>
                </div>
                <div className="d-flex flex-column gap-1">
                    <label htmlFor="page">Select results from:</label>
                    <select 
                      id="page" 
                      name="page"
                      value={currentPage}
                      className="p-2"
                      onChange={onPageChanged}
                    >
                        {paginationElements}
                    </select>
                </div>
              </div>
              {isLoading
                ? <div className="vh-100 d-flex justify-content-center align-items-center"><Spinner message="Loading, please wait..."/></div>
                : factorElements.length > 0 ? <Col className="mt-5 rounded-3 overflow-hidden">
                    <DataRow 
                      data={["Rank", "Country", "Score", "Economy", "Family", "Health", "Freedom", "Generosity", "Trust"]}
                      styles={{backgroundColor: "hsl(25, 76%, 63%)", fontSize: "0.9rem", fontWeight: "bold"}}
                    />
                    {factorElements}
                  </Col> : <div className="color-error | mt-5 fw-bold">Sorry! There are currently no results to display on this page, please try again later.</div>
              }
            </> 
            : <p>You have to be logged in to view rankings. Click <Link to="/login" className="fw-bold">here</Link> to login if you already haven an account
             or register <Link to="/register" className="fw-bold">here</Link></p>
          }
      </Container>
  )
}

export default HappinessFactors;