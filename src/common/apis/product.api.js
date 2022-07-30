import { sendGetJson } from "../request"

export const getAllProduct = () => {
    return sendGetJson('/product');
}