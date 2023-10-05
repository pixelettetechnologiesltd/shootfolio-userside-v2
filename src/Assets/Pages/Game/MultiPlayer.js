import { React, useEffect, useMemo, useState } from "react";
import { Row, Container, Col, Button, Image } from "react-bootstrap";
import { images } from "../../../Images";
import Playpopup from "../../Components/Playpopup";
import Menupopup from "../../Components/Menupopup";
import Form from "react-bootstrap/Form";
import "../../Css/Game/MultiPlayer.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { BiFootball } from "react-icons/bi";
import { Menu } from "@material-ui/core";
import {
  BuyCoin,
  GetAllCoin,
  GetSingleGame,
  BorrowAmount,
  SellCoin,
  UpdateCoin,
  LeaveGame,
  GetBorrowAmount,
  GetRemaningAmount,
  clearErrors,
  clearMessages,
  postPassBall,
  postShootBall,
  postTackleBall,
} from "../../../store/actions";
import { Puff } from "react-loader-spinner";
import { toast } from "react-hot-toast";

const Play = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupEx, setButtonPopupEx] = useState(false);
  const [buttonPopupBor, setButtonPopupBor] = useState(false);
  const [buttonPopupMen, setButtonPopupMen] = useState(false);
  const [borrowAmount, setBorrowAmount] = useState(0);
  const [loginUserBalance, setLoginUserBalance] = useState(0);
  const [passMenuOpenRef, setPassMenuOpenRef] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [totalAsset, setTotalAsset] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    singleGameData,
    loading,
    coin,
    errors: error,
    message,
    sessionExpireError,
    buyLoading,
    sellLoading,
    borrowAmount: borrowAmounts,
    remaningAmount,
    updateLoading,
  } = useSelector((s) => s.clubReducer);
  const {
    errors: leaveGameError,
    message: leaveGameMessage,
    loading: leaveLoading,
  } = useSelector((state) => state.gameTypeReducer);
  const {
    errors: multiPlayerReducerError,
    message: multiPlayerReducerMessage,
    sessionExpireError: multiPlayerReducerSessionExpireError,
    loading1,
    loading2,
    loading3,
  } = useSelector((s) => s.multiPlayerReducer);
  const navigate = useNavigate();

  const [buySellValue, setBuySellValue] = useState(1);
  const [goingtoUpdateValue, setGoingtoUpdateValue] = useState(1);
  // console.log("singleGameData is", singleGameData);
  const userId = JSON.parse(sessionStorage.getItem("user") ?? "{}").id;

  const isMySideIsRival = useMemo(
    () =>
      Boolean(
        singleGameData?.rivalProtfolios &&
          singleGameData.rivalProtfolios?.find((r) => r?.user?.id === userId)
      ),
    [singleGameData.rivalProtfolios, userId]
  );
  console.log("isMySideIsRival is", isMySideIsRival);
  const isMyTeamHasBall = useMemo(
    () =>
      isMySideIsRival
        ? Boolean(
            singleGameData?.rivalProtfolios &&
              singleGameData.rivalProtfolios?.find((r) => r?.ball)
          )
        : Boolean(
            singleGameData?.challengerProtfolios &&
              singleGameData.challengerProtfolios?.find((r) => r?.ball)
          ),
    [singleGameData, isMySideIsRival]
  );

  console.log("isMyTeamHasBall", isMyTeamHasBall);
  const isIHaveBall = useMemo(
    () =>
      [
        ...(singleGameData?.rivalProtfolios ?? []),
        ...(singleGameData?.challengerProtfolios ?? []),
      ].find((r) => r?.user?.id === userId)?.ball,
    [
      singleGameData?.challengerProtfolios,
      singleGameData?.rivalProtfolios,
      userId,
    ]
  );

  console.log("isIHaveBall is", isIHaveBall);
  const myIndexNumberInMyTeam = useMemo(
    () =>
      isMySideIsRival
        ? singleGameData?.rivalProtfolios &&
          singleGameData.rivalProtfolios?.findIndex(
            (r) => r?.user?.id === userId
          )
        : singleGameData?.challengerProtfolios &&
          singleGameData.challengerProtfolios?.findIndex(
            (r) => r?.user?.id === userId
          ),
    [
      isMySideIsRival,
      singleGameData.challengerProtfolios,
      singleGameData.rivalProtfolios,
      userId,
    ]
  );

  console.log("myIndexNumberInMyTeam", myIndexNumberInMyTeam);
  const [goingtoUpdatePortfolioId, setGoingtoUpdatePortfolioId] = useState(
    singleGameData?.rivalProtfolios?.find((r) => r?.user?.id === userId)?._id ||
      singleGameData?.challengerProtfolios?.find((r) => r?.user?.id === userId)
        ?._id
  );
  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (leaveGameError.length > 0) {
      toast.error(leaveGameError);
      dispatch(clearErrors());
    }
    if (sessionExpireError !== "") {
      toast.error(sessionExpireError);
      dispatch(clearErrors());
      setTimeout(() => navigate("/"), 1000);
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      setButtonPopupEx(false);
      setButtonPopup(false);
      setButtonPopupBor(false);
    }
    if (leaveGameMessage !== "") {
      toast.success(leaveGameMessage);
      dispatch(clearMessages());
      setTimeout(() => navigate("/gamehome"), 2000);
    }
  }, [error, sessionExpireError, leaveGameError, leaveGameMessage, message]);

  useEffect(() => {
    if (multiPlayerReducerError.length > 0) {
      toast.error(multiPlayerReducerError);
      dispatch(clearErrors());
    }
    if (multiPlayerReducerSessionExpireError !== "") {
      toast.error(multiPlayerReducerSessionExpireError);
      dispatch(clearErrors());
      setTimeout(() => navigate("/"), 1000);
    }
    if (multiPlayerReducerMessage !== "") {
      toast.success(multiPlayerReducerMessage);
      dispatch(clearMessages());
    }
  }, [
    dispatch,
    multiPlayerReducerError,
    multiPlayerReducerMessage,
    multiPlayerReducerSessionExpireError,
    navigate,
  ]);

  // buy sell
  const handlePopup = (clickedUserId) => {
    if (clickedUserId !== userId) return;
    setButtonPopupEx(true);
  };

  const handleBuy = () => {
    dispatch(
      BuyCoin({
        id: id,
        portfolio:
          singleGameData?.rivalProtfolios?.find((r) => r?.user?.id === userId)
            ?.portfolio?.id ||
          singleGameData?.challengerProtfolios?.find(
            (r) => r?.user?.id === userId
          )?.portfolio?.id,
        quantity: buySellValue,
        player: singleGameData?.rivalProtfolios?.find(
          (r) => r?.user?.id === userId
        )
          ? "rival"
          : "challenger",
      })
    );
  };
  const handleSell = () => {
    dispatch(
      SellCoin({
        id: id,
        portfolio:
          singleGameData?.rivalProtfolios?.find((r) => r?.user?.id === userId)
            ?.portfolio?.id ||
          singleGameData?.challengerProtfolios?.find(
            (r) => r?.user?.id === userId
          )?.portfolio?.id,
        quantity: buySellValue,
        player: singleGameData?.rivalProtfolios?.find(
          (r) => r?.user?.id === userId
        )
          ? "rival"
          : "challenger",
      })
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (
        singleGameData?.challenger === null ||
        !singleGameData?.rival === null
      ) {
        navigate("/profile");
      }
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(GetAllCoin());
  }, [dispatch]);

  // GetSingleGame
  useEffect(() => {
    if (id) {
      dispatch(
        GetSingleGame(id, null, () => {
          navigate("/profile", { replace: true });
        })
      );
    } else {
      navigate("/profile", { replace: true });
    }
  }, [dispatch, id, navigate]);

  const handlePercentageDiv = (clickedUserId) => {
    console.log(clickedUserId, userId);
    if (clickedUserId !== userId) return;
    setButtonPopup(true);
    let loginUserPortfolio;
    const challengerUser = singleGameData?.challengerProtfolios.find(
      (challengerUser) => challengerUser?.portfolio?.user?.email === user?.email
    );
    if (challengerUser) {
      loginUserPortfolio = challengerUser;
    } else {
      const rivalUser = singleGameData?.rivalProtfolios.find(
        (rivalUser) => rivalUser?.portfolio?.user?.email === user?.email
      );
      if (rivalUser) {
        loginUserPortfolio = rivalUser;
      } else {
        loginUserPortfolio = null;
      }
    }
    setLoginUserBalance(loginUserPortfolio?.balance);
  };

  useEffect(() => {
    if (singleGameData) {
      let loginUserPortfolio;
      const challengerUser = singleGameData?.challengerProtfolios?.find(
        (challengerUser) =>
          challengerUser?.portfolio?.user?.email === user?.email
      );
      if (challengerUser) {
        loginUserPortfolio = challengerUser;
      } else {
        const rivalUser = singleGameData?.rivalProtfolios?.find(
          (rivalUser) => rivalUser?.portfolio?.user?.email === user?.email
        );
        if (rivalUser) {
          loginUserPortfolio = rivalUser;
        } else {
          loginUserPortfolio = null;
        }
      }
      setLoginUserBalance(loginUserPortfolio?.balance);
    }

    if (singleGameData.id) {
      let loginUserPortfolio;
      let isChallenger = false;
      const challengerUser = singleGameData?.challengerProtfolios?.find(
        (challengerUser) =>
          challengerUser?.portfolio?.user?.email === user?.email
      );
      if (challengerUser) {
        loginUserPortfolio = challengerUser;
        isChallenger = true;
      } else {
        const rivalUser = singleGameData?.rivalProtfolios?.find(
          (rivalUser) => rivalUser?.portfolio?.user?.email === user?.email
        );
        if (rivalUser) {
          loginUserPortfolio = rivalUser;
        } else {
          loginUserPortfolio = null;
        }
      }

      let result = {
        gameId: singleGameData?.id,
        portfolio: loginUserPortfolio?.portfolio?.id,
        player: isChallenger ? "challenger" : "rival",
      };
      dispatch(GetBorrowAmount(result));
      dispatch(GetRemaningAmount(result));
    }

    if (
      singleGameData?.challengerProtfolios &&
      singleGameData?.rivalProtfolios
    ) {
      if (singleGameData?.challenger?.email === user?.email) {
        if (singleGameData?.challengerProtfolios?.length > 0) {
          let sum = 0;

          singleGameData.challengerProtfolios?.forEach((product) => {
            sum += product.portfolio.coin.quote.USD.price * product?.quantity;
          });
          setTotalAsset(sum);
        }
      } else {
        if (singleGameData?.rivalProtfolios?.length > 0) {
          let sum = 0;

          singleGameData.rivalProtfolios?.forEach((product) => {
            sum += product.portfolio.coin.quote.USD.price * product?.quantity;
          });
          setTotalAsset(sum);
        }
      }
    }
  }, [singleGameData]);
  const handleUpdate = () => {
    dispatch(
      UpdateCoin({
        id: id,
        currentPortfolio:
          singleGameData?.rivalProtfolios?.find((r) => r?.user?.id === userId)
            ?.portfolio?.id ||
          singleGameData?.challengerProtfolios?.find(
            (r) => r?.user?.id === userId
          )?.portfolio?.id,
        newPortfolio: goingtoUpdatePortfolioId,
        quantity: goingtoUpdateValue,
        player: singleGameData?.rivalProtfolios?.find(
          (r) => r?.user?.id === userId
        )
          ? "rival"
          : "challenger",
      })
    );
  };
  const user = JSON.parse(sessionStorage.getItem("user"));
  const handleBorrow = () => {
    if (!borrowAmount) {
      return toast.error("Amount is required");
    } else {
      let loginUserPortfolio;
      let isChallenger = false;
      const challengerUser = singleGameData?.challengerProtfolios.find(
        (challengerUser) =>
          challengerUser?.portfolio?.user?.email === user?.email
      );
      if (challengerUser) {
        loginUserPortfolio = challengerUser;
        isChallenger = true;
      } else {
        const rivalUser = singleGameData?.rivalProtfolios.find(
          (rivalUser) => rivalUser?.portfolio?.user?.email === user?.email
        );
        if (rivalUser) {
          loginUserPortfolio = rivalUser;
        } else {
          loginUserPortfolio = null;
        }
      }
      let result = {
        id: singleGameData?.id,
        portfolio: loginUserPortfolio?.portfolio?.id,
        amount: Number(borrowAmount),
        player: isChallenger ? "challenger" : "rival",
      };
      dispatch(BorrowAmount(result));
      setBorrowAmount("");
    }
  };

  const handleGameLeave = () => {
    let result = {
      gameId: singleGameData?.id,
      player:
        singleGameData?.challenger?.email === user?.email
          ? "challenger"
          : "rival",
    };
    dispatch(LeaveGame(result));
  };
  const handleOpenBorrow = () => {
    setButtonPopupBor(true);
  };

  return loading ? (
    <div className="loader">
      <Puff
        height="60"
        width="60"
        radius="6"
        color="white"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  ) : (
    <div className="playbackgroundimag">
      <Container>
        <Row className="addspaceforplayfirstrow">
          <Col md={1}>
            <Button
              className="hamburgontopgame"
              onClick={() => setButtonPopupMen(true)}
            >
              <GiHamburgerMenu />
            </Button>
          </Col>
          <Col md={9}></Col>
          <Col md={2}>
            <p className="upperheadingstopright">Total Team Portfolio</p>
            <p className="upperheadingstopright">
              <span className="upperheadtoprightvalue">
                ${parseFloat(totalAsset).toFixed(2)}
              </span>
            </p>
            <p className="upperheadingstopright">
              Current Balance:{" "}
              <span className="upperheadtoprightvalue">
                ${parseFloat(loginUserBalance).toFixed(2)}
              </span>
            </p>
            <p className="upperheadingstopright">
              Borrowing Rate:{" "}
              <span className="upperheadtoprightvalue"> 5%</span>
            </p>
            <p className="upperheadingstopright">
              Borrowing Returned:{" "}
              <span className="upperheadtoprightvalue">
                ${borrowAmounts - remaningAmount}
              </span>
            </p>
            <Button
              className="rightsideborrowbtn"
              onClick={() => handleOpenBorrow()}
            >
              Borrow
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            {singleGameData?.rivalProtfolios?.length > 0 &&
              singleGameData.rivalProtfolios.map((data, ind) => {
                return (
                  <Button
                    className="leftplaybuttonhover"
                    onClick={() => handlePopup(data?.user?.id)}
                    key={ind}
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <Image
                      crossOrigin="true"
                      height={"25%"}
                      width={"25%"}
                      src={
                        data?.portfolio?.coin?.photoPath &&
                        data.portfolio.coin.photoPath
                      }
                    />
                    <p className="playrank">
                      ${" "}
                      {data?.portfolio?.coin?.quote?.USD?.price &&
                        parseFloat(
                          data.portfolio.coin.quote.USD.price * data?.quantity
                        ).toFixed(2)}{" "}
                    </p>
                  </Button>
                );
              })}
          </Col>

          <Col md={3}></Col>
          <Col md={2}>
            <div className="hover-text">
              <span class="tooltip-text" id="bottom">
                <ul>
                  <li>
                    Goals are awarded based on your portfolio's performance
                    compared to your opponent's portfolio.
                  </li>
                  <li>
                    Whenever you change your digital assets (buy/sell) the game
                    checks both players' portfolio performance, and whoever
                    perform better get a goal
                  </li>
                  <li>
                    Additionally, after 24 hours for idle game modes, the game
                    evaluates both players' portfolio performance again, and the
                    one with better performance scores a goal.
                  </li>
                  <li>
                    Strive for better portato performance to increase your
                    chances of scoring more goals and outperforming your
                    opponent!
                  </li>
                </ul>
              </span>
              <div className="maketimeinrowplayground">
                <div className="tmplayground">
                  <p className="timetextplayground">
                    {" "}
                    {singleGameData?.rivalClub?.symbol &&
                      singleGameData.rivalClub?.symbol}
                  </p>
                </div>
                <div className="zhplayground">
                  <p className="timetextplayground">
                    {" "}
                    {singleGameData?.challengerClub &&
                      singleGameData.challengerClub?.symbol}
                  </p>
                </div>
              </div>
              <div className="maketimeinrowplayground">
                <div className="timehour">
                  <p className="hourplayground">
                    {" "}
                    {singleGameData?.rivalGoals && singleGameData.rivalGoals}
                  </p>
                </div>
                <div className="timehour">
                  <p className="hourplayground">
                    {singleGameData?.challengerGoals &&
                      singleGameData.challengerGoals}
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}></Col>
          <Col md={2}>
            {singleGameData?.challengerProtfolios?.length > 0 &&
              singleGameData.challengerProtfolios.map((data, ind) => {
                return (
                  <Button
                    className="leftplaybuttonhover"
                    onClick={() => handlePopup(data?.user?.id)}
                    key={ind}
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <p className="playrankwhite">
                      $
                      {data?.portfolio?.coin?.quote?.USD?.price &&
                        parseFloat(
                          data.portfolio.coin.quote.USD.price * data?.quantity
                        ).toFixed(2)}
                    </p>
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        data?.portfolio?.coin?.photoPath &&
                        data.portfolio.coin.photoPath
                      }
                    />
                  </Button>
                );
              })}
          </Col>
        </Row>

        <Row className="margsettomakeinline">
          {/* rival 0 */}
          <Col md={1} className="removepaddfrombtn margletbtnsetplayinrow">
            {singleGameData.rivalProtfolios &&
              singleGameData.rivalProtfolios[0] && (
                <Button
                  className="playerclickpopupbutton"
                  onClick={() =>
                    handlePercentageDiv(
                      singleGameData?.rivalProtfolios?.length > 0 &&
                        // singleGameData.rivalProtfolios[0]?.portfolio?.user?.id
                        singleGameData?.rivalProtfolios?.find(
                          (r) => r?.role === "GK"
                        )?.portfolio?.user?.id
                    )
                  }
                >
                  <div className="playerimagedivplay">
                    <Image src={images.playertwo} width="55%" />
                  </div>
                  <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        singleGameData?.rivalProtfolios?.find(
                          (r) => r?.role === "GK"
                        )?.portfolio?.coin?.photoPath
                      }
                    />
                    <p
                      className={`iunderhead ${
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.rivalProtfolios[0]?.portfolio?.coin
                          //   ?.quote?.USD?.percent_change_24h
                          singleGameData?.rivalProtfolios?.find(
                            (r) => r?.role === "GK"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2) >= 0
                          ? "green"
                          : "red"
                      }`}
                    >
                      {singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          singleGameData?.rivalProtfolios?.find(
                            (r) => r?.role === "GK"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  </div>
                  {singleGameData?.rivalProtfolios &&
                    singleGameData?.rivalProtfolios?.find(
                      (r) => r?.role === "GK"
                    )?.ball && (
                      <div className="football">
                        <BiFootball />
                      </div>
                    )}
                </Button>
              )}
          </Col>
          {/* rival 1 */}
          <Col md={1} className="removepaddfrombtn marginsetforbuttontwoinrow">
            {singleGameData.rivalProtfolios &&
              singleGameData.rivalProtfolios[1] && (
                <Button
                  className="playerclickpopupbutton"
                  onClick={() =>
                    handlePercentageDiv(
                      singleGameData?.rivalProtfolios?.length > 0 &&
                        // singleGameData.rivalProtfolios[1]?.portfolio?.user?.id
                        singleGameData?.rivalProtfolios?.find(
                          (r) => r?.role === "DF"
                        )?.portfolio?.user?.id
                    )
                  }
                >
                  <div className="playerimagedivplay">
                    <Image src={images.playerfive} width="55%" />
                  </div>
                  <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        // singleGameData.rivalProtfolios[1]?.portfolio?.coin
                        //   ?.photoPath
                        singleGameData?.rivalProtfolios?.find(
                          (r) => r?.role === "DF"
                        )?.portfolio?.coin?.photoPath
                      }
                    />
                    <p
                      className={`iunderhead ${
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.rivalProtfolios[1]?.portfolio?.coin
                          //   ?.quote?.USD?.percent_change_24h
                          singleGameData?.rivalProtfolios?.find(
                            (r) => r?.role === "DF"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2) >= 0
                          ? "green"
                          : "red"
                      }`}
                    >
                      {" "}
                      {singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.rivalProtfolios[1]?.portfolio?.coin
                          //   ?.quote?.USD?.percent_change_24h
                          singleGameData?.rivalProtfolios?.find(
                            (r) => r?.role === "DF"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  </div>
                  {singleGameData?.rivalProtfolios &&
                    singleGameData?.rivalProtfolios?.find(
                      (r) => r?.role === "DF"
                    )?.ball && (
                      <div className="football">
                        <BiFootball />
                      </div>
                    )}
                </Button>
              )}
          </Col>
          <Col md={2}></Col>
          {/* rival 3 */}
          <Col md={1} className="removepaddfrombtn margsetforthirdinrow">
            {singleGameData.rivalProtfolios &&
              singleGameData.rivalProtfolios[3] && (
                <Button
                  className="playerclickpopupbutton"
                  onClick={() =>
                    handlePercentageDiv(
                      singleGameData?.rivalProtfolios?.length > 0 &&
                        // singleGameData.rivalProtfolios[3]?.portfolio?.user?.id
                        singleGameData?.rivalProtfolios?.find(
                          (r) => r?.role === "FW"
                        )?.portfolio?.user?.id
                    )
                  }
                >
                  <div className="playerimagedivplay">
                    <Image src={images.playerthree} width="55%" />
                  </div>
                  <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        // singleGameData.rivalProtfolios[3]?.portfolio?.coin
                        //   ?.photoPath
                        singleGameData?.rivalProtfolios?.find(
                          (r) => r?.role === "FW"
                        )?.portfolio?.coin?.photoPath
                      }
                    />
                    <p
                      className={`iunderhead ${
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.rivalProtfolios[3]?.portfolio?.coin
                          //   ?.quote?.USD?.percent_change_24h
                          singleGameData?.rivalProtfolios?.find(
                            (r) => r?.role === "FW"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2) >= 0
                          ? "green"
                          : "red"
                      }`}
                    >
                      {" "}
                      {singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.rivalProtfolios[3]?.portfolio?.coin
                          //   ?.quote?.USD?.percent_change_24h
                          singleGameData?.rivalProtfolios?.find(
                            (r) => r?.role === "FW"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  </div>
                  {singleGameData?.rivalProtfolios &&
                    singleGameData?.rivalProtfolios?.find(
                      (r) => r?.role === "FW"
                    )?.ball && (
                      <div className="football">
                        <BiFootball />
                      </div>
                    )}
                </Button>
              )}
          </Col>
          <Col md={2}></Col>
          {/* challenger 3 */}
          <Col md={1} className="removepaddfrombtn marginsetforfourthbutinrow">
            {singleGameData.challengerProtfolios &&
              singleGameData.challengerProtfolios[3] && (
                <Button
                  className="playerclickpopupbutton"
                  onClick={() =>
                    handlePercentageDiv(
                      singleGameData?.challengerProtfolios?.length > 0 &&
                        // singleGameData.challengerProtfolios[3]?.portfolio?.user
                        //   ?.id
                        singleGameData?.challengerProtfolios?.find(
                          (r) => r?.role === "Extra"
                        )?.portfolio?.user?.id
                    )
                  }
                >
                  <div className="playerimagedivplay">
                    <Image src={images.playerfive} width="55%" />
                  </div>
                  <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        // singleGameData.challengerProtfolios[3]?.portfolio?.coin
                        //   ?.photoPath
                        singleGameData?.challengerProtfolios?.find(
                          (r) => r?.role === "Extra"
                        )?.portfolio?.coin?.photoPath
                      }
                    />
                    <p
                      className={`iunderhead ${
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.challengerProtfolios[3]?.portfolio
                          //   ?.coin?.quote?.USD?.percent_change_24h
                          singleGameData?.challengerProtfolios?.find(
                            (r) => r?.role === "Extra"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2) >= 0
                          ? "green"
                          : "red"
                      }`}
                    >
                      {singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.challengerProtfolios[3]?.portfolio
                          //   ?.coin?.quote?.USD?.percent_change_24h
                          singleGameData?.challengerProtfolios?.find(
                            (r) => r?.role === "Extra"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  </div>
                  {singleGameData?.challengerProtfolios &&
                    singleGameData?.challengerProtfolios?.find(
                      (r) => r?.role === "Extra"
                    )?.ball && (
                      <div className="football">
                        <BiFootball />
                      </div>
                    )}
                </Button>
              )}
          </Col>
          <Col md={2}></Col>
          {/* challenger 1 */}
          <Col md={1} className="removepaddfrombtn marginsetforfifthhbutinrow">
            {singleGameData.challengerProtfolios &&
              singleGameData.challengerProtfolios[1] && (
                <Button
                  className="playerclickpopupbutton"
                  onClick={() =>
                    handlePercentageDiv(
                      singleGameData?.challengerProtfolios?.length > 0 &&
                        // singleGameData.challengerProtfolios[1]?.portfolio?.user
                        //   ?.id
                        singleGameData?.challengerProtfolios?.find(
                          (r) => r?.role === "MD"
                        )?.portfolio?.user?.id
                    )
                  }
                >
                  <div className="playerimagedivplay">
                    <Image src={images.playerfive} width="55%" />
                  </div>
                  <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        // singleGameData.challengerProtfolios[1]?.portfolio?.coin
                        //   ?.photoPath
                        singleGameData?.challengerProtfolios?.find(
                          (r) => r?.role === "MD"
                        )?.portfolio?.coin?.photoPath
                      }
                    />
                    <p
                      className={`iunderhead ${
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.challengerProtfolios[1]?.portfolio
                          //   ?.coin?.quote?.USD?.percent_change_24h
                          singleGameData?.challengerProtfolios?.find(
                            (r) => r?.role === "MD"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2) >= 0
                          ? "green"
                          : "red"
                      }`}
                    >
                      {singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.challengerProtfolios[1]?.portfolio
                          //   ?.coin?.quote?.USD?.percent_change_24h
                          singleGameData?.challengerProtfolios?.find(
                            (r) => r?.role === "MD"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  </div>
                  {singleGameData?.challengerProtfolios &&
                    singleGameData?.challengerProtfolios?.find(
                      (r) => r?.role === "MD"
                    )?.ball && (
                      <div className="football">
                        <BiFootball />
                      </div>
                    )}
                </Button>
              )}
          </Col>

          {/* challenger 0 */}
          <Col md={1} className="removepaddfrombtn margsetforsixthinrow">
            {singleGameData.challengerProtfolios &&
              singleGameData.challengerProtfolios[0] && (
                <Button
                  className="playerclickpopupbutton"
                  onClick={() =>
                    handlePercentageDiv(
                      singleGameData?.challengerProtfolios?.length > 0 &&
                        // singleGameData.challengerProtfolios[0]?.portfolio?.user
                        //   ?.id
                        singleGameData?.challengerProtfolios?.find(
                          (r) => r?.role === "GK"
                        )?.portfolio?.user?.id
                    )
                  }
                >
                  <div className="playerimagedivplay">
                    <Image src={images.playertwo} width="55%" />
                  </div>
                  <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        // singleGameData.challengerProtfolios[0]?.portfolio?.coin
                        //   ?.photoPath
                        singleGameData?.challengerProtfolios?.find(
                          (r) => r?.role === "GK"
                        )?.portfolio?.coin?.photoPath
                      }
                    />
                    <p
                      className={`iunderhead ${
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.challengerProtfolios[0]?.portfolio
                          //   ?.coin?.quote?.USD?.percent_change_24h
                          singleGameData?.challengerProtfolios?.find(
                            (r) => r?.role === "GK"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2) >= 0
                          ? "green"
                          : "red"
                      }`}
                    >
                      {singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.challengerProtfolios[0]?.portfolio
                          //   ?.coin?.quote?.USD?.percent_change_24h
                          singleGameData?.challengerProtfolios?.find(
                            (r) => r?.role === "GK"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  </div>
                  {singleGameData?.challengerProtfolios &&
                    singleGameData?.challengerProtfolios?.find(
                      (r) => r?.role === "GK"
                    )?.ball && (
                      <div className="football">
                        <BiFootball />
                      </div>
                    )}
                </Button>
              )}
          </Col>
        </Row>

        <Row className="mt-0">
          <Col md={1}></Col>
          {/* rival 2 */}
          <Col md={1} className="removepaddfrombtn margsetforsevinrowtwo">
            {singleGameData.rivalProtfolios &&
              singleGameData.rivalProtfolios[2] && (
                <Button
                  className="playerclickpopupbutton"
                  onClick={() =>
                    handlePercentageDiv(
                      singleGameData?.rivalProtfolios?.length > 0 &&
                        // singleGameData.rivalProtfolios[2]?.portfolio?.user?.id
                        singleGameData?.rivalProtfolios?.find(
                          (r) => r?.role === "MD"
                        )?.portfolio?.user?.id
                    )
                  }
                >
                  <div className="playerimagedivplay">
                    <Image src={images.playerfive} width="55%" />
                  </div>
                  <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        // singleGameData.rivalProtfolios[2]?.portfolio?.coin
                        //   ?.photoPath
                        singleGameData?.rivalProtfolios?.find(
                          (r) => r?.role === "MD"
                        )?.portfolio?.coin?.photoPath
                      }
                    />
                    <p
                      className={`iunderhead ${
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.rivalProtfolios[2]?.portfolio?.coin
                          //   ?.quote?.USD?.percent_change_24h
                          singleGameData?.rivalProtfolios?.find(
                            (r) => r?.role === "MD"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2) >= 0
                          ? "green"
                          : "red"
                      }`}
                    >
                      {singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.rivalProtfolios[2]?.portfolio?.coin
                          //   ?.quote?.USD?.percent_change_24h
                          singleGameData?.rivalProtfolios?.find(
                            (r) => r?.role === "MD"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  </div>
                  {singleGameData?.rivalProtfolios &&
                    singleGameData?.rivalProtfolios?.find(
                      (r) => r?.role === "MD"
                    )?.ball && (
                      <div className="football">
                        <BiFootball />
                      </div>
                    )}
                </Button>
              )}
          </Col>
          <Col md={2}></Col>
          {/* rival 4 */}
          <Col md={1} className="removepaddfrombtn margsetforeighthinrowtwo">
            {singleGameData.rivalProtfolios &&
              singleGameData.rivalProtfolios[4] && (
                <Button
                  className="playerclickpopupbutton"
                  onClick={() =>
                    handlePercentageDiv(
                      singleGameData?.rivalProtfolios?.length > 0 &&
                        // singleGameData.rivalProtfolios[4]?.portfolio?.user?.id
                        singleGameData?.rivalProtfolios?.find(
                          (r) => r?.role === "Extra"
                        )?.portfolio?.user?.id
                    )
                  }
                >
                  <div className="playerimagedivplay">
                    <Image src={images.playerfive} width="55%" />
                  </div>
                  <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        // singleGameData.rivalProtfolios[4]?.portfolio?.coin
                        //   ?.photoPath
                        singleGameData?.rivalProtfolios?.find(
                          (r) => r?.role === "Extra"
                        )?.portfolio?.coin?.photoPath
                      }
                    />
                    <p
                      className={`iunderhead ${
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.rivalProtfolios[4]?.portfolio?.coin
                          //   ?.quote?.USD?.percent_change_24h
                          singleGameData?.rivalProtfolios?.find(
                            (r) => r?.role === "Extra"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2) >= 0
                          ? "green"
                          : "red"
                      }`}
                    >
                      {singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.rivalProtfolios[4]?.portfolio?.coin
                          //   ?.quote?.USD?.percent_change_24h
                          singleGameData?.rivalProtfolios?.find(
                            (r) => r?.role === "Extra"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  </div>
                  {singleGameData?.rivalProtfolios &&
                    singleGameData?.rivalProtfolios?.find(
                      (r) => r?.role === "Extra"
                    )?.ball && (
                      <div className="football">
                        <BiFootball />
                      </div>
                    )}
                </Button>
              )}
          </Col>
          <Col md={3}></Col>
          {/* challenger 4 */}
          <Col md={1} className="removepaddfrombtn margsetforninthinrowtwo">
            {singleGameData.challengerProtfolios &&
              singleGameData.challengerProtfolios[4] && (
                <Button
                  className="playerclickpopupbutton"
                  onClick={() =>
                    handlePercentageDiv(
                      singleGameData?.challengerProtfolios?.length > 0 &&
                        // singleGameData.challengerProtfolios[4]?.portfolio?.user
                        //   ?.id
                        singleGameData?.challengerProtfolios?.find(
                          (r) => r?.role === "FW"
                        )?.portfolio?.user?.id
                    )
                  }
                >
                  <div className="playerimagedivplay">
                    <Image src={images.playertwo} width="55%" />
                  </div>
                  <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        // singleGameData.challengerProtfolios[4]?.portfolio?.coin
                        //   ?.photoPath
                        singleGameData?.challengerProtfolios?.find(
                          (r) => r?.role === "FW"
                        )?.portfolio?.coin?.photoPath
                      }
                    />
                    <p
                      className={`iunderhead ${
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.challengerProtfolios[4]?.portfolio
                          //   ?.coin?.quote?.USD?.percent_change_24h
                          singleGameData?.challengerProtfolios?.find(
                            (r) => r?.role === "FW"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2) >= 0
                          ? "green"
                          : "red"
                      }`}
                    >
                      {singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.challengerProtfolios[4]?.portfolio
                          //   ?.coin?.quote?.USD?.percent_change_24h
                          singleGameData?.challengerProtfolios?.find(
                            (r) => r?.role === "FW"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  </div>
                  {singleGameData?.challengerProtfolios &&
                    singleGameData?.challengerProtfolios?.find(
                      (r) => r?.role === "FW"
                    )?.ball && (
                      <div className="football">
                        <BiFootball />
                      </div>
                    )}
                </Button>
              )}
          </Col>
          <Col md={2}></Col>
          {/* chanllenge - 2*/}
          <Col md={1} className="removepaddfrombtn margsetforlastoneinrow">
            {singleGameData.challengerProtfolios &&
              singleGameData.challengerProtfolios[2] && (
                <Button
                  className="playerclickpopupbutton"
                  onClick={() =>
                    handlePercentageDiv(
                      singleGameData?.challengerProtfolios?.length > 0 &&
                        // singleGameData.challengerProtfolios[2]?.portfolio?.user
                        //   ?.id
                        singleGameData?.challengerProtfolios?.find(
                          (r) => r?.role === "DF"
                        )?.portfolio?.user?.id
                    )
                  }
                >
                  <div className="playerimagedivplay">
                    <Image src={images.playerfive} width="55%" />
                  </div>
                  <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        // singleGameData.challengerProtfolios[2]?.portfolio?.coin
                        //   ?.photoPath
                        singleGameData?.challengerProtfolios?.find(
                          (r) => r?.role === "DF"
                        )?.portfolio?.coin?.photoPath
                      }
                    />
                    <p
                      className={`iunderhead ${
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.challengerProtfolios[2]?.portfolio
                          //   ?.coin?.quote?.USD?.percent_change_24h
                          singleGameData?.challengerProtfolios?.find(
                            (r) => r?.role === "DF"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2) >= 0
                          ? "green"
                          : "red"
                      }`}
                    >
                      {singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          // singleGameData.challengerProtfolios[2]?.portfolio
                          //   ?.coin?.quote?.USD?.percent_change_24h
                          singleGameData?.challengerProtfolios?.find(
                            (r) => r?.role === "DF"
                          )?.portfolio?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  </div>
                  {singleGameData?.challengerProtfolios &&
                    singleGameData?.challengerProtfolios?.find(
                      (r) => r?.role === "DF"
                    )?.ball && (
                      <div className="football">
                        <BiFootball />
                      </div>
                    )}
                </Button>
              )}
          </Col>
        </Row>

        <Playpopup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          disabled={updateLoading}
        >
          <p className="menuheadpop">Asset Swap & Stats</p>

          <Form onSubmit={handleUpdate}>
            <p className="selectamountlablel mt-4">
              Coin:{" "}
              <span style={{ color: "green" }}>
                {[
                  ...(singleGameData?.rivalProtfolios ?? []),
                  ...(singleGameData?.challengerProtfolios ?? []),
                ].find((p) => p?.user?.id === userId)?.portfolio?.coin?.name ??
                  ""}
              </span>
            </p>
            <p className="selectamountlablel mt-4">
              Own Quantity:{" "}
              <span style={{ color: "green" }}>
                {[
                  ...(singleGameData?.rivalProtfolios ?? []),
                  ...(singleGameData?.challengerProtfolios ?? []),
                ].find((p) => p?.user?.id === userId)?.portfolio?.quantity ?? 0}
              </span>
            </p>

            <p className="selectamountlablel mt-4">
              Price:{" "}
              <span style={{ color: "green" }}>
                $
                {parseFloat(
                  [
                    ...(singleGameData?.rivalProtfolios ?? []),
                    ...(singleGameData?.challengerProtfolios ?? []),
                  ].find((p) => p?.user?.id === userId)?.portfolio?.coin?.quote
                    ?.USD?.price ?? 0
                ).toFixed(5)}
              </span>
            </p>
            <p className="selectamountlablel mt-4">
              Amount:{" "}
              <span style={{ color: "green" }}>
                {[
                  ...(singleGameData?.rivalProtfolios ?? []),
                  ...(singleGameData?.challengerProtfolios ?? []),
                ].find((p) => p?.user?.id === userId)?.portfolio?.quantity *
                  [
                    ...(singleGameData?.rivalProtfolios ?? []),
                    ...(singleGameData?.challengerProtfolios ?? []),
                  ].find((p) => p?.user?.id === userId)?.portfolio?.coin?.quote
                    ?.USD?.price ?? 0}
              </span>
            </p>
            <Form.Group>
              <Form.Label className="selectamountlablel mt-4">
                Select a coin type for each football player
              </Form.Label>
              <Form.Select
                className="selectcoinselect"
                aria-label="Select coin"
                required
                value={goingtoUpdatePortfolioId}
                onChange={(e) => setGoingtoUpdatePortfolioId(e.target.value)}
              >
                <option id="" disabled>
                  Select any coin
                </option>
                {coin.map((c, i) => (
                  <option value={c?._id} key={i}>
                    {c?.name} ( ${parseFloat(c?.quote?.USD?.price).toFixed(2)} )
                  </option>
                ))}
              </Form.Select>
              <Form.Control
                className="exchangepopuptextfield"
                type="number"
                placeholder="Enter Quantity"
                value={goingtoUpdateValue}
                onChange={(e) => setGoingtoUpdateValue(e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <p style={{ color: "green" }}>
                  {" "}
                  Balance: $<b> {parseFloat(loginUserBalance).toFixed(2)}</b>
                </p>
              </Col>
              <Col md={6}>
                <p style={{ color: "red", textAlign: "right" }}>
                  Amount: $
                  <b>
                    {parseFloat(
                      [
                        ...(singleGameData?.rivalProtfolios ?? []),
                        ...(singleGameData?.challengerProtfolios ?? []),
                      ].find((p) => p?.user?.id === userId)?.portfolio?.coin
                        ?.quote?.USD?.price * goingtoUpdateValue ?? 0
                    ).toFixed(2)}{" "}
                  </b>
                </p>
              </Col>
            </Row>
            <div className="setbuttonpositionforplaypopup">
              <Button
                className="selecttokentoexchangeformbytton mt-3"
                type="submit"
                disabled={updateLoading}
              >
                {updateLoading ? "Loading..." : "Update"}
              </Button>
            </div>
          </Form>
        </Playpopup>
        <Menupopup trigger={buttonPopupMen} setTrigger={setButtonPopupMen}>
          <p className="menuheadpop">MENU</p>
          <div className="makemenuitemsinrow">
            <Link
              onClick={() => setButtonPopupMen(false)}
              className="menuitempopup"
            >
              Resume Game
            </Link>
            <Link to="/profile" className="menuitempopup">
              General Settings
            </Link>
            <Link className="menuitempopup" to="/gamehome">
              Exit Game
            </Link>
          </div>
        </Menupopup>
        <Menupopup trigger={buttonPopupBor} setTrigger={setButtonPopupBor}>
          <p className="menuheadpop">Borrow Amount</p>
          <p className="alreadyborrow mt-3">
            Already Borrowed :{" "}
            <span className="borrowvalue">${borrowAmounts}</span>
          </p>
          <p className="alreadyborrow mt-3">
            Remaning Amount :{" "}
            <span className="borrowvalue">${remaningAmount}</span>
          </p>
          <Form>
            <Form.Group>
              <Form.Label className="selectamountlablel">
                Enter amount to borrow
              </Form.Label>
              <Form.Control
                className="exchangepopuptextfield"
                type="number"
                placeholder="Enter Amount"
                value={borrowAmount}
                onChange={(e) => setBorrowAmount(e.target.value)}
              />
            </Form.Group>
            <div className="setbuttonpositionforplaypopup">
              <Button
                className="exchangepopbuy mt-3"
                onClick={() => handleBorrow()}
                disabled={loading ? true : false}
              >
                {loading ? "Please wait..." : "Borrow"}
              </Button>
            </div>
          </Form>
        </Menupopup>
        <Playpopup
          trigger={buttonPopupEx}
          setTrigger={setButtonPopupEx}
          disabled={buyLoading || sellLoading}
        >
          <p className="menuheadpop">Manage Owned Assets</p>
          <Form>
            <Form.Group>
              <p className="selectamountlablel mt-4">
                Coin:{" "}
                <span style={{ color: "green" }}>
                  {[
                    ...(singleGameData?.rivalProtfolios ?? []),
                    ...(singleGameData?.challengerProtfolios ?? []),
                  ].find((p) => p?.user?.id === userId)?.portfolio?.coin
                    ?.name ?? ""}
                </span>
              </p>
              <p className="selectamountlablel mt-4">
                Own Quantity:{" "}
                <span style={{ color: "green" }}>
                  {[
                    ...(singleGameData?.rivalProtfolios ?? []),
                    ...(singleGameData?.challengerProtfolios ?? []),
                  ].find((p) => p?.user?.id === userId)?.portfolio?.quantity ??
                    0}
                </span>
              </p>

              <p className="selectamountlablel mt-4">
                Price:{" "}
                <span style={{ color: "green" }}>
                  $
                  {parseFloat(
                    [
                      ...(singleGameData?.rivalProtfolios ?? []),
                      ...(singleGameData?.challengerProtfolios ?? []),
                    ].find((p) => p?.user?.id === userId)?.portfolio?.coin
                      ?.quote?.USD?.price ?? 0
                  ).toFixed(5)}
                </span>
              </p>
              <p className="selectamountlablel mt-4">
                Amount:{" "}
                <span style={{ color: "green" }}>
                  {[
                    ...(singleGameData?.rivalProtfolios ?? []),
                    ...(singleGameData?.challengerProtfolios ?? []),
                  ].find((p) => p?.user?.id === userId)?.portfolio?.quantity *
                    [
                      ...(singleGameData?.rivalProtfolios ?? []),
                      ...(singleGameData?.challengerProtfolios ?? []),
                    ].find((p) => p?.user?.id === userId)?.portfolio?.coin
                      ?.quote?.USD?.price ?? 0}
                </span>
              </p>

              <Form.Label className="selectamountlablel">
                Enter Quantity:{" "}
              </Form.Label>
              <Form.Control
                className="exchangepopuptextfield"
                type="number"
                placeholder="Enter Amount"
                value={buySellValue}
                onChange={(e) => setBuySellValue(e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <p style={{ color: "green" }}>
                  {" "}
                  Balance: $<b> {parseFloat(loginUserBalance).toFixed(2)}</b>
                </p>
              </Col>
              <Col md={6}>
                <p style={{ color: "red", textAlign: "right" }}>
                  Amount: $
                  <b>
                    {parseFloat(
                      [
                        ...(singleGameData?.rivalProtfolios ?? []),
                        ...(singleGameData?.challengerProtfolios ?? []),
                      ].find((p) => p?.user?.id === userId)?.portfolio?.coin
                        ?.quote?.USD?.price * buySellValue ?? 0
                    ).toFixed(2)}
                  </b>
                </p>
              </Col>
            </Row>
            <div className="setbuttonpositionforplaypopup">
              <Button
                className="exchangepopbuy mt-3"
                onClick={handleBuy}
                disabled={buyLoading}
              >
                {buyLoading ? "Loading..." : "Buy"}
              </Button>
              <Button
                className="exchangepopsell mt-3"
                onClick={handleSell}
                disabled={sellLoading}
              >
                {sellLoading ? "Loading..." : "Sell"}
              </Button>
            </div>
          </Form>
        </Playpopup>
      </Container>
      {!loading1 && !loading2 && !loading3 && (
        <div className="buttons">
          {isMyTeamHasBall && isIHaveBall ? (
            <>
              <button
                onClick={() =>
                  dispatch(
                    postShootBall({
                      gameId: id,
                      player: isMySideIsRival ? "rival" : "challenger",
                    })
                  )
                }
              >
                Shoot
              </button>
              <button onClick={(e) => setPassMenuOpenRef(e.currentTarget)}>
                Pass
              </button>
            </>
          ) : !isMyTeamHasBall && myIndexNumberInMyTeam !== 0 ? (
            <button
              onClick={() =>
                dispatch(
                  postTackleBall({
                    gameId: id,
                    player: isMySideIsRival ? "rival" : "challenger",
                  })
                )
              }
            >
              Tackle
            </button>
          ) : (
            ""
          )}
        </div>
      )}

      <Menu
        anchorEl={passMenuOpenRef}
        open={Boolean(passMenuOpenRef)}
        onClose={() => setPassMenuOpenRef(null)}
      >
        <div className="passMenu">
          {(isMySideIsRival
            ? singleGameData?.rivalProtfolios && singleGameData.rivalProtfolios
            : singleGameData?.challengerProtfolios &&
              singleGameData.challengerProtfolios
          )
            ?.filter((r, i) => r?.user?.id !== userId && i !== 0)
            .map((r, i) => (
              <button
                onClick={() => {
                  dispatch(
                    postPassBall({
                      gameId: id,
                      player: isMySideIsRival ? "rival" : "challenger",
                      portfolio: r?.portfolio?.id,
                    })
                  );
                  setPassMenuOpenRef(null);
                }}
                key={i}
              >
                {r?.portfolio?.user?.name}
              </button>
            ))}
        </div>
      </Menu>
    </div>
  );
};

export default Play;
