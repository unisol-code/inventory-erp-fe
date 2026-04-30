import { useState } from "react";
import { useRecoilState } from "recoil";
import { cityLocationAtom, countryLocationAtom, stateLocationAtom } from "../../state/location/locationState";
import conf from "../../config/index";
import useFetch from "../useFetch";

const useLocation = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");
    const [countryLocation, setCountryLocation] = useRecoilState(countryLocationAtom);
    const [stateLocation, setStateLocation] = useRecoilState(stateLocationAtom);
    const [cityLocation, setCityLocation] = useRecoilState(cityLocationAtom);
    
    const fetchCountryLocation = async () => {
        setLoading(true);
        try {
            fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}quotations/getCountry`,
            }).then((res) => {
                if (res) {
                    setCountryLocation(res?.data);
                }
            });
        } catch (error) {
            // eslint-disable-next-line no-console getCities?stateCode=MH
            console.error("Error updating:", error);
            setLoading(false);
        }
    }

    const fetchStateLocation = async (countryCode) => {
        setLoading(true);
        try {
            fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}quotations/getStates?country=${countryCode}`,
            }).then((res) => {
                if (res?.success) {
                    setStateLocation(res?.data);
                }
            });
        } catch (error) {
            // eslint-disable-next-line no-console getCities?stateCode=MH
            console.error("Error updating:", error);
            setLoading(false);
        }
    }

    const fetchCityLocation = async (countryCode, stateCode) => {
        setLoading(true);
        try {
            fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}quotations/getCities?stateCode=${stateCode}&country=${countryCode}`,
            }).then((res) => {
                if (res?.success) {
                    setCityLocation(res?.data);
                }
            });
        } catch (error) {
            // eslint-disable-next-line no-console getCities?stateCode=MH
            console.error("Error updating:", error);
            setLoading(false);
        }
    };

  return {
    stateLocation, loading, errors, fetchCountryLocation, countryLocation,
    fetchCityLocation, fetchStateLocation, cityLocation
  }
}

export default useLocation