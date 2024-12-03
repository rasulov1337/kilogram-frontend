import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    deleteTransfer,
    draftTransferActions,
    formTransfer,
    getTransferData,
    removeFromTransfer,
    updateComment,
} from "../../slices/DraftTransferPageSlice";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../modules/Types";
import { useRecipients } from "../../slices/DraftTransferPageSlice";
import { Spinner } from "react-bootstrap";
import { RecipientData } from "../../slices/RecipientsPageSlice";
import "./DraftTransferPage.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../modules/Routes";

export default function DraftTransferPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const navigate = useNavigate();

    if (!id) {
        throw new Error("no id passed!");
    }

    useEffect(() => {
        dispatch(getTransferData(id));
    }, [dispatch]);

    const recipients = useRecipients() as RecipientsDataInsideTransfer[];

    if (!recipients) {
        return (
            <div className="loading-screen">
                <Spinner animation="border"></Spinner>
            </div>
        );
    }

    const onDelBtnClick = (recipientId: number) => {
        dispatch(
            removeFromTransfer({
                transferId: id,
                recipientId: "" + recipientId,
            })
        );
    };

    const onSaveBtnClick = (recipientId: number) => {
        dispatch(updateComment({ transferId: id, recipientId: recipientId }));
    };

    const onCommentChange = (recipientId: number, comment: string) => {
        dispatch(
            draftTransferActions.setComment({
                recipientId: recipientId,
                comment: comment,
            })
        );
    };

    const onDeleteTransferClick = () => {
        dispatch(deleteTransfer(id))
            .then(() => navigate(ROUTES.RECIPIENTS))
            .catch((error) => alert(error));
    };

    const onFormTransferClick = () => {
        dispatch(formTransfer(id)).then(() => navigate(ROUTES.RECIPIENTS));
    };

    return (
        <>
            <div className="block draft-transfer-page" id="current-order-full">
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

                <div>
                    <h2>Текущий процесс отправки файлов</h2>
                    <p className="grey-text">
                        Число получателей: {recipients.length}
                    </p>
                </div>
            </div>

            <div className="draft-transfer-page__recipient block users-block block-padding-sm">
                {recipients.map((data) => (
                    <div key={data.id}>
                        <div className="user-card-long">
                            <img
                                className="avatar-sm"
                                src={data.avatar}
                                alt="User"
                            />
                            <div className="user-info-long">
                                <Link
                                    to={ROUTES.RECIPIENTS + `/${data.id}`}
                                    className="draft-transfer-page__recipient__name"
                                >
                                    {data.name}
                                </Link>
                                <p className="grey-text">{data.phone}</p>
                                <div className="long-card-input-elems">
                                    <input
                                        type="text"
                                        className="input-comment"
                                        placeholder="Добавить комментарий..."
                                        value={data.comment ? data.comment : ""}
                                        onChange={(e) =>
                                            onCommentChange(
                                                data.id,
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        className="btn draft-transfer-page__recipient__save-btn"
                                        onClick={() => onSaveBtnClick(data.id)}
                                    >
                                        Сохранить
                                    </button>

                                    <button
                                        className="btn draft-transfer-page__recipient__del-btn"
                                        onClick={() => onDelBtnClick(data.id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="hr" />
                    </div>
                ))}
            </div>

            <div className="block block-padding">
                <h1>Файлы</h1>

                {/* {#        <div className="center-btn-wrapper">#}
            {#            <button className="transparent-btn">#}
            {#                <svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">#}
            {#                    <path d="M34.5 14.375V54.625M14.375 34.5H54.625" stroke="#509AED" strokeWidth="4"#}
            {#                          strokeLinecap="round" stroke-linejoin="round"></path>#}
            {#                </svg>#}
            {##}
            {#                Загрузить новый файл#}
            {#            </button>#}
            {#        </div>#} */}

                <div className="file-card">
                    <div className="svg-container">
                        <svg
                            width="72"
                            height="72"
                            viewBox="0 0 72 72"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M39 6H18C16.4087 6 14.8826 6.63214 13.7574 7.75736C12.6321 8.88258 12 10.4087 12 12V60C12 61.5913 12.6321 63.1174 13.7574 64.2426C14.8826 65.3679 16.4087 66 18 66H54C55.5913 66 57.1174 65.3679 58.2426 64.2426C59.3679 63.1174 60 61.5913 60 60V27M39 6L60 27M39 6V27H60"
                                stroke="#808080"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </div>

                    <div className="d-flex flex-column">
                        <span className="filename">Название файла</span>
                        <div>
                            <span className="grey-text">Какой-то файл</span>
                            <span className="grey-text">{4}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="buttons-container">
                <button className="grey-btn" onClick={onDeleteTransferClick}>
                    Удалить
                </button>
                <button className="btn" onClick={onFormTransferClick}>
                    Сформировать отправку
                </button>
            </div>
        </>
    );
}
