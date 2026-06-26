import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext.jsx";

const REDIRECT_DELAY_MS = 1200;

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return undefined;

    const timerId = window.setTimeout(() => {
      navigate("/login", {
        replace: true,
        state: { from: location },
      });
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timerId);
  }, [isAuthenticated, location, navigate]);

  if (!isAuthenticated) {
    return (
      <section className="flex min-h-[55vh] items-center justify-center px-6 py-16">
        <style>
          {`
            @keyframes authNoticeEnter {
              from {
                opacity: 0;
                transform: translateY(12px) scale(0.98);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }

            @keyframes authNoticeProgress {
              from {
                transform: scaleX(0);
              }
              to {
                transform: scaleX(1);
              }
            }
          `}
        </style>

        <div
          className="w-full max-w-sm rounded-lg border border-black/10 bg-white p-6 text-center shadow-sm"
          style={{ animation: "authNoticeEnter 260ms ease-out both" }}
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
            !
          </div>

          <h1 className="text-xl font-extrabold text-black">您尚未登入</h1>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            請先登入會員，登入後會繼續前往結帳頁面。
          </p>

          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full origin-left rounded-full bg-black"
              style={{
                animation: `authNoticeProgress ${REDIRECT_DELAY_MS}ms linear both`,
              }}
            />
          </div>
        </div>
      </section>
    );
  }

  return children;
}
