import { Form, Spinner, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { dateToString } from "../../modules/Utils";
import { api } from "../../modules/ApiClient";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS, ROUTES } from "../../modules/Routes";
import { useNavigate } from "react-router-dom";
import {
    transfersPageActions,
    useFormedAtDateFrom,
    useFormedAtDateTo,
    useStatus,
} from "../../slices/TransfersPageSlice";
import { useDispatch } from "react-redux";

import "./TransfersPage.css";

interface Transfer {
    id: number;
    moderator: string;
    file: string;
    created_at: string;
    completed_at: string;
    formed_at: string;
    sender: string;
    status: string;
}

export default function TransfersPage() {
    const [transfers, setTransfers] = useState<Transfer[]>([]);
    const status = useStatus();
    const formedAtRangeBegin = useFormedAtDateFrom();
    const formedAtRangeEnd = useFormedAtDateTo();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        let formedAtRange;
        if (formedAtRangeBegin && formedAtRangeEnd) {
            formedAtRange = `${formedAtRangeBegin},${formedAtRangeEnd}`;
        }

        api.transfers
            .transfersList(
                {
                    status,
                    "formed-at-range": formedAtRange,
                },
                { withCredentials: true }
            )
            .then(({ data }) => setTransfers(data as unknown as Transfer[]));
    }, [status, formedAtRangeEnd, formedAtRangeBegin]);

    const handleRowClick = (transferId: number) => {
        navigate(`/transfers/${transferId}`);
    };

    if (!transfers) {
        return (
            <div className="loading-screen">
                <Spinner animation="border"></Spinner>
            </div>
        );
    }

    return (
        <div className="transfers">
            <div className="container">
                <BreadCrumbs
                    crumbs={[
                        {
                            label: ROUTE_LABELS.TRANSFERS,
                            path: ROUTES.TRANSFERS,
                        },
                    ]}
                />
            </div>

            <h1>Отправки файлов</h1>
            <div className="transfers__filters d-flex w-100 justify-content-between gap-5">
                <Form.Group className="mb-3 d-flex flex-column flex-fill">
                    <Form.Label>Статус</Form.Label>
                    <Form.Select
                        onChange={(e) => {
                            dispatch(
                                transfersPageActions.setStatus(e.target.value)
                            );
                        }}
                        value={status}
                    >
                        <option value="">Любой статус</option>
                        <option value="FRM">Сформирована</option>
                        <option value="COM">Завершена</option>
                        <option value="REJ">Отклонена</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 d-flex  flex-column flex-fill">
                    <Form.Label>Дата оформления: начало диапазона</Form.Label>
                    <Form.Control
                        type="date"
                        value={formedAtRangeBegin}
                        onChange={(e) =>
                            dispatch(
                                transfersPageActions.setDateFrom(e.target.value)
                            )
                        }
                    />
                </Form.Group>

                <Form.Group className="mb-3 d-flex  flex-column flex-fill">
                    <Form.Label>Дата оформления: конец диапазона</Form.Label>
                    <Form.Control
                        type="date"
                        value={formedAtRangeEnd}
                        onChange={(e) =>
                            dispatch(
                                transfersPageActions.setDateTo(e.target.value)
                            )
                        }
                    />
                </Form.Group>
            </div>

            <Table className="transfers__table table-dark" bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Статус</th>
                        <th>Дата создания</th>
                        <th>Дата оформления</th>
                        <th>Дата завершения</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers &&
                        transfers.map((t) => {
                            const statusText = {
                                REJ: "Отклонена",
                                COM: "Завершена",
                                FRM: "Сформирована",
                            }[t.status];

                            return (
                                <tr
                                    key={t.id}
                                    onClick={() => handleRowClick(t.id)}
                                >
                                    <td>{t.id}</td>
                                    <td>{statusText}</td>
                                    <td>{dateToString(t.created_at)}</td>
                                    <td>{dateToString(t.formed_at)}</td>
                                    <td>{dateToString(t.completed_at)}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    );
}
