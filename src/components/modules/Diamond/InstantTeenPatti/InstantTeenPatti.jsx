import { isDiamondSuspended } from "../../../../utils/isDiamondSuspended";

const InstantTeenPatti = ({ data }) => {
  return (
    <div className="casino-detail">
      <div className="teen1daycasino-container d-none-small">
        <div className="teen1dayleft">
          <div className="casino-box-row">
            <div className="casino-nation-name no-border casino-bl-box-title">
              <div className="playera">Player A</div>
            </div>
            <div className="casino-bl-box casino-bl-box-title">
              <div className="casino-bl-box-item">
                <b>Back</b>
              </div>
              <div className="casino-bl-box-item">
                <b>Lay</b>
              </div>
            </div>
          </div>
          <div className="casino-box-row">
            <div className="casino-nation-name">
              <b>Main</b>
              <div className="float-right">
                {/* <span className="mr-2 casino-book book-black">0</span>{" "} */}
                <i
                  data-toggle="collapse"
                  data-target="#range1"
                  aria-expanded="false"
                  className="fas fa-info-circle collapsed"
                />
                <div id="range1" className="icon-range collapse">
                  R:<span>100</span>-<span>200K</span>
                </div>
              </div>
            </div>
            <div className="casino-bl-box">
              <div
                className={`back casino-bl-box-item ${isDiamondSuspended(
                  data?.[0],
                  data?.[0]?.runners?.[0]
                )}`}
              >
                <span className="casino-box-odd">
                  {data[0]?.runners[0]?.back[0]?.price}
                </span>
              </div>
              <div
                className={`lay casino-bl-box-item ${isDiamondSuspended(
                  data?.[0],
                  data?.[0]?.runners?.[0]
                )}`}
              >
                <span className="casino-box-odd">
                  {data[0]?.runners[0]?.lay[0]?.price}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="teen1daycenter" />
        <div className="teen1dayright">
          <div className="casino-box-row">
            <div className="casino-nation-name no-border casino-bl-box-title">
              <div className="playerb">Player B</div>
            </div>
            <div className="casino-bl-box casino-bl-box-title">
              <div className="casino-bl-box-item">
                <b>Back</b>
              </div>
              <div className="casino-bl-box-item">
                <b>Lay</b>
              </div>
            </div>
          </div>
          <div className="casino-box-row">
            <div className="casino-nation-name">
              <b>Main</b>
              <div className="float-right">
                {/* <span className="mr-2 casino-book book-black">0</span>{" "} */}
                <i
                  data-toggle="collapse"
                  data-target="#range7"
                  aria-expanded="false"
                  className="fas fa-info-circle collapsed"
                />
                <div id="range7" className="icon-range collapse">
                  R:<span>100</span>-<span>200K</span>
                </div>
              </div>
            </div>
            <div className="casino-bl-box">
              <div
                className={`back casino-bl-box-item ${isDiamondSuspended(
                  data?.[0],
                  data?.[0]?.runners?.[1]
                )}`}
              >
                <span className="casino-box-odd">
                  {data[0]?.runners[1]?.back[0]?.price}
                </span>
              </div>
              <div
                className={`lay casino-bl-box-item ${isDiamondSuspended(
                  data?.[0],
                  data?.[0]?.runners?.[1]
                )}`}
              >
                <span className="casino-box-odd">
                  {data[0]?.runners[1]?.lay[0]?.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantTeenPatti;