import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import picture from '../images/logo.png';
import { db } from '../config/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    
    title: {
        fontSize:40,
        color : '#000000'
    
      },
      pic:{
        width:90,
        height:90,
        marginTop:-80,
    
      },
      displayCard:{
        marginLeft:20,
        marginTop:20,
        borderBottomRightRadius: 30,
        borderTopLeftRadius:30,
        width:'100%', 
        elevation: 60,
        
      },
      dashboard:{
        position: 'fixed',
        bottom: '0%'

      },
      navigation:{
        alignItems:'center',
        color: '#150CC6',
    },

    but:{
        backgroundColor:'#150CC6',
        color: 'white',
        "&:hover": {
            backgroundColor: '#1de9b6',
          },
         },
         outlined: {
           color: "#150CC6",
           "&:hover": {
             backgroundColor: '#00bfa5',
           },
         },

}));




const Admin = () => {
    const classes = useStyles();
    const [menu,setMenu] = useState([]);

    const menuRef = collection(db,"food Menu")

    //fetch food Menu from firebase

    const getMenu = async () => {
        const data = await getDocs(menuRef)

        console.log(data.docs.map((results)=>(results.data())))
        setMenu(data.docs.map((results)=>({...results.data(),id:results.id})));
    }
    useEffect(()=>{
        getMenu()
    },)

    //delete function

    function deleteMenu(id){
        console.log('delete is executed',{id});

        const getDoc = doc (db,"food Menu",id)
        deleteDoc(getDoc).then(()=>{
            alert("Successfully Deleted!")
        }).catch(error => {
            console.log(error);
        })
    }

    return(
        <div style={{width:'100%'}}>
            <div className={classes.root}>
                <AppBar position="fixed" style={{ height: 100, backgroundColor: 'white', width: '100%', justifyContent: "center" }}>
                    <Toolbar>
                    </Toolbar>
             
                </AppBar>
            </div>
            
            <div className={classes.content} style={{width:"100%", marginTop:'8%', marginBottom:'5%'}}>
                <div><h1 style={{textAlign:'center', color:"#150CC6"}}>Polokwane Hospital</h1></div>

                <div>
                            <TextField id="standard-basic" label="Search Through appointments" style={{marginTop:"1%", marginBottom:'2%', marginRight:'20%',width:'60%',color:"white"}} />
                            <Button className={classes.but}  style={{marginRight:'18%'}}>Search</Button>
                            </div>
                {
                    menu.length == 0 ? (
                        <h2 style={{ textAlign: 'center', color:'#150CC6', marginTop: '280px' }}>Loading Please Wait...
                        <div><CircularProgress style={{color:'#150CC6',flexGrow:1}}/></div></h2>
                        
                    ) : (
                        menu.map((res)=> (
                            <>
                            <Card className={classes.displayCard} style={{width:"72%",height:128}}>

                                <div>
                                    <h1 style={{color:"#150CC6",marginTop:"8px",textAlign:"left" ,marginLeft:'10px',  fontSize:20}}>Name: {res.foodName}</h1>
                                    <p style={{marginTop:"-10px",textAlign:"left",marginLeft:'10px', fontSize:18}}>Location: {res.size}</p>
                                    <p style={{marginTop:"-10px",textAlign:"left",marginLeft:'10px', fontSize:18}}>Reason for visit: {res.description}</p>
                                    <p style={{marginTop:"-10px",textAlign:"left",marginLeft:'10px', fontSize:14, fontStyle:'italic'}}>Created: {res.price}</p>

                                   
                                    <Link to='/edit'><Button className={classes.but} color="inherit" style={{marginTop:"-160px", marginRight:'2%',width:'14%'}}>Update details</Button></Link>
                                    <Button  className={classes.but} color="inherit" style={{marginTop:"-160px",marginRight:'-60%',width:'10%'}} onClick={(e) => { deleteMenu(res.id) }}>Cancel</Button>
                                    
                                    
                                </div>
                            </Card>
                            </>
                        ))
                    )
                }
            </div>
            <div className={classes.dashboard} style={{width:'23%',height:'700px',marginLeft:"76.5%"}}>
                <div className={classes.navigation}>
                <Link to='/Availabledocs' style={{textDecoration:'none',color:'white'}}><Button className={classes.but} color="inherit" style={{width:'40%'}}>View Available Doctors</Button></Link><br></br><br></br>
                <Link to='/'  style={{textDecoration:'none',color:'white'}}><Button className={classes.but} color="inherit" style={{width:'40%'}}>Add New Patient</Button></Link><br></br><br></br>
                
                </div>
                <div>
            
                <Link to='/ViewApps'><Button className={classes.but}  color="inherit" style={{width:'40%',marginTop:'60px'}}>View Appointments</Button></Link><br></br>
                <Link to='/Prebookings'><Button className={classes.but}  color="inherit" style={{width:'40%',marginTop:'30px'}}>Pre-bookings</Button></Link><br></br>
                </div>
            </div>
            
        </div>
    )
}

export default Admin