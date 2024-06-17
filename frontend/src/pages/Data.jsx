// Import styled components and React dependencies
import styled from "styled-components";
import { useEffect, useState } from "react";

import MainData from "./MainData";
import PageHeader from "../common/PageHeader";
import Swal from "sweetalert2";
import apiInstance from "../utils/axios";
import useUserData from "../plugin/useUserData";

// Main component for displaying user's data
const Data = () => {
  // State variables to manage user files and options visibility
    const [files, setFiles] = useState([]);
    const [optionsVisible, setOptionsVisible] = useState(null);
    const userId = useUserData()?.user_id;

    const fetchFiles = async () => {
        const file_res = await apiInstance.get(`files/${userId}/`);
        setFiles(file_res.data);
        console.log(userId);
    };
  
    useEffect(() => {
        fetchFiles();
    }, []);


  // Handle file deletion by moving it to the trash collection
    const handleDelete = async (id) => {
        console.log(id)

        try {
            // Confirm deletion with a window prompt
            const confirmed = window.confirm(
            "Are you sure you want to delete this file?"
            );

            if (confirmed) {
            // Reference to the document in Firestore
            await apiInstance.delete(`file/delete/${id}`)
            Swal.fire({
                icon: "success",
                title: "File has been deleted",
            }).then(function(){location.reload()});
            }
        } catch (error) {
            // Log any errors that occur during the deletion processs
            console.error("Error deleting document: ", error);
        } finally {
            // Set options visibility after deletion attempt
            setOptionsVisible(id);
            
        }
        };

    // Handle click event for options button
    const handleOptionsClick = (id) => {
        // Toggle options visibility based on the previous state
        setOptionsVisible((prevVisible) => (prevVisible === id ? null : id));
        };

        // JSX structure for rendering the component
        return (
        <DataContainer>
            {/* Display page header */}
            <PageHeader pageTitle={"My Cloud"} />
            <div>
                {/* Display main user data with options for each file */}
                <MainData
                files={files}
                handleOptionsClick={handleOptionsClick}
                optionsVisible={optionsVisible}
                handleDelete={handleDelete}
                />
            </div>
        </DataContainer>
        );
        };

// Styled component for the main container
const DataContainer = styled.div`
flex: 1;
padding: 10px 0px 0px 20px;

h4 {
font-size: 14px;
margin-top: 30px;
margin-bottom: -20px;

@media screen and (max-width: 768px) {
    display: none;
}
}
`;

// Export the Data component as the default export
export default Data;