// internal import
import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchWeatherApi } from "src/api/weatherApi";
import { List } from "src/components";
import { MAX_HISTORY } from "src/constants";
import { sun, cloud } from "src/assets";
import { fadeIn } from "src/utils";

//global import
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const STYLE = {
  searchBox:
    "capitalize md:min-w-[620px] md:h-[60px] h-[40px] md:rounded-search rounded-[8px] bg-white-100 dark:bg-dark-500 focus:outline-none md:px-[22px] px-[11px] text-black dark:text-white text-xs md:text-base md:pt-[23px] pt-[15px] md:pb-[19px] pb-[12px] w-full placeholder-black-200 dark:placeholder-white-400 placeholder-base",
  smallText: "md:text-base text-sm text-[#666] dark:text-white",
  inputLabel:
    "absolute flex justify-center text-black-500 dark:text-white text-[12px] leading-[12px] md:scale-83 scale-66 md:left-[22px] left-[11px] top-[3px] origin-top-left",
  searchButton:
    "md:w-[60px] w-[40px] md:h-[60px] h-[40px] bg-purple dark:bg-purple-dark md:rounded-search rounded-[8px] bg-searchIcon bg-no-repeat bg-center md:bg-[length:40px_40px] bg-[length:22.67px_22.67px] cursor-pointer ",
  displayContainer:
    "filter filter-blur-[10px] w-full h-full min-h-[1145px] md:mt-[112px] mt-[139px] md:rounded-[40px] rounded-[20px] bg-white-100 dark:bg-dark-300 border-[1px] border-white-500 border-solid relative md:px-[40px] px-[26px] overflow-visible",
};

const Weather = () => {
  const [history, useHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [animating, setAnimating] = useState(false);

  //Optional: If want to initialize
  useEffect(() => {
    // It wil run twice because of strict mode, will not effect in production env
    handleFetch("Singapore", false);
  }, []);

  //update search content
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  /**
   * Fetch weather data from api
   * @param {string} item - The item to be searched
   * @param {boolean} record - Whether to record the search history
   */
  const handleFetch = useCallback(
    async (item = search, record = true) => {
      // params for api
      const data = {
        q: item,
        units: "metric",
        appid: import.meta.env.VITE_APP_WEATHER_API_KEY,
      };
      try {
        // sucuessfully fetch data
        const resp = await fetchWeatherApi(data);
        setWeather(resp);
        setAnimating(!animating);
        // update history
        record &&
          updateHistory({
            name: `${resp.name} , ${resp.sys.country}`,
            timeStamp: dayjs.unix(+resp.dt).format("MM-DD-YYYY hh:mma"),
          });
        record &&
          enqueueSnackbar("Search Successfully", {
            variant: "success",
          });
      } catch (err) {
        // something wrong
        enqueueSnackbar("Opps, something wrong, please check your search", {
          variant: "error",
        });
        setWeather(null);
      }
    },
    [search, weather, history]
  );

  //event when click search button
  const handleSearch = useCallback(
    async (e) => {
      setWeather(null);
      e.preventDefault();
      await handleFetch();
      setSearch("");
    },
    [handleFetch]
  );

  /**
   * Update the history list
   * @param {object} item - The item to be added to the history list
   */
  const updateHistory = useCallback(
    (item) => {
      if (history.length >= MAX_HISTORY) {
        history.pop();
      }
      useHistory([item, ...history]);
    },
    [history]
  );

  // delete history item
  const onHistoryDelete = (item) => {
    const newHistory = history.filter((i) => i !== item);
    useHistory(newHistory);
  };

  //--------------------------------------------------------------------------------- JSX ---------------------------------------------------------------------------------//

  const skeletonJsx = useMemo(
    () => (
      <Skeleton
        width={110}
        height={20}
        baseColor="#ccc"
        highlightColor="#eee"
      />
    ),
    []
  );

  // show if no history record
  const emptyJsx = useMemo(() => {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="md:text-base text-sm text-[#666] dark:text-white-500">
          No History
        </span>
      </div>
    );
  }, []);

  const historyJsx = useMemo(() => {
    return history.map((item, index) => {
      return (
        <List
          key={index}
          item={item}
          onDelete={onHistoryDelete}
          onSearch={(item) => handleFetch(item)}
        />
      );
    });
  }, [history]);

  const SerachAreaJsx = (
    <section className="my-[18px] md:my-[26px]">
      <form onSubmit={handleSearch} className="flex md:gap-[20px] gap-[10px]">
        <div className="relative flex-grow">
          <div className={STYLE.inputLabel}>Country</div>
          <input
            autoComplete="off"
            placeholder="Search Location"
            value={search}
            onChange={handleChange}
            className={STYLE.searchBox}
            type="text"
            name="city"
            id="city"
          />
        </div>
        <div>
          <input type="submit" value="" className={STYLE.searchButton} />
        </div>
      </form>
    </section>
  );

  const DisplayAreaJsx = (
    <section>
      <div className={STYLE.displayContainer}>
        <img
          src={weather?.weather[0].main === "Clear" ? sun : cloud}
          alt="Sun"
          className="md:h-[320px] h-[157px] absolute right-[23px] md:top-[-102px] top-[-68px] z-30"
        />
        <div className="px-[10px]">
          <h1 className="w-[133px] md:text-base text-sm md:mt-[46px] mt-[20px] dark:text-white">
            Today's Weather
          </h1>

          <motion.div
            key={animating}
            variants={fadeIn("up", "spring", 0.1, 0.5)}
            initial="hidden"
            animate="show"
            className="flex flex-row justify-between align-bottom md:mt-[18px] mt-[7px]"
          >
            <div className="flex flex-col gap-[10px]">
              <div className="md:h-[81px] h-[50px] flex items-start justify-center overflow-hidden">
                {weather ? (
                  <div className="md:text-[104px] text text-[60px] md:leading-[73px] leading-[45px] font-bold text-purple dark:text-white">
                    {Math.round(weather.main.temp)}°
                  </div>
                ) : (
                  <Skeleton
                    width={165}
                    height={165}
                    baseColor="#ccc"
                    highlightColor="#eee"
                  />
                )}
              </div>

              {weather ? (
                <span className="md:text-base text-sm block dark:text-white">
                  H: {Math.round(weather.main?.temp_max, 0)}° L:{" "}
                  {Math.round(weather.main?.temp_min, 0)}°
                </span>
              ) : (
                skeletonJsx
              )}

              {weather?.name ? (
                <div className={`${STYLE.smallText} font-bold `}>
                  {`${weather.name}, ${weather.sys?.country}`},
                </div>
              ) : (
                skeletonJsx
              )}
            </div>

            <ul className="flex flex-grow md:justify-between justify-start items-end md:flex-row flex-col-reverse gap-[13px] md:gap-0">
              {weather ? (
                <li className={STYLE.smallText}>
                  {dayjs.unix(+weather.dt).format("MM-DD-YYYY hh:mma")}
                </li>
              ) : (
                skeletonJsx
              )}

              {weather ? (
                <li className={STYLE.smallText}>
                  Humidity: {weather.main?.humidity}%
                </li>
              ) : (
                skeletonJsx
              )}

              {weather ? (
                <li className={STYLE.smallText}>{weather.weather[0].main}</li>
              ) : (
                skeletonJsx
              )}
            </ul>
          </motion.div>
        </div>

        <div className="w-full h-full min-h-screen bg-white-100 dark:bg-dark-300 z-10 my-[26px] rounded-[24px] px-[20px]">
          <h3 className="text-[16px] leading-[16px] md:pt-[23px] pt-[22px] md:px-[6px] dark:text-white">
            Search History
          </h3>
          <motion.div
            key={animating}
            variants={fadeIn("up", "spring", 0.1, 0.5)}
            initial="hidden"
            animate="show"
            className="py-[26px] flex flex-col gap-[18px] md:mx-0 mx-[-3px]"
          >
            {history.length ? historyJsx : emptyJsx}
          </motion.div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="w-full h-full bg-background bg-lightgray bg-cover bg-center bg-no-repeat min-h-screen overflow-hidden dark:bg-backgroundDark">
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />

      <motion.div
        variants={fadeIn("up", "spring", 0.1, 1)}
        initial="hidden"
        animate="show"
        className="min-h-screen md:max-h-[951px]  max-h-[929px] sm:w-[47vw] w-[90vw] sm:min-w-[700px] mx-auto"
      >
        {/* Search Area */}
        {SerachAreaJsx}

        {/* Display Area */}
        {DisplayAreaJsx}
      </motion.div>
    </div>
  );
};

export default Weather;
