import axios from "../configs/axios";
// import handleAxiosError from "../helpers/axiosHelper";

const pagination = async() => {
    const response = await axios.get('/users')
    return response.data

}

export {pagination}