export const ROUTES = {
    HOME: "/",
    RECIPIENTS: "/recipients/",
    RECIPIENT: "/recipients/:id",
    PROFILE: "/profile",
    SIGNIN: "/signin",
    SIGNUP: "/signup",
    SIGNOUT: "/signout",
    TRANSFERS: "/transfers/",
    TRANSFER: "/transfers/:id",
};

export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
    HOME: "Главная",
    RECIPIENTS: "Получатели",
    RECIPIENT: "Получатель",
    SIGNIN: "Вход",
    SIGNUP: "Регистрация",
    SIGNOUT: "Выход",
    TRANSFERS: "Отправки файлов",
    TRANSFER: "Отправка файлов",
    PROFILE: "Профиль",
};
