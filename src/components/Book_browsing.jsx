import React from 'react'
import { useState } from 'react'
import MUIDataTable from "mui-datatables";
import Education_information from '../Candidate_form_modals/Education_information';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Edit_education_details from '../Candidate_form_modals/Edit_education_details';
import Moment from "react-moment";
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2"

function Educational_details() {

  // Modal

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  
    const [formData,setFormData] = useState({})
    const[data,setData]=useState([])
    const [exp_data,setExp_Data] = useState([])
    const storage = window.sessionStorage;
   const {id} = useParams();

    const can_ed_id=storage.getItem("CAN_ED_ID")
    let arr =[]
    const handleChange= (e)=>{
         let inputName= e.target.name;
         setFormData({
            ...formData,
            [inputName]:e.target.value
         })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        arr.push(formData)
    }
    const get_education=async()=>{
      try {
       let res= await fetch(`http://beta-hire.equinoxlab.com/api/Master.svc/get_candidate_education_data/${id}`)
        let data= await res.json()

        setData(data.data)
      } catch (error) {
        console.log(error)
      }
    }
       useEffect(()=>{
        get_education()
        },[])
    
        const handleClick=(data)=>{
          handleOpen2()
          setExp_Data(data.rowData)
          storage.setItem("CAN_ED_ID",data.rowData[10])
          storage.setItem("CAN_ID",data.rowData[9])
        }
        const handleDelete=(data)=>{
  
          post_education_dlt(data.rowData[9],data.rowData[10])
        }
        const post_education_dlt=async(val1,val2)=>{
               try {
                 const res=await fetch(`http://beta-hire.equinoxlab.com/api//Master.svc/delete_candidate_education_data`,
                 {
                   method:"post",
                   headers:{"Content-Type":"application/json"},
                   body:JSON.stringify({
                    "CAN_ID":val1,
                    "CAN_ED_ID":val2
                   })
                 })
                 let data=await res.json()
                 const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 500,
                  timerProgressBar: false,
                  didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                  },
                });
                Toast.fire({
                  icon: "success",
                  title: "Deleted Successfully",
                });
                 get_education()
               } catch (error) {
                 console.log(error)
               }
        }        
    const columns = [
      {
       name: "",
       label: "ACTION",
       options: {
        filter: true,
        sort: true,
        customBodyRender:(row,data)=>{
            return(
              <div style={{display:"flex"}}>
               <button type="button" class="btn btn btn-sm"
               style={{marginLeft:"-15px",color:"#007cc3"}}
               onClick={()=>handleClick(data)}
               ><EditIcon/></button>
               <button type="button" class="btn btn btn-sm"
                style={{color:"red"}}
                 onClick={()=>handleDelete(data)}
                >
                  <DeleteIcon/>
                </button>
              </div>
            )
        }
       }
      },
      {
       name: "EDUCATIONAL_TYPE",
       label: "DEGREE/DIPLOMA",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "NAME_OF_COLLEGE",
       label: "NAME OF COLLEGE/UNIVERSITY",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "CITY_OF_COLLEGE",
       label: "NAME OF CITY",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "FULL_PART_TIME",
       label: "TYPE",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "FROM_DATE",
       label: "FROM",
       options: {
        filter: true,
        sort: true,
        customBodyRender:(row)=>{
          if(row === null || row === ""){
            return <>--</>
          }
          return <Moment format="MMM YYYY">{row}</Moment>;
        }
       }
      },
      {
       name: "TO_DATE",
       label: "TO",
       options: {
        filter: true,
        sort: true,
        customBodyRender:(row)=>{
          if(row === null || row === ""){
            return <>--</>
          }
          return <Moment format="MMM YYYY">{row}</Moment>;
        }
       }
      },
      {
        name: "IS_PURSUEING",
        label: "PURSUING",
        options: {
         filter: true,
         sort: true,
         customBodyRender:(row)=>{
          return(
            <p style={{marginTop:"20px"}}>{row === "1"? "YES":"NO"}</p>
          )
         }
        }
       },
       {
        name: "IS_COMPLETED",
        label: "COMPLETED",
        options: {
         filter: true,
         sort: true,
         customBodyRender:(row)=>{
          return(
            <p style={{marginTop:"20px"}}>{row === "1"? "YES":"NO"}</p>
          )
         }
        }
       },
      {
        name: "CAN_ID",
        label: "Degree/Diploma",
        options: {
         filter: false,
         sort: false,
         display:"none"
        }
       },
      {
        name: "CAN_ED_ID",
        label: "Degree/Diploma",
        options: {
         filter: false,
         sort: false,
         display:"none"
        }
       },
      // {
      //   name: "",
      //   label: "Delete",
      //   options: {
      //    filter: true,
      //    sort: true,
      //    customBodyRender:(row,data)=>{
      //      return(
      //         <div>
      //           <button type="button" class="btn btn btn-sm"
      //           style={{color:"red"}}
      //            onClick={()=>handleDelete(data)}
      //           >
      //             <DeleteIcon/>
      //           </button>
      //         </div>
      //      )
      //    }
      //   }
      //  },
       
     ];
     const options = {
      filterType: 'checkbox',
    };   
  return (
    <div>
     
          <button className="btn btn-primary" style={{marginLeft:"95%"}} onClick={handleOpen}>ADD+</button>
        <div className='table-responsive' style={{marginTop:"10px"}}>
             <MUIDataTable
           data={data}
           columns={columns}
           options={{
            options: options,
            selectableRows: "none",
            viewColumns: false,
            print: false,
            download: false,
            search: false,
            responsive: "standard",
            filter: false,
            rowsPerPageOptions: "",
            fixedHeader:"true",
            tableBodyMaxHeight: "430px",
            textLabels: {
              body: {
                noMatch: 'Data not available',
              }
            }
          }}
            />
          </div>

      {/* Modal for adding education details */}

      <Education_information
        open={open}
        setOpen={setOpen}
        handleChange={handleChange}
        handleOpen={handleOpen}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        get_education={get_education}
       />                  
        {exp_data.length>=1?<Edit_education_details
         open={open2}
         setOpen={setOpen2}
          handleClose={handleClose2}
          exp_data={exp_data}
          get_education={get_education}
        />:<></>}
          <div
        class="modal fade"
        id="exampleModalCenter2"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
        </div>
      </div>
    </div>
  )
}

export default Educational_details