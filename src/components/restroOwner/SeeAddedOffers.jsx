import { useEffect, useState } from "react";
import axios from "axios";

const SeeAddedOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isload, setIsload] = useState(false);

  const getAllMyOffers = async () => {
    setIsload(true);
    const res = await axios.get(
      "/offer/getofferbyuserid/" + localStorage.getItem("id")
    );
    console.log(res.data);
    setOffers(res.data.data);
    setIsload(false);
  };
  useEffect(() => {
    console.log(localStorage.getItem("id"));

    getAllMyOffers();
  }, []);
  return (
    <div>
      <div>{isload && <Loader />}</div>
      <div>
        {offers?.map((offer) => (
          <div>
            {
              <div>
                <img
                  style={{ height: 100, width: 100 }}
                  src={offer?.imageURL}
                ></img>
                <h1>{offer?.restroName}</h1>
                <h4>{offer?.offer}</h4>
                <p>{offer?.description}</p>
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeAddedOffers;
