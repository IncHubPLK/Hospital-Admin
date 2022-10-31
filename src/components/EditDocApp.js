import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {db} from '../config/firebase';
import { Link } from 'react-router-dom';
import pic from '../images/logo.png';


import { makeStyles } from '@material-ui/core/styles';


import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { async } from '@firebase/util';


const useStyles = makeStyles((theme) => ({
    
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontSize:50
    },
    navigation:{
        backgroundColor:'#150CC6',
        alignItems:'center',
        color:'white'
    },
    aside:{
        backgroundColor:'white',
        alignItems:'center',
        color:"#150CC6"
        
    },
    second:{
        flexGrow: 1,
        fontSize:30,
        marginTop:10,
        color:"#2B2C34"
    },
    logo:{
        width:200,
        height:200,
        marginTop:-210
    },

    but:{
        backgroundColor:'#150CC6',
      color: 'white',
      "&:hover": {
          backgroundColor: '#0d0d0d',
        },
       },
       outlined: {
         color: "#150CC6",
         "&:hover": {
           backgroundColor: '#00bfa5',
         },
       },
    }

  ));

const Editpage = () => {

    const {id} = useParams()
    console.log(id)

    //fuction to get single doc
    const getDocDetails = async(id)=>{
        const docref = doc(db,'food Menu',id)
        try{
            const docSnap = await getDoc(docref);
             if(docSnap.exists()){
                console.log('available')
                setDetails(docSnap.data())
             }else{
                console.log('not available')
             }

        }catch(err){
            console.log(err)
        }
    }

    //updateButton
    const update = async(id,foodName)=>{
        const menuDoc = doc(db,'food Menu',id)

        const foodEntry = {
            foodName:foodName,
            price:price,
            quantity:quantity,
            description:description,
            category:category,
            size:size,
    
        };

        await updateDoc(menuDoc,foodEntry).then(()=>{
            alert('updated successfully')
        }).catch(err=>{
            console.log(err)
        })
         
    }

    useEffect(()=>{
        getDocDetails(id)

    },[])

    const [foodName, setFoodName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [size, setSize] = useState("")

    const classes = useStyles();
    const [details, setDetails] = useState([])
    return (
        <div style={{width:'100%'}}>
            <div className={classes.root}>
                <AppBar position="static" style={{ height: 100, backgroundColor: '#150CC6', width: '100%', justifyContent: "center" }}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                             
                        </Typography>
                        
                    </Toolbar>
                </AppBar>
            </div>
            <div className={classes.navigation} style={{ width: "20%", height: "920px", borderBottomRightRadius: 59}}>
           <Link to='/Admin' style={{textDecoration:'none',color:'white'}}><Button style={{marginTop:'60%'}} color="inherit">Patient Dashboard</Button></Link><br></br><br></br>
           <Link to='/edit' style={{textDecoration:'none',color:'white'}}><Button color="inherit">View doctors availability</Button></Link><br></br><br></br>
            <Link to='/' style={{textDecoration:'none',color:'white'}}><Button color="inherit">Add New Patient</Button></Link><br></br><br></br>
            <Link to='/' style={{textDecoration:'none',color:'white'}}><Button color="inherit">View Appointments</Button></Link><br></br><br></br>
            <Link to='/' style={{textDecoration:'none',color:'white'}}><Button color="inherit">Pre-Bookings</Button></Link><br></br><br></br>
            
            </div>
            <div className={classes.aside} style={{width:'80%',marginLeft:"20%",marginTop:'-700px',}}>
                
                <Typography variant="h6" className={classes.second}>
                    Edit Doctor Availability
                </Typography>
            <p>Doctor Availability: </p>
                    <select style={{width:"40%",height:35,background: "rgba(255, 255, 255, 0.2)",border:"none",borderRadius:5}} placeholder="Condition">
                    <option value="Mild">Offline</option>
                    <option value="Moderate">Online</option>
                    <option value="Severe">Away</option>
                </select><br></br>
            <Button onClick={(e)=>{update(id,foodName)}}  className={classes.but}  variant="contained" id='myMainButton' style={{marginTop:'2%'}}>
                UPDATE
            </Button>
</div>
        </div>
       
    );
}

export default Editpage;
