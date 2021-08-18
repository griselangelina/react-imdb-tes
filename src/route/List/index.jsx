import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';

import { object } from 'prop-types';
import UserService from '../../services/UserService';

// redux
import { setFlash } from '../../redux/app/action';

// component
import Card from '../../components/Card';
import Text from '../../components/Text';
import Button from '../../components/Button';

// styles
import './style.scss';

List.propTypes = {
  flash: object,
};

function List() {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');
  // const [textSearch, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const layoutRef = useRef(null);

  window.onscroll = () => {
    if (document.documentElement.scrollHeight === document.documentElement.offsetHeight) {
      if (!noData) {
        loadUserList(type, page);
      }
    }
  };

  const loadUserList = (type, page) => {
    let types = type ? type : 'Batman';

    setLoading(true);
    setTimeout(() => {
      UserService.getList(types, page)
        .then((res) => {
          const { data } = res;
          const { Search, Error, Response } = data || {};

          if (Response === 'True') {
            const newPage = page + 1;
            const newList = userList.concat(Search);
            setUserList(newList);
            setPage(newPage);
            if ((Search || []).length === 0) setNoData(true);
          } else if (Error !== '') {
            setNoData(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1500);
  };

  useEffect(() => {
    loadUserList(type, page);
  }, []);

  useEffect(() => {
    if ((userList || []).length <= 0) {
      setPage(1);
      loadUserList(type, page);
    }
  }, [userList]);

  const handleClick = () => {
    setUserList([]);
  };

  const handleChangeInput = (e) => {
    setType(e.target.value);
  };


  return (
    <div className="list-wrapper" ref={layoutRef}>
      <div className="search-wrapper">
        <span> Filter by Movie Name: </span>
        <Text onInputChange={handleChangeInput} />
        <Button text="search" onClick={() => handleClick()} />
      </div>
      <div className="content-wrapper">
        {userList.map((user, i) => (
          <div key={`data-${i}`}>
            <Card title={user.Title} year={user.Year} imageUrl={user.Poster} url={`/detail?id=${user.imdbID}`} />
          </div>
        ))}
        {loading ? <div className="text-center">loading data ...</div> : ''}
        {noData ? <div className="text-center">no data</div> : ''}
      </div>
    </div>
  );
}

export default List;
