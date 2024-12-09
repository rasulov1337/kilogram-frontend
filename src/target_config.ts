const target_tauri = true;

export const DEST_ROOT = target_tauri ? "/" : "/kilogram-frontend/";
export const API_PROXY_ADDR = "http://192.168.119.37:8000/";
export const IMG_PROXY_ADDR = "http://192.168.119.37:9000";
export const DEST_API = target_tauri ? API_PROXY_ADDR : "/api/";
export const DEST_IMG = target_tauri ? IMG_PROXY_ADDR : "/images/";
