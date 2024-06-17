import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import apiInstance from "../utils/axios";
import useUserData from "../plugin/useUserData";
import AddFile from "./AddFile";


function Files() {
    const [files, setfiles] = useState([]);
    const userId = useUserData()?.user_id;

    const fetchfiles = async () => {
        const file_res = await apiInstance.get(`files/${userId}/`);
        setfiles(file_res.data);
        console.log(file_res.data[0]);
    };

    useEffect(() => {
        fetchfiles();
    }, []);

    return (
        <>
        
            <section className="py-4">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="card border bg-transparent rounded-3">
                                <div className="card-header bg-transparent border-bottom p-3">
                                    <div className="d-sm-flex justify-content-between align-items-center">
                                        <h5 className="mb-2 mb-sm-0">
                                            All files <span className="badge bg-primary bg-opacity-10 text-primary">{files?.length}</span>
                                        </h5>                                      
                                    </div>
                                </div>
                                <div className="card-body">                                              
                                    {/* Search and select END */}
                                    {/* Blog list table START */}
                                    <div className="table-responsive border-0">
                                        <table className="table align-middle p-4 mb-0 table-hover table-shrink">
                                            <tbody className="border-top-0">
                                                {files?.map((p, index) => (
                                                    <tr>                                            
                                                        <td>
                                                            <h6 className="mt-2 mt-md-0 mb-0 ">
                                                                <Link to={`/detail/${p.slug}/`} className="text-dark text-decoration-none">
                                                                    {p?.filename}
                                                                </Link>
                                                            </h6>
                                                        </td>   
                                                        <td>
                                                            <h6 className="mt-2 mt-md-0 mb-0 ">
                                                               
                                                                    {p?.upload_datetime}
                                                                
                                                            </h6>
                                                        </td>                                                   
                                        
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <Link to={`/edit/${p.id}/`} className="btn btn-primary btn-round mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                                                                    <i className="bi bi-pencil-square" />
                                                                </Link>
                                                                <Link className="btn-round mb-0 btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                                                                    <i className="bi bi-trash" />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </section>
            
        </>
    );
}

export default Files;