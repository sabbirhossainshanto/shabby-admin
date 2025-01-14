import { useState } from "react";
import BetsDetails from "../../../components/Modal/BetsDetails";

const AccountStatementTable = ({ tableRef, statementData,searchUser }) => {
  const [showBetsModal,setShowBetsModal] = useState(false)
  const [marketId,setMarketId] = useState('')
  return (
   <>
    <div className="table no-footer table-hover table-responsive-sm">
      <table
        ref={tableRef}
        id="account-statement"
        role="table"
        aria-busy="false"
        aria-colcount="7"
        className="table b-table table-bordered"
      >
        <colgroup>
          <col style={{ width: "120px" }} />
          <col style={{ width: "80px" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "350px" }} />
          <col style={{ width: "120px" }} />
        </colgroup>
        <thead role="rowgroup" className="">
          {/*  <!----> */}
          <tr role="row" className="">
            <th
              role="columnheader"
              scope="col"
              tabIndex="0"
              aria-colindex="1"
              aria-sort="none"
              className="position-relative"
            >
              <div>Date</div>
              <span className="sr-only">(Click to sort ascending)</span>
            </th>
            <th
              role="columnheader"
              scope="col"
              tabIndex="0"
              aria-colindex="2"
              aria-sort="none"
              className="position-relative text-right"
            >
              <div>Sr No</div>
              <span className="sr-only">(Click to sort ascending)</span>
            </th>
            <th
              role="columnheader"
              scope="col"
              tabIndex="0"
              aria-colindex="3"
              aria-sort="none"
              className="position-relative text-right"
            >
              <div>Credit</div>
              <span className="sr-only">(Click to sort ascending)</span>
            </th>
            <th
              role="columnheader"
              scope="col"
              tabIndex="0"
              aria-colindex="4"
              aria-sort="none"
              className="position-relative text-right"
            >
              <div>Debit</div>
              <span className="sr-only">(Click to sort ascending)</span>
            </th>
            <th
              role="columnheader"
              scope="col"
              tabIndex="0"
              aria-colindex="5"
              aria-sort="none"
              className="position-relative text-right"
            >
              <div>Pts</div>
              <span className="sr-only">(Click to sort ascending)</span>
            </th>
            <th
              role="columnheader"
              scope="col"
              tabIndex="0"
              aria-colindex="6"
              aria-sort="none"
              className="position-relative"
            >
              <div>Remark</div>
              <span className="sr-only">(Click to sort ascending)</span>
            </th>
            <th
              role="columnheader"
              scope="col"
              tabIndex="0"
              aria-colindex="7"
              aria-sort="none"
              className="position-relative"
            >
              <div>Fromto</div>
              <span className="sr-only">(Click to sort ascending)</span>
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          {/*   <!----> */}
          {statementData?.map(
            (
              { credit, date, debit, fromto, pts, remark, statementType,marketId
              },
              i
            ) => {
       
              const handleSettledBets = (statementType) => {
           
                if(statementType === 'pnl'){
                  setMarketId(marketId)
                  setShowBetsModal(true)
                }
              };
              return (
                <tr
                  onClick={() => handleSettledBets(statementType)}
                  key={i}
                  role="row"
                  tabIndex="0"
                  aria-rowindex="1"
                  className="nocursor"
                  style={{
                    cursor: `${statementType === "pnl" ? "pointer" : ""}`,
                  }}
                >
                  <td aria-colindex="1" role="cell" className="">
                    {date}
                  </td>
                  <td aria-colindex="2" role="cell" className="">
                    <div className="text-right">{i + 1}</div>
                  </td>
                  <td aria-colindex="3" role="cell" className="">
                    <div className="text-right text-success">
                      <span>{credit}</span>
                    </div>
                  </td>
                  <td aria-colindex="4" role="cell" className="">
                    <div className="text-right text-danger">
                      <span>{debit}</span>
                    </div>
                  </td>
                  <td aria-colindex="5" role="cell" className="">
                    <div className="text-right text-success">
                      <span>{pts}</span>
                    </div>
                  </td>
                  <td aria-colindex="6" role="cell" className="">
                    <div>{remark}</div>
                  </td>
                  <td aria-colindex="7" role="cell" className="">
                    {fromto}
                  </td>
                </tr>
              );
            }
          )}

          {statementData?.length === 0 && (
            <tr role="row" className="b-table-empty-row">
              <td colSpan="12" role="cell" className="">
                <div role="alert" aria-live="polite">
                  <div className="text-center my-2">
                    There are no records to show
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  {
    showBetsModal && (
      <BetsDetails 
      setShowBetsModal={setShowBetsModal}
       marketId={marketId}
      searchUser={searchUser}
      />
    )
  }
   </>
  );
};

export default AccountStatementTable;
