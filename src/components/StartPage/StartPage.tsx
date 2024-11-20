import { Carousel } from "react-bootstrap";
import "./StartPage.css";

export default function StartPage() {
    return (
        <div className="start-page">
            <h1 className="start-page__title">
                KiloGram — групповая отправка файлов в мессенджере
            </h1>
            <p className="start-page__desc">
                Цель проекта — предоставить наиболее удобный интерфейс для
                групповой отправки файла нескольким пользователям.
            </p>
            <Carousel className="Carousel">
                <Carousel.Item className="CaruselItem">
                    <img width="900px" className="CarouselImage" src="/1.png" />
                    <Carousel.Caption>
                        <h3>Список получаталей</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="CaruselItem">
                    <img width="900px" className="CarouselImage" src="/2.png" />
                    <Carousel.Caption>
                        <h3>Получатель</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
