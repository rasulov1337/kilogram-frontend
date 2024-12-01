export const ROUTES = {
    HOME: "/",
    RECIPIENTS: "/recipients/",
    RECIPIENT: "/recipient/:id",
    SIGNIN: "/signin/",
    SIGNUP: "/signup/",
    TRANSFERS: "/transfers/",
};

export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
    HOME: "Главная",
    RECIPIENTS: "Получатели",
    RECIPIENT: "Получатель",
    SIGNIN: "Вход",
    SIGNUP: "Регистрация",
    TRANSFERS: "Отправки файлов",
};
