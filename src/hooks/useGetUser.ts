import axios from "axios"

const baseUrl = "http://127.0.0.1:4000/";

let token = localStorage.getItem('accessToken');
let type = localStorage.getItem('userStatus');

const headers = {
  "Content-Type": "application/json",
  "Authorization": token ?? '',
};
const getUserInfo = async () => {

  let data;
  if (type === "admin") {
    const res = await axios.get(
      `http://127.0.0.1:4000/admin-api/admin-find-id/`,
      {
        headers
      })
      data =  res.data.findAdminId

  }
  else if (type === "employee") {
    const res = await axios.get(baseUrl + 'emp-api/employee-find-id', {
      headers
    })
   data =  res.data.findEmpId
  }
 

  return data
}

export default { getUserInfo }