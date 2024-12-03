import { Link } from "react-router-dom";
import "./DraftProcessInfo.css";
import { ROUTES } from "../../modules/Routes";
import { useDraftOrderInfo } from "../../slices/RecipientsPageSlice";

export default function DraftProcessInfo() {
    const { orderId, recipipentsCount } = useDraftOrderInfo();

    return (
        <>
            <Link
                to={ROUTES.TRANSFERS + `/${orderId}`}
                className={
                    "draft-process-info" +
                    (!orderId ? " draft-process-info--disabled" : "")
                }
                id="current-order"
            >
                <svg
                    width="95"
                    height="95"
                    viewBox="0 0 95 95"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M34.0021 53.4771L61.0375 69.2312M60.9979 25.7687L34.0021 41.5229M83.125 19.7917C83.125 26.35 77.8084 31.6667 71.25 31.6667C64.6916 31.6667 59.375 26.35 59.375 19.7917C59.375 13.2333 64.6916 7.91666 71.25 7.91666C77.8084 7.91666 83.125 13.2333 83.125 19.7917ZM35.625 47.5C35.625 54.0584 30.3084 59.375 23.75 59.375C17.1916 59.375 11.875 54.0584 11.875 47.5C11.875 40.9416 17.1916 35.625 23.75 35.625C30.3084 35.625 35.625 40.9416 35.625 47.5ZM83.125 75.2083C83.125 81.7667 77.8084 87.0833 71.25 87.0833C64.6916 87.0833 59.375 81.7667 59.375 75.2083C59.375 68.6499 64.6916 63.3333 71.25 63.3333C77.8084 63.3333 83.125 68.6499 83.125 75.2083Z"
                        stroke="#F3F3F3"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                </svg>

                <div className="draft-process-info__process-sm-info">
                    <h2 className="draft-process-info__heading">
                        Текущий процесс отправки файлов
                    </h2>

                    {orderId && (
                        <p className="grey-text">
                            Число получателей: {recipipentsCount}
                        </p>
                    )}
                    {!orderId && (
                        <p className="grey-text">
                            Ни один получатель еще не выбран!
                        </p>
                    )}
                </div>
            </Link>
        </>
    );
}
