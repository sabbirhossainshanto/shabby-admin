import { useParams } from "react-router-dom";
import MyBets from "./MyBets";
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../utils/config";
import MatchOdds from "../../components/OddsSection/MatchOdds";
import Bookmaker from "../../components/OddsSection/Bookmaker";
import FancyOne from "../../components/OddsSection/FancyOne";
import Normal from "../../components/OddsSection/Normal";
import UseTokenGenerator from "../../hooks/UseTokenGenerator";
import UseEncryptData from "../../hooks/UseEncryptData";
import useIFrame from "../../hooks/useIFrame";
import useExposer from "../../hooks/useExposer";
import Bookmaker2 from "../../components/OddsSection/Bookmaker2";
import useCurrentBets from "../../hooks/useCurrentBets";

const GameDetails = () => {
  const { eventTypeId, eventId } = useParams();
  const oddsApi = config?.result?.endpoint?.odds;
  const interval = config?.result?.settings?.interval;
  const [data, setData] = useState([]);
  const [match_odds, setMatch_odds] = useState([]);
  const [bookmarker, setBookmarker] = useState([]);
  const [bookmarker2, setBookmarker2] = useState([]);
  const [normal, setNormal] = useState([]);
  const [fancy1, setFancy1] = useState([]);
  const token = localStorage.getItem("adminToken");
  const hasVideo = match_odds?.length > 0 && match_odds[0]?.hasVideo;
  const isHasVideo = hasVideo ? true : false;
  const { exposer } = useExposer(eventId);
  /* get iframe */
  // console.log(exposer);
  const { iFrameUrl } = useIFrame(eventTypeId, eventId, isHasVideo);
  const { myBets, refetchCurrentBets } = useCurrentBets(eventId);
  // console.log(data);
  /* Get game details */
  useEffect(() => {
    const getGameDetails = async () => {
      const generatedToken = UseTokenGenerator();
      const encryptedData = UseEncryptData({ token: generatedToken });
      const res = await axios.post(
        `${oddsApi}/${eventTypeId}/${eventId}`,
        encryptedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      if (data.success) {
        setData(data.result);
      }
    };
    getGameDetails();
    const intervalId = setInterval(getGameDetails, interval);
    return () => clearInterval(intervalId);
  }, [oddsApi, eventTypeId, eventId, interval, token]);

  /* Filtered all the game  */
  useEffect(() => {
    const filterMatch_odds = data.filter(
      (match_odd) => match_odd.btype === "MATCH_ODDS"
    );
    setMatch_odds(filterMatch_odds);

    const bookmarkerFilter = data.filter(
      (bookmarker) => bookmarker.btype === "BOOKMAKER"
    );
    setBookmarker(bookmarkerFilter);

    const filterBookmarker2 = data.filter(
      (bookmarker2) => bookmarker2.btype === "BOOKMAKER2"
    );
    setBookmarker2(filterBookmarker2);

    const normalFilter = data.filter(
      (normal) => normal.btype === "FANCY" && normal.tabGroupName === "Normal"
    );
    setNormal(normalFilter);

    const fancy1Filter = data.filter(
      (fancy1) => fancy1.btype === "ODDS" && fancy1.tabGroupName === "Fancy1"
    );
    setFancy1(fancy1Filter);

    // const overByOverFilter = data.filter(
    //   (overByOver) =>
    //     overByOver.btype === "FANCY" &&
    //     overByOver.tabGroupName === "Over By Over"
    // );
    // setOverByOver(overByOverFilter);
  }, [data]);
 

  useEffect(() => {
    const intervalId = setInterval(refetchCurrentBets, 10000);
    return () => clearInterval(intervalId);
  }, [interval, refetchCurrentBets]);

  return (
    <div data-v-b00d14ae="" className="page-content">
      <div data-v-b00d14ae="">
        <div data-v-b00d14ae="" className="detail-page-container">
          <div className="center-main-container">
            <div className="center-content">
              <div className="game-header sport4">
                <span className="game-header-name">{data[0]?.eventName}</span>
                <span>
                  <span>{data[0]?.openDate}</span>
                </span>
              </div>

              <div className="market-container">
                {match_odds && match_odds.length > 0 && (
                  <div className="market-4">
                    <MatchOdds match_odds={match_odds} exposer={exposer} />
                  </div>
                )}
                {bookmarker && bookmarker.length > 0 && (
                  <div className="market-4">
                    <Bookmaker bookmarker={bookmarker} exposer={exposer} />
                  </div>
                )}
                {bookmarker2 && bookmarker2.length > 0 && (
                  <div className="market-4">
                    <Bookmaker2 bookmaker2={bookmarker2} exposer={exposer} />
                  </div>
                )}

                {normal && normal.length > 0 && (
                  <div className="market-6">
                    <Normal normal={normal} exposer={exposer} />
                  </div>
                )}
                {fancy1 && fancy1.length > 0 && (
                  <div className="market-6">
                    <FancyOne fancyOne={fancy1} exposer={exposer} />
                  </div>
                )}
              </div>
            </div>

            <div data-simplebar="init" className="right-sidebar">
              <MyBets
                myBets={myBets}
                refetchCurrentBets={refetchCurrentBets}
                iFrameUrl={iFrameUrl}
                match_odds={match_odds}
                eventTypeId={eventTypeId}
                eventId={eventId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
