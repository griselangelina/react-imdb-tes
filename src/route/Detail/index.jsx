import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { object } from 'prop-types';
import UserService from '../../services/UserService';

// redux
import { setFlash } from '../../redux/app/action';

// component
import ListItem from '../../components/ListItem';
import Button from '../../components/Button';

// styles
import './styles.scss';

Detail.propTypes = {
  flash: object,
};

export const parseQuery = (subject) => {
  const results = {};
  const parser = /[^&?]+/g;
  let match = parser.exec(subject);

  while (match !== null) {
    const parts = match[0].split('=');

    results[parts[0]] = parts[1];
    match = parser.exec(subject);
  }

  return results;
};

function Detail() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const objectLocation = parseQuery((location || {}).search) || /* istanbul ignore else */ {};
  const { id } = objectLocation;
  console.log('idid', id);
  const [dataDetail, setDataDetail] = useState(null);

  const loadUserList = (id) => {
    setLoading(true);
    setTimeout(() => {
      UserService.getDetail(id)
        .then((res) => {
          const { data } = res;
          setDataDetail(data);
          setLoading(false);
          if ((data || []).length === 0) setNoData(true);
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
    loadUserList(id);
  }, []);

  return (
    <div className="detail-wrapper">
      {!loading ? (
        <>
          <h2>Detail </h2>
          <Button text="Back" width={100} onClick={() => history.goBack()} />
          <div className="detail-header">
            <div className="img-wrapper">
              <img src={(dataDetail || {}).Poster || ''} />
            </div>
            <div>
              <p className="title-wrapper">
                <span className="title">{(dataDetail || {}).Title}</span>
                <span className="rated">{(dataDetail || {}).Rated}</span>
                <span className="rating">{(dataDetail || {}).imdbRating}</span>
              </p>
              <p>{(dataDetail || {}).Released}</p>
              <p>{(dataDetail || {}).Runtime}</p>
            </div>
          </div>
          <div className="plot-list">{(dataDetail || {}).Plot}</div>
          <ListItem title="Genre" content={(dataDetail || {}).Genre} />
          <ListItem title="Director" content={(dataDetail || {}).Director} />
          <ListItem title="Writer" content={(dataDetail || {}).Writer} />
          <ListItem title="stars" content={(dataDetail || {}).Actors} />
        </>
      ) : (
        <div className="text-center">loading data ...</div>
      )}
    </div>
  );
}

export default Detail;
