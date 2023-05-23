import { useEffect, useState } from "react";

import Carousel from "react-bootstrap/Carousel";
import NewsService from "../service/news";

export function HomePage() {
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState(null);

  useEffect(() => {
    getNewsFromServer();
  }, []);

  const getNewsFromServer = () => {
    setLoading(true);
    NewsService.list(0)
      .then((res) => {
        console.log(res);
        if (res.error) {
          return;
        }
        setNewsList(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Carousel>
        {newsList?.totalPages > 0 ? (
          newsList?.content?.map((news, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={
                  news.imgUrl
                    ? news.imgUrl
                    : "https://f.partnerkin.com/uploads/storage/files/file_1622032085.gif"
                }
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>{news.header}</h3>
                <p>{news.text}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://f.partnerkin.com/uploads/storage/files/file_1622032085.gif"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
}
