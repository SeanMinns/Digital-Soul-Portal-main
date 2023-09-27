import React, { useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import * as XLSX from 'xlsx';
// import CsvDownloader from 'react-csv-downloader';
// import { CSVLink } from 'react-csv';
import {
    Typography,
    Button,
  } from '@material-ui/core';
  import { postEndPoint } from './Request';
  import Spinner from '../Spinner';

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [csvData, setCsvData] = useState([
   
  ]);
  let downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, `${getDate()}.xlsx`);
  };
  const csvLinkRef = useRef(null);

  const history = useHistory();

  // const columns = [
  //   {
  //     id: 'userId',
  //     displayName: 'userId',
  //   },
  //   {
  //     id: 'userName',
  //     displayName: 'userName',
  //   },
  //   {
  //     id: 'Register-1-Question',
  //     displayName: 'Register-1-Question',
  //   },
  //   {
  //     id: 'Register-1-Answer',
  //     displayName: 'Register-1-Answer',
  //   },
  //   {
  //     id: 'Register-2-Question',
  //     displayName: 'Register-2-Question',
  //   },
  //   {
  //     id: 'Register-2-Answer',
  //     displayName: 'Register-2-Answer',
  //   },
  //   {
  //     id: 'Register-3-Question',
  //     displayName: 'Register-3-Question',
  //   },
  //   {
  //     id: 'Register-3-Answer',
  //     displayName: 'Register-3-Answer',
  //   },
  //   {
  //     id: 'Register-4-Question',
  //     displayName: 'Register-4-Question',
  //   },
  //   {
  //     id: 'Register-4-Answer',
  //     displayName: 'Register-4-Answer',
  //   },
  // ];

  const getDate = () => {
    let today = new Date();
    let date = "DS_DB_"+parseInt(today.getMonth()+1) + "_" + today.getDate()  + "_" + today.getFullYear();
    return date;
  }

  // const csvReport = {
  //   filename: `${getDate()}.csv`,
  //   // headers: headers,
  //   data: csvData,
  // };

  const apiFetch = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const formData = {"token": token};
      const response = await postEndPoint('/admin/getCSV', formData, null);
      
      if(response.data.code === 10) {
        localStorage.removeItem('token');
        history.push('/login');
      } 
      else {
        const { jsonData } = response.data;
        setCsvData(jsonData);
        setIsLoading(false);
        csvLinkRef.current.click();
      }
    } catch (e) {
      console.log(e);
    }
};

    return (
      isLoading ? <Spinner /> : <div>
        <Typography variant='h3'  style={{width: "50%", marginLeft: "25%", marginRight: "25%", textAlign: "center"}}>
            Click the button below to download Excel
        </Typography>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Button 
          variant="contained"
          color="primary"
          type="submit" 
          style={{width: "50%", marginLeft: "25%", marginRight: "25%", height: "50px"}}
          onClick={apiFetch}
        >
          DOWNLOAD THE EXCEL
        </Button>
        {/* <CsvDownloader
          filename="myfile"
          extension=".csv"
          headers={columns}
          datas={csvData}
          text="DOWNLOAD"> */}
        {/* <CSVLink 
          {...csvReport}
          ref={csvLinkRef}
        > 
        </CSVLink> */}
        <button onClick={()=>downloadExcel(csvData)} ref={csvLinkRef} style={{display:"none"}}>
    Download As Excel
</button>

      {/* </CsvDownloader> */}
    </div>
        
    
    );
}

export default Dashboard;