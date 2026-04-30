import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import conf from "../../config/index";
import {
  employeeLoginDetailsAtom,
  userAuthState,
  userForgotPasswordAtom,
  confirmPasswordAtom,
  otpVerifyAtom,
} from "../../state/authenticatedState/authenticatedState.js";
import {
  AlertContentState,
  AlertState,
  toastState,
} from "../../state/toastState";
import useFetch from "../useFetch";
import { useTheme } from "../theme/useTheme.js";

export const useSignIn = () => {
  const [fetchData] = useFetch();
  const { switchTheme } = useTheme();
  const navigate = useNavigate();
  const setAlertContent = useSetRecoilState(AlertContentState);
  const setAlertState = useSetRecoilState(AlertState);
  const setUserInfo = useSetRecoilState(userAuthState);
  const [toast, setToast] = useRecoilState(toastState);
  const [loading, setLoading] = useState(false);
  const [sAdminResponse, setSAdminResponse] = useState(toastState);

  const [password, setPassword] = useRecoilState(userForgotPasswordAtom);
  const [confirmPass, setConfirmPass] = useRecoilState(confirmPasswordAtom);
  const [otpRes, setOtpRes] = useRecoilState(otpVerifyAtom);

  const superAdminLogin = async (email, password) => {
    const data = { email, password };
    console.log("hook", email, password)
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}users/login`,
        data,
      });
      console.log("res", res);
      if (res) {
        setLoading(false);
        setSAdminResponse(res);
        setToast({ type: "success", message: res?.message });
        // Store the token and user info
        sessionStorage.setItem("token", res?.token);
        sessionStorage.setItem("superAdminId", res?.id);
        sessionStorage.setItem("companyId", res?.companyId);
        console.log("company", res?.companyId)
        setUserInfo({
          isAuthenticated: true,
        });

        setAlertContent({
          type: "success",
          title: "Success",
          message: res?.message,
        });
        setAlertState(true);

        // Navigate to the dashboard
        navigate("/inventory-dashboard");
      }
    } catch (error) {
      setToast({ type: "error", message: "Invalid Credentials" });
      // eslint-disable-next-line no-console
      console.error("Error fetching Sign in:", error);
      setLoading(false);
    }
  };

  const resetSuperAdmin = () => {
    setSAdminResponse(null);
  };

  const forgotPassword = async (data) => {
    setLoading(true);
    try {
      const url = new URL(`${conf.apiBaseUrl}users/forgot-password`);
      const res = await fetchData({
        method: "POST",
        url: url.toString(),
        data: data,
      });

      console.log("res", res);
      if (res) {
        setPassword(res);
        setLoading(false);
        setToast({ type: "success", message: res?.message });
      }
      if (!loading) {
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Error fetching forgot password:", error);
      setLoading(false);
    }
  };

  const confirmPassword = async (data) => {
    setLoading(true);
    try {
      const url = new URL(`${conf.apiBaseUrl}users/reset-password`);
      const res = await fetchData({
        method: "POST",
        url: url.toString(),
        data: data,
      });
      console.log("res", res);
      if (res) {
        setConfirmPass(res);
        setLoading(false);
        setToast({ type: "success", message: res?.message });
      }
      if (!loading) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching forgot password:", error);
      setLoading(false);
    }
  };

  const verifyOtp = async (data) => {
    setLoading(true);
    try {
      const url = new URL(`${conf.apiBaseUrl}users/verify-otp`);
      const res = await fetchData({
        method: "POST",
        url: url.toString(),
        data: data,
      });
      if (res) {
        setOtpRes(res);
        setLoading(false);
        setToast({ type: "success", message: res?.message });
      }
      if (!loading) {
        navigate("/confirm-password");
      }
    } catch (error) {
      console.error("Error fetching Verify Otp:", error);
      setLoading(false);
    }
  };

  return {
    superAdminLogin,
    sAdminResponse,
    loading,
    resetSuperAdmin,
    forgotPassword,
    password,
    verifyOtp,
    otpRes,
    confirmPassword,
    confirmPass,
  };
};
