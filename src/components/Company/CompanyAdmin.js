import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Api from "../../Api";
import { useHistory } from "react-router-dom";

function CompanyAdmin() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const userId = localStorage.getItem("userId");

  const getAllCompanyUsers = () => {
    Api.get("/api/v1/user/company/all", {
      headers: {
        userId: userId,
      },
    })
      .then((res) => {
        const data = res?.data?.companyUsersList;
        setData(data);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
        }
      });
  };

  useEffect(() => {
    getAllCompanyUsers();
  }, []);

  // Log out
  const logout = () => {
    localStorage.clear(history.push("/login"));
    window.location.reload();
  };

  return (
    <div className=" mx-4 company-main-div">
      <div className="mttr-sec ">
        <p className=" mb-0 para-tag">User Informations</p>
      </div>
      <div className="" style={{ top: "80px" }}>
        <div style={{ bottom: "50px" }}>
          <Table hover bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>User Name</th>
                <th>Email Address</th>
                <th>Password</th>
                <th>Phone Number</th>
                <th>Company name</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data?.map((list, key) => (
                  <tr>
                    <td>{key + 1}</td>
                    <td>{list?.name}</td>
                    <td>{list?.email}</td>
                    <td>{list?.password}</td>
                    <td>{list?.phoneNumber}</td>
                    <td>{list?.companyName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    Users yet to be created
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default CompanyAdmin;
