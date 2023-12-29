import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Search from "../../components/Search";
import Alert from "../../components/Alert";
import DataRow from "../../components/DataRow";
import Spinner from "../../components/Spinner";

const CountryRankings = ({ apiUrl, isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [currentPage, setCurrentPage] = useState('0-20');
  const years = [2015, 2016, 2017, 2018, 2019, 2020];
  
  
  const groupDataByCountry = (dataset) => {
    const obj = {};
    for (let i=0; i<dataset.length; i++) {
      const curr = dataset[i];
      if (!obj[curr['country']]) {
        obj[curr['country']] = {[curr['year']]: curr['rank']}
      } else {
        obj[curr['country']][curr['year']] = curr['rank'];
      }
    }

    return obj;
  }

  const getCountries = async() => {
    const url = `${apiUrl}/countries`;
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
      if (data.error) {
        setError(true);
        setMessage(data.message);
      }

      return data;
    })
    .catch((error) => console.log(error));
  }

  const getCountryRankings = async () => {
    const token = localStorage.getItem("token");
    const url = `${apiUrl}/rankings`;
    
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
  }

  useEffect(() => {
    setIsLoading(true);
    getCountries()
    .then(data => {
      if (data.error) {
        setError(true);
        setMessage(data.message);
      } else {
        setCountries(data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCountryRankings()
    .then(data => {
      if (data.error) {
        setError(true);
        setMessage(data.message);
      } else {
        const sortedData = data.sort((a,b) => 
        a['country'] === b['country'] 
        ? 0 
        : a['country'] > b['country'] ? 1 : -1)
        const temp = groupDataByCountry(sortedData);
        const keys = Object.keys(temp);
        setRankings(temp);
        setPagination(Array.from({ length : Math.ceil(keys.length / 20) }, (_, i) => {return { 'lower': i === 0 ? 0 : i * 20, 'upper': (i + 1) * 20 < keys.length ? (i + 1) * 20 : keys.length}}))
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, []);

  useEffect(() => {
    const filteredResults = Object.keys(rankings).filter(el => el.toLowerCase().startsWith(query.toLowerCase()));
    setPagination(Array.from({ length : Math.ceil(filteredResults.length / 20) }, (_, i) => {return { 'lower': i === 0 ? 0 : i * 20, 'upper': (i + 1) * 20 < filteredResults.length ? (i + 1) * 20 : filteredResults.length}}))
    setCurrentPage(`0-${filteredResults.length > 20 ? 20 : filteredResults.length}`)
  }, [rankings, query])

  const onPageChanged = (e) => {
    const { value } = e.target;
    setCurrentPage(value);
  }

  const countryElements = countries.map(el => {
    return <option value={el} style={{color: "hsla(216, 37%, 16%)"}}>{el}</option>
  })

  const pageElements = pagination.map(el => {
    return <option value={`${el['lower']}-${el['upper']}`} style={{color: "hsla(216, 37%, 16%)"}}>{`${el['lower'] + 1}-${el['upper']}`}</option>
  })

  const filteredRankings = Object.keys(rankings).filter(el => el.toLowerCase().startsWith(query.toLowerCase()));
  const rankingsWithinPage = filteredRankings.length > currentPage.split('-')[0]
  ? filteredRankings.slice(currentPage.split('-')[0], currentPage.split('-')[1]) 
  :  filteredRankings;

  const rankingElements = rankingsWithinPage.map((el, i) => {
    const countryRankings = [el, rankings[el][2015] || 'N/A', rankings[el][2016] || 'N/A', 
    rankings[el][2017] || 'N/A', rankings[el][2018] || 'N/A', 
    rankings[el][2019] || 'N/A', rankings[el][2020] || 'N/A']
    return <DataRow 
      data={countryRankings}
      styles={{backgroundColor: `${i % 2 ? "hsl(25, 76%, 63%)" : "hsl(25, 76%, 63%, 0.9)"}`, fontSize: "0.75rem"}}
    />
  })

  return (
      <Container fluid="sm" className="my-5">
        <Link to="/happiness-factors" className="fw-bold">View Happiness Factor Rankings <span><FontAwesomeIcon icon={faArrowRight} style={{color: "hsl(25, 76%, 63%)"}} /></span></Link>
        <h3 className="mt-3 fw-bold">Country Rankings</h3>
        { isLoggedIn 
          ? <>
          { error &&  <Alert type="error" message={message} onClose={() => setMessage("")}></Alert>}
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column gap-1 me-5">
              <label htmlFor="countries">Select a country:</label>
              <Search placeholder="Search..." dataList="countries" onSubmit={(myQuery) => setQuery(myQuery)} />
              <datalist 
                id="countries" 
                name="countries"
                className="p-2"
              >
                  {countryElements}
              </datalist>
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="pages">Select results from:</label>
              <select 
                id="pages" 
                name="page"
                value={currentPage}
                className="p-2"
                onChange={onPageChanged}
              >
                  {pageElements}
              </select>
            </div>
          </div>
          {isLoading
          ? <div className="vh-100 d-flex justify-content-center align-items-center"><Spinner message="Loading, please wait..."/></div>
          : rankingElements && rankingElements.length > 0 ? 
            <Col className="mt-5 rounded-3 overflow-auto">
              <DataRow 
                data={["Country", ...years.map(year => `${year} Ranking`)]}
                styles={{backgroundColor: "hsl(25, 76%, 63%)", fontSize: "0.9rem", fontWeight: "bold"}}
              />
              {rankingElements}
            </Col>
            : <div className="color-error | mt-5 fw-bold">Sorry! There are no results to display, please try again.</div>}
          </>
          : <p>You have to be logged in to view rankings. Click <Link to="/login" className="fw-bold">here</Link> to login if you already haven an account
          or register <Link to="/register" className="fw-bold">here</Link></p>
          }
      </Container>
  )
}

export default CountryRankings;