import { useRecoilState } from "recoil";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config/index";
import { allReportsAtom, saleBySalesPersonAtom, salesByCompanyAtom, salesByProductAtom, salesByRegionAtom } from "../../state/reports/reportsState";

const useReports = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [salesByCompany, setSalesByCompany] = useRecoilState(salesByCompanyAtom);
    const [salesByProduct, setSalesByProduct] = useRecoilState(salesByProductAtom);
    const [salesByRegion, setSalesByRegion] = useRecoilState(salesByRegionAtom)
    const [saleBySalesPerson, setSaleBySalesPerson] = useRecoilState(saleBySalesPersonAtom);
    const [allReport, setAllReports] = useRecoilState(allReportsAtom);

    const fetchSalesByCompany = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}report/salesByCompany`,
            });
            if (res) {
                setSalesByCompany(res);
            }
        } catch (error) {
            console.error("Error while ", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchSalesByProduct = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}report/salesByProduct`,
            });
            if (res) {
                setSalesByProduct(res);
            }
        } catch (error) {
            console.error("Error while ", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const fetchSalesByRegion = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}report/salesByRegion`,
            });
            if (res) {
                setSalesByRegion(res);
            }
        } catch (error) {
            console.error("Error while ", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const fetchSaleBySalesPerson = async () => {
        setLoading(true)
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}report/saleBySalesPerson`,
            });
            if (res) {
                setSaleBySalesPerson(res);
            }
        } catch (error) {
            console.error("Error while ", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const fetchAllReports = async () => {
        setLoading(true)
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}report/getAllReports`,
            });
            if (res) {
                setAllReports(res?.reports);
            }
        } catch (error) {
            console.error("Error while ", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return { salesByCompany, fetchSalesByCompany, fetchSalesByProduct, salesByProduct, loading,
        fetchSalesByRegion, salesByRegion, fetchSaleBySalesPerson, saleBySalesPerson, fetchAllReports, allReport
    }
}

export default useReports;