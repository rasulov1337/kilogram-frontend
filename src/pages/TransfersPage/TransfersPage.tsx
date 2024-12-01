import { Form, InputGroup, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { dateToString } from "../../modules/Utils";
import { api } from "../../modules/ApiClient";
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
    const [status, setStatus] = useState("");
    const [formedAtRangeBegin, setRangeBegin] = useState("");
    const [formedAtRangeEnd, setRangeEnd] = useState("");

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

    return (
        <div className="transfers">
            <h1>Отправки файлов</h1>
            <div className="transfers__filters d-flex w-100 justify-content-between gap-5">
                <Form.Group className="mb-3 d-flex flex-column flex-fill">
                    <Form.Label>Статус</Form.Label>
                    <Form.Select
                        onChange={(e) => {
                            setStatus(e.target.value);
                        }}
                    >
                        <option value="">Любой статус</option>
                        <option value="FRM">FRM</option>
                        <option value="COM">COM</option>
                        <option value="REJ">REJ</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 d-flex  flex-column flex-fill">
                    <Form.Label>Дата начала</Form.Label>
                    <Form.Control
                        type="date"
                        onChange={(e) => setRangeBegin(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3 d-flex  flex-column flex-fill">
                    <Form.Label>Дата окончания</Form.Label>
                    <Form.Control
                        type="date"
                        onChange={(e) => setRangeEnd(e.target.value)}
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
                                <tr key={t.id}>
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
