import React, { useEffect, useState } from 'react';
import images from '../../images';
import { useGetAllUserQuery } from '../../api/modules/admin';

const UserList = () => {
    const [person, setPerson] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 5000);
    }, []);
    const { data, error: fetchError, isLoading: fetchIsLoading, refetch } = useGetAllUserQuery();

    console.log(data)
    return (
        <div style={{ minHeight: "90vh" }} className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    <div className="row"></div>

                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">User List</h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                                <div className="card h-100">
                                    <div className="card-header pb-0 p-3">
                                        <div className="row">
                                            <div className="col-6 d-flex align-items-center">
                                                <h6 className="mb-0">Home - UserList</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table align-items-center mb-0">
                                        <thead style={{ marginLeft: "50px" }}>
                                            <tr>
                                                <th style={{ marginLeft: "50px" }} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Email</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">District</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Phone</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">IsPaid</th>


                                            </tr>
                                        </thead>

                                        <tbody style={{ marginLeft: "50px" }}>
                                            {loading ? (
                                                <div style={{ display: "flex", justifyContent: "center", marginLeft: "280px", marginBottom: "100px", textAlign: "center" }}>
                                                    <span className="loader"></span>
                                                </div>
                                            ) : (
                                                data.length > 0 ? (
                                                    data.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td style={{ marginLeft: "50px" }}>{item.email}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.district}</td>
                                                            <td>{item.phone}</td>
                                                            <td>
                                        <input
                                            type="checkbox"
                                            checked={item.isPaid}
                                            // onChange={() => handleToggle(item._id, item.isPaid)}
                                        />
                                    </td>


                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3" className="text-center">
                                                            <img style={{ width: "200px", height: "230px" }} src={images.empty} alt="Empty" />
                                                            <p>No data found</p>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
