import axios from "../configs/axios";
// import handleAxiosError from "../helpers/axiosHelper";

const pagination = async(page: number | null) => {
    console.log(page)
    const response = await axios.get(`/users?page=${page}`)
    return response.data

}

export {pagination}